/* ═══════════════════════════════════════════════════
   CodTech Assistant Pro — Client-Side Chat Logic
   ═══════════════════════════════════════════════════ */

// ── Session Management ──
const SESSION_KEY = "codtech_session_id";

function getSessionId() {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
        id = crypto.randomUUID ? crypto.randomUUID() : generateUUID();
        localStorage.setItem(SESSION_KEY, id);
    }
    return id;
}

function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// ── State ──
let isWaiting = false;
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const btnSend = document.getElementById("btn-send");
const welcomeScreen = document.getElementById("welcome-screen");

// ── Send Message ──
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text || isWaiting) return;

    // Hide welcome screen
    if (welcomeScreen) {
        welcomeScreen.style.display = "none";
    }

    // Remove previous suggestion chips
    removeSuggestions();

    // Add user message
    appendMessage("user", text);

    // Clear input
    userInput.value = "";
    userInput.style.height = "auto";
    setWaiting(true);

    // Show typing indicator
    showTypingIndicator();

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: text,
                session_id: getSessionId(),
            }),
        });

        const data = await res.json();

        hideTypingIndicator();

        if (data.error) {
            appendMessage("bot", `⚠️ ${data.error}`);
        } else {
            appendMessage("bot", data.response);

            // Show suggestion chips
            if (data.suggestions && data.suggestions.length > 0) {
                showSuggestions(data.suggestions);
            }
        }
    } catch (err) {
        hideTypingIndicator();
        appendMessage("bot", "❌ **Connection error.** Make sure the server is running.");
    }

    setWaiting(false);
}

// ── Send Suggestion ──
function sendSuggestion(text) {
    userInput.value = text;
    sendMessage();
}

// ── Append Message ──
function appendMessage(role, content) {
    const row = document.createElement("div");
    row.className = `message-row ${role}`;

    const avatar = document.createElement("div");
    avatar.className = `msg-avatar ${role === "bot" ? "bot-av" : "user-av"}`;
    avatar.textContent = role === "bot" ? "AI" : "U";

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";

    if (role === "bot") {
        bubble.innerHTML = renderMarkdown(content);
    } else {
        bubble.textContent = content;
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatMessages.appendChild(row);

    scrollToBottom();
}

// ── Typing Indicator ──
function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.id = "typing-indicator";

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar bot-av";
    avatar.textContent = "AI";

    const dots = document.createElement("div");
    dots.className = "typing-dots";
    dots.innerHTML = "<span></span><span></span><span></span>";

    indicator.appendChild(avatar);
    indicator.appendChild(dots);
    chatMessages.appendChild(indicator);

    scrollToBottom();
}

function hideTypingIndicator() {
    const el = document.getElementById("typing-indicator");
    if (el) el.remove();
}

// ── Suggestions ──
function showSuggestions(items) {
    const container = document.createElement("div");
    container.className = "suggestions-row";
    container.id = "suggestions-row";

    items.forEach((text) => {
        const chip = document.createElement("button");
        chip.className = "suggestion-chip";
        chip.textContent = text;
        chip.onclick = () => sendSuggestion(text);
        container.appendChild(chip);
    });

    chatMessages.appendChild(container);
    scrollToBottom();
}

function removeSuggestions() {
    const el = document.getElementById("suggestions-row");
    if (el) el.remove();
}

// ── Markdown Renderer ──
function renderMarkdown(text) {
    if (!text) return "";

    let html = escapeHtml(text);

    // Fenced code blocks with language: ```language\ncode\n```
    html = html.replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        (match, lang, code) => {
            const langLabel = lang || "code";
            const codeId = "code-" + Math.random().toString(36).substring(2, 8);
            return `<div class="code-header"><span>${langLabel}</span><button class="btn-copy" onclick="copyCode('${codeId}')">Copy</button></div><pre><code id="${codeId}">${code.trim()}</code></pre>`;
        }
    );

    // Inline code: `code`
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Bold: **text**
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Italic: *text* (but not inside **)
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

    // Headings: ### heading
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

    // Blockquotes: > text
    html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

    // Horizontal rule: ---
    html = html.replace(/^---$/gm, "<hr>");

    // Unordered list items: - item
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

    // Ordered list items: 1. item
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

    // Links: [text](url)
    html = html.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    // Tables: | header | header |
    html = renderTables(html);

    // Line breaks → paragraphs
    html = html
        .split(/\n\n+/)
        .map((block) => {
            block = block.trim();
            if (!block) return "";
            // Don't wrap blocks that are already HTML elements
            if (
                block.startsWith("<h") ||
                block.startsWith("<ul") ||
                block.startsWith("<ol") ||
                block.startsWith("<pre") ||
                block.startsWith("<div") ||
                block.startsWith("<blockquote") ||
                block.startsWith("<hr") ||
                block.startsWith("<table")
            ) {
                return block;
            }
            return `<p>${block.replace(/\n/g, "<br>")}</p>`;
        })
        .join("");

    return html;
}

