# File: app.py
# Purpose: Streamlit app to detect fake internships with smart rules and suggestions
# Environment: Python 3.13, Streamlit, NLTK, joblib

import streamlit as st
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import joblib

# Initialize NLTK resources
@st.cache_resource
def initialize_nltk():
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)

# Text preprocessing function
def preprocess_text(text):
    try:
        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word not in stop_words]
        return ' '.join(tokens)
    except Exception as e:
        st.error(f"Error preprocessing text: {e}")
        return text

# Load ML model and vectorizer
@st.cache_resource
def load_model():
    try:
        model = joblib.load('fake_internship_model.pkl')
        vectorizer = joblib.load('tfidf_vectorizer.pkl')
        return model, vectorizer
    except Exception as e:
        st.error(f"Error loading model/vectorizer: {e}")
        st.stop()

# Combined ML + rule-based prediction
def predict_with_suggestions(text, model, vectorizer, user_requirements):
    try:
        cleaned_text = preprocess_text(text)
        text_vector = vectorizer.transform([cleaned_text]).toarray()
        prediction = model.predict(text_vector)[0]
        label = "Genuine" if prediction == 1 else "Fake"

        # Check for suspicious email domains
        if re.search(r'@\s*(gmail\.com|yahoo\.com|hotmail\.com)', text.lower()):
            label = "Fake"

        # Check if suspicious requirements are selected
        suspicious_flags = any(req in ["Payment", "Registration Fee", "Certificate without work"] for req in user_requirements)
        if suspicious_flags:
            label = "Fake"

        # Snippet for display
        snippet = " ".join(text.strip().split()[:5]) + ("..." if len(text.strip().split()) > 5 else "")

        # Suggestions
        if label == "Genuine":
            suggestions = [
                f"🎉 The internship ('{snippet}') appears genuine.",
                "🚀 Focus on building relevant skills to grow your career.",
                "📚 Keep applying to real opportunities.",
                "🌟 Stay motivated and consistent!"
            ]
        else:
            suggestions = [
                f"⚠️ The internship ('{snippet}') seems fake or suspicious.",
                "❌ Avoid offers from email addresses like @gmail.com or asking for money.",
                "💸 Never pay for internships or training certificates upfront.",
                "🎯 Build your resume and apply through trusted platforms."
            ]
        return label, suggestions
    except Exception as e:
        st.error(f"Error predicting: {e}")
        return None, []

# Streamlit App UI
def main():
    st.title("🕵️‍♀️ Fake Internship Detector")
    st.write("Check if your internship offer is genuine or a scam.")

    initialize_nltk()
    model, vectorizer = load_model()

    user_input = st.text_area("Paste your internship offer message below 👇", height=120)

    user_requirements = st.multiselect(
        "What did they ask from you?",
        options=[
            "Resume",
            "Interview",
            "Payment",
            "Registration Fee",
            "Certificate without work",
            "LinkedIn Profile",
            "Phone Number",
            "Work Sample"
        ]
    )

    if st.button("🔍 Check Internship"):
        if user_input.strip():
            label, suggestions = predict_with_suggestions(user_input, model, vectorizer, user_requirements)
            if label:
                if label == "Genuine":
                    st.success(f"✅ Prediction: **{label} Internship**")
                else:
                    st.error(f"🚫 Prediction: **{label} Internship**")

                st.markdown("### 💡 Suggestions:")
                for tip in suggestions:
                    st.markdown(f"- {tip}")
        else:
            st.warning("⚠️ Please paste an internship description first.")

    # Sidebar
    st.sidebar.header("🧪 Try an Example")
    examples = {
        "Fake": "Apply now at internabc@gmail.com and pay Rs 500 to register.",
        "Genuine": "Software Intern at Google. Apply via careers.google.com"
    }
    example_choice = st.sidebar.selectbox("Choose an example:", [""] + list(examples.keys()))
    if example_choice:
        st.sidebar.markdown(f"**Example Text:**\n\n{examples[example_choice]}")
        if st.sidebar.button("Use This Example"):
            st.session_state["user_input"] = examples[example_choice]
            st.experimental_rerun()

    st.sidebar.header("📌 Instructions")
    st.sidebar.markdown("""
    - Paste an internship message.
    - Select what they asked from you (if anything).
    - Click **Check Internship** to get prediction + advice.
    - Use examples to test quickly.
    """)

if __name__ == "__main__":
    main()
