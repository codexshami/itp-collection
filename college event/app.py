import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Page config
st.set_page_config(page_title="College Feedback Analysis", layout="wide")
st.title("🎓 College Event Feedback Analysis")

# Load and clean data
@st.cache_data
def load_data():
    df = pd.read_excel("finalDataset0.2.xlsx")

    # Rename duplicate columns for clarity
    df.columns = [
        "teaching_text", "teaching_sentiment",
        "coursecontent_text", "coursecontent_sentiment",
        "examination_text", "examination_sentiment",
        "labwork_text", "labwork_sentiment",
        "library_facilities_text", "library_facilities_sentiment",
        "extracurricular_text", "extracurricular_sentiment"
    ]
    return df

df = load_data()

# Category map: {Label: (TextColumn, SentimentColumn)}
categories = {
    "Teaching": "teaching_sentiment",
    "Course Content": "coursecontent_sentiment",
    "Examination": "examination_sentiment",
    "Lab Work": "labwork_sentiment",
    "Library Facilities": "library_facilities_sentiment",
    "Extracurricular Activities": "extracurricular_sentiment"
}

# Sidebar
st.sidebar.title("📌 Options")
selected_label = st.sidebar.selectbox("Select Feedback Category", list(categories.keys()))
sentiment_col = categories[selected_label]

# Layout
st.subheader(f"📊 Sentiment Breakdown: {selected_label}")

# Bar chart
sentiment_counts = df[sentiment_col].value_counts().sort_index()
st.bar_chart(sentiment_counts)

# Legend and counts
st.markdown("**Sentiment Legend:**  \n"
            "-1 = Negative  \n"
            "0 = Neutral  \n"
            "1 = Positive")

st.write("### Count Summary:")
st.dataframe(sentiment_counts.rename({-1: "Negative", 0: "Neutral", 1: "Positive"}))

# Raw data viewer
with st.expander("📂 View Raw Data"):
    st.dataframe(df)

# Footer
st.markdown("---")
st.markdown("Made with ❤️ using Streamlit | Internship Project")
