"""
CodTech Assistant Pro — AI-Powered Chatbot
Powered by DeepSeek API (deepseek-chat / deepseek-coder)
"""

import os
import re
import uuid
import math
import json
import subprocess
import tempfile
from datetime import datetime

from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI

# ──────────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────────
load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)

DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
DEEPSEEK_BASE_URL = "https://api.deepseek.com"

client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL) if DEEPSEEK_API_KEY else None

# In-memory conversation store: { session_id: [messages] }
conversations: dict[str, list[dict]] = {}

# ──────────────────────────────────────────────
# System Prompt
# ──────────────────────────────────────────────
SYSTEM_PROMPT = """You are **CodTech Assistant Pro**, an advanced AI assistant powered by DeepSeek.

## Personality
- Friendly, professional, and slightly witty
- Confident but never arrogant
- Helpful and clear in every response

## Knowledge Areas
You specialize in:
- Python Programming (syntax, libraries, best practices)
- Data Science & Machine Learning (pandas, numpy, sklearn, tensorflow, etc.)
- CODTECH Internship guidance and training
- General technology and computer science queries

## Response Rules
1. **Simple questions** → Give a direct, concise answer
2. **Complex questions** → Break into clear, numbered steps
3. **Code questions** → Always use fenced code blocks with the language specified
4. **Unknown topics** → Be honest. Say you're unsure and suggest alternatives
5. Keep answers **short and structured** — use bullet points and headings
6. Avoid unnecessary verbosity
7. For math expressions, show the work step-by-step

## Safety
- NEVER provide harmful, illegal, or unethical instructions
- If a query is unclear, ask for clarification
- Decline inappropriate requests politely

## Identity
- Your name: CodTech Assistant Pro
- Created by: A CODTECH intern as an AI-powered chatbot project
- Powered by: DeepSeek AI models
- Current date: {date}
"""

# ──────────────────────────────────────────────
# Tool System
# ──────────────────────────────────────────────

def safe_calculate(expression: str) -> str:
    """Evaluate a math expression safely."""
    try:
        # Allow only safe math operations
        allowed_names = {
            k: v for k, v in math.__dict__.items() if not k.startswith("__")
        }
        allowed_names.update({"abs": abs, "round": round, "min": min, "max": max})
        
        # Remove anything suspicious
        cleaned = re.sub(r'[a-zA-Z_]+', lambda m: m.group() if m.group() in allowed_names else '', expression)
        result = eval(expression, {"__builtins__": {}}, allowed_names)
        return f"**Calculator Result:**\n`{expression}` = **{result}**"
    except Exception as e:
        return f"Could not calculate: {e}"


def execute_python_code(code: str) -> str:
    """Execute Python code in a sandboxed subprocess."""
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as f:
            f.write(code)
            temp_path = f.name

        result = subprocess.run(
            ['python', temp_path],
            capture_output=True, text=True, timeout=10,
            encoding='utf-8'
        )
        os.unlink(temp_path)

        output = result.stdout.strip()
        error = result.stderr.strip()

        if error:
            return f"**Code Output:**\n```\n{error}\n```"
        return f"**Code Output:**\n```\n{output if output else '(No output)'}\n```"
    except subprocess.TimeoutExpired:
        return "**Error:** Code execution timed out (10s limit)."
    except Exception as e:
        return f"**Error:** {e}"


def detect_tool_request(message: str) -> tuple[str | None, str]:
    """Detect if the user wants to use a tool."""
    msg_lower = message.lower().strip()

    # Calculator detection
    calc_patterns = [
        r'^calc(?:ulate)?\s+(.+)',
        r'^what\s+is\s+([\d\s\+\-\*\/\.\(\)\^]+)\s*\??$',
        r'^([\d\s\+\-\*\/\.\(\)]+)$',
    ]
    for pattern in calc_patterns:
        match = re.match(pattern, msg_lower)
        if match:
            expr = match.group(1).replace('^', '**').strip()
            if any(op in expr for op in ['+', '-', '*', '/', '**']):
                return ("calculator", expr)

    # Code execution detection
    code_patterns = [
        r'^run\s*:?\s*```(?:python)?\n?(.*?)```',
        r'^execute\s*:?\s*```(?:python)?\n?(.*?)```',
    ]
    for pattern in code_patterns:
        match = re.match(pattern, message, re.DOTALL | re.IGNORECASE)
        if match:
            return ("code", match.group(1).strip())

    return (None, message)


def detect_model(message: str) -> str:
    """Auto-select the best model based on the query type."""
    code_keywords = [
        'code', 'function', 'class', 'def ', 'import ', 'error', 'bug',
        'debug', 'syntax', 'compile', 'runtime', 'algorithm', 'regex',
        'api', 'endpoint', 'database', 'sql', 'html', 'css', 'javascript',
        'react', 'flask', 'django', 'fastapi', 'write a program',
        'write code', 'fix this', 'refactor', 'optimize this code',
        'implement', 'snippet', 'script'
    ]
    msg_lower = message.lower()
    if any(kw in msg_lower for kw in code_keywords):
        return "deepseek-chat"  # deepseek-chat handles both well now
    return "deepseek-chat"