function renderTables(html) {
    const lines = html.split("\n");
    let tableHtml = "";
    let inTable = false;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("|") && line.endsWith("|")) {
            if (!inTable) {
                inTable = true;
                tableHtml = "<table>";
            }
            // Skip separator row
            if (/^\|[\s\-:|]+\|$/.test(line)) continue;

            const cells = line
                .split("|")
                .filter((c) => c.trim() !== "");
            const isHeader = i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1]?.trim());
            const tag = isHeader ? "th" : "td";

            tableHtml += "<tr>";
            cells.forEach((cell) => {
                tableHtml += `<${tag}>${cell.trim()}</${tag}>`;
            });
            tableHtml += "</tr>";
        } else {
            if (inTable) {
                tableHtml += "</table>";
                result.push(tableHtml);
                tableHtml = "";
                inTable = false;
            }
            result.push(line);
        }
    }

    if (inTable) {
        tableHtml += "</table>";
        result.push(tableHtml);
    }

    return result.join("\n");
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ── Copy Code ──
function copyCode(codeId) {
    const codeEl = document.getElementById(codeId);
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent).then(() => {
        const btn = codeEl.closest("pre")?.previousElementSibling?.querySelector(".btn-copy");
        if (btn) {
            const original = btn.textContent;
            btn.textContent = "Copied!";
            btn.style.color = "#10b981";
            setTimeout(() => {
                btn.textContent = original;
                btn.style.color = "";
            }, 1500);
        }
    });
}

// ── Clear Chat ──
async function clearChat() {
    try {
        await fetch("/api/clear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: getSessionId() }),
        });
    } catch (e) {
        // silent fail
    }

    // Reset UI
    chatMessages.innerHTML = "";

    // Recreate welcome screen
    const welcome = document.createElement("div");
    welcome.className = "welcome-container";
    welcome.id = "welcome-screen";
    welcome.innerHTML = `
        <div class="welcome-icon">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" rx="24" fill="url(#welcome-grad2)"/>
                <path d="M24 40C24 31.16 31.16 24 40 24C48.84 24 56 31.16 56 40" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <circle cx="32" cy="38" r="3" fill="white"/>
                <circle cx="48" cy="38" r="3" fill="white"/>
                <path d="M32 48C32 48 35 52 40 52C45 52 48 48 48 48" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="40" cy="16" r="3" fill="white" opacity="0.7"/>
                <line x1="40" y1="19" x2="40" y2="24" stroke="white" stroke-width="2" opacity="0.7"/>
                <defs>
                    <linearGradient id="welcome-grad2" x1="0" y1="0" x2="80" y2="80">
                        <stop stop-color="#7C3AED"/>
                        <stop offset="1" stop-color="#2563EB"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <h2>Welcome to CodTech Assistant Pro</h2>
        <p>I'm your AI-powered assistant for Python, Data Science, ML, and CODTECH guidance. Ask me anything!</p>
        <div class="welcome-chips">
            <button class="suggestion-chip" onclick="sendSuggestion('What can you do?')">🚀 What can you do?</button>
            <button class="suggestion-chip" onclick="sendSuggestion('Explain Python decorators')">🐍 Explain Python decorators</button>
            <button class="suggestion-chip" onclick="sendSuggestion('Tell me about CODTECH internship')">🎓 About CODTECH</button>
            <button class="suggestion-chip" onclick="sendSuggestion('What is Machine Learning?')">🤖 What is ML?</button>
        </div>
    `;
    chatMessages.appendChild(welcome);

    // New session
    localStorage.removeItem(SESSION_KEY);
}

// ── Helpers ──
function scrollToBottom() {
    requestAnimationFrame(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

function setWaiting(state) {
    isWaiting = state;
    btnSend.disabled = state;
    userInput.disabled = state;
    if (!state) userInput.focus();
}

function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function autoResize(el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 150) + "px";
}

// ── Load History on Start ──
async function loadHistory() {
    try {
        const res = await fetch(`/api/history?session_id=${getSessionId()}`);
        const data = await res.json();

        if (data.history && data.history.length > 0) {
            if (welcomeScreen) welcomeScreen.style.display = "none";
            data.history.forEach((msg) => {
                appendMessage(msg.role === "user" ? "user" : "bot", msg.content);
            });
        }
    } catch (e) {
        // Server not running yet — that's fine
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    userInput.focus();
});
