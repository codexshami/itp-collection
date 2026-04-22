import streamlit as st
import pandas as pd
import re

# Clean hidden/invisible characters
def clean_text(text):
    if pd.isna(text):
        return ""
    return re.sub(r'[\u200b-\u200d\uFEFF]', '', str(text)).strip()

# Load and clean CSV data
@st.cache_data
def load_data():
    df = pd.read_csv("data.csv")
    df['Exercise Name Cleaned'] = df['Exercise Name'].apply(clean_text)
    return df

# Load dataset
df = load_data()

# Page setup
st.set_page_config(page_title="🏋️ Gym Stretch Explorer", layout="wide")
st.title("🏋️ Gym Stretch Exercise Explorer")

# Sidebar selection
st.sidebar.header("🗂️ Choose an Exercise")
exercise_list = sorted(df['Exercise Name Cleaned'].unique())
selected_exercise = st.sidebar.selectbox("🔍 Select Exercise", exercise_list)

# Find selected exercise details
match_df = df[df['Exercise Name Cleaned'] == selected_exercise]

if not match_df.empty:
    row = match_df.iloc[0]

    st.markdown(f"## 🔸 {row['Exercise Name']}")
    st.markdown(f"**Main Muscle:** `{row['Main_muscle']}`  |  **Equipment:** `{row['Equipment']}`")
    st.markdown(f"**Target Muscles:** {row['Target_Muscles']}")
    st.markdown(f"**Synergist Muscles:** {row['Synergist_Muscles']}")

    st.markdown("#### 🧍 Preparation")
    st.info(row['Preparation'])

    st.markdown("#### 🎯 Execution")
    st.success(row['Execution'])
else:
    st.warning("❌ No exercise found. Try another.")