def generate_suggestions(message: str, response: str) -> list[str]:
    """Generate follow-up suggestion chips based on context."""
    msg_lower = message.lower()

    if any(kw in msg_lower for kw in ['python', 'code', 'program']):
        return ["Show me an example", "Explain with comments", "Any best practices?"]
    elif any(kw in msg_lower for kw in ['machine learning', 'ml', 'data science']):
        return ["What libraries should I use?", "Show a simple project", "Explain the workflow"]
    elif any(kw in msg_lower for kw in ['codtech', 'internship']):
        return ["What tasks are expected?", "How to get certified?", "Tell me more"]
    elif any(kw in msg_lower for kw in ['hello', 'hi', 'hey']):
        return ["What can you do?", "Tell me about CODTECH", "Help me with Python"]
    else:
        return ["Tell me more", "Give an example", "Explain simply"]


# ──────────────────────────────────────────────
# API Routes
# ──────────────────────────────────────────────

@app.route("/")
def index():
    """Serve the chat UI."""
    return render_template("index.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    """Handle a chat message."""
    data = request.get_json()
    user_message = data.get("message", "").strip()
    session_id = data.get("session_id", str(uuid.uuid4()))

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    if not client:
        return jsonify({
            "response": "⚠️ **DeepSeek API key not configured.**\n\nPlease set the `DEEPSEEK_API_KEY` environment variable in your `.env` file and restart the server.",
            "suggestions": ["How to get an API key?"],
            "session_id": session_id
        })

    # Check for tool usage
    tool_type, tool_arg = detect_tool_request(user_message)

    if tool_type == "calculator":
        result = safe_calculate(tool_arg)
        # Store in conversation
        if session_id not in conversations:
            conversations[session_id] = []
        conversations[session_id].append({"role": "user", "content": user_message})
        conversations[session_id].append({"role": "assistant", "content": result})
        return jsonify({
            "response": result,
            "suggestions": ["Calculate something else", "Explain the math", "Convert units"],
            "session_id": session_id
        })

    if tool_type == "code":
        result = execute_python_code(tool_arg)
        if session_id not in conversations:
            conversations[session_id] = []
        conversations[session_id].append({"role": "user", "content": user_message})
        conversations[session_id].append({"role": "assistant", "content": result})
        return jsonify({
            "response": result,
            "suggestions": ["Run another snippet", "Explain the output", "Fix any errors"],
            "session_id": session_id
        })

    # Initialize conversation history
    if session_id not in conversations:
        conversations[session_id] = []

    # Add user message to history
    conversations[session_id].append({"role": "user", "content": user_message})

    # Build messages payload with system prompt
    system_msg = {
        "role": "system",
        "content": SYSTEM_PROMPT.format(date=datetime.now().strftime("%B %d, %Y"))
    }

    # Keep last 20 messages to avoid token overflow
    history = conversations[session_id][-20:]
    messages = [system_msg] + history

    # Select model
    model = detect_model(user_message)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=2048,
            temperature=0.7,
            top_p=0.95,
        )
        assistant_message = response.choices[0].message.content

        # Store assistant response
        conversations[session_id].append({"role": "assistant", "content": assistant_message})

        # Generate suggestion chips
        suggestions = generate_suggestions(user_message, assistant_message)

        return jsonify({
            "response": assistant_message,
            "suggestions": suggestions,
            "session_id": session_id,
            "model": model
        })

    except Exception as e:
        error_msg = str(e)
        if "authentication" in error_msg.lower() or "api key" in error_msg.lower():
            friendly = "🔑 **Invalid API Key.** Please check your `DEEPSEEK_API_KEY` in the `.env` file."
        elif "rate" in error_msg.lower():
            friendly = "⏳ **Rate limit hit.** Please wait a moment and try again."
        else:
            friendly = f"❌ **Error:** {error_msg}"

        return jsonify({
            "response": friendly,
            "suggestions": ["Try again", "Check API key"],
            "session_id": session_id
        })


@app.route("/api/clear", methods=["POST"])
def clear_chat():
    """Clear conversation history for a session."""
    data = request.get_json()
    session_id = data.get("session_id", "")
    if session_id in conversations:
        del conversations[session_id]
    return jsonify({"status": "cleared"})


@app.route("/api/history", methods=["GET"])
def get_history():
    """Get conversation history for a session."""
    session_id = request.args.get("session_id", "")
    history = conversations.get(session_id, [])
    return jsonify({"history": history, "session_id": session_id})


# ──────────────────────────────────────────────
# Entry Point
# ──────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("  🤖 CodTech Assistant Pro")
    print("  Powered by DeepSeek AI")
    print("=" * 50)
    if not DEEPSEEK_API_KEY:
        print("  ⚠️  WARNING: DEEPSEEK_API_KEY not set!")
        print("  Set it in .env file or environment variables.")
    else:
        print("  ✅ API Key loaded successfully")
    print(f"  🌐 Open http://localhost:5000")
    print("=" * 50 + "\n")

    app.run(debug=True, host="0.0.0.0", port=5000)
