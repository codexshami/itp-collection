import streamlit as st
import pickle
import numpy as np

# ----- Load model and scaler -----
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

with open("scaler.pkl", "rb") as file:
    scaler = pickle.load(file)

# ----- Page title -----
st.title("💳 Credit Card Fraud Detection")
st.markdown("### 🚨 Predict if a transaction is Fraudulent or Not")

# ----- Sidebar instructions -----
st.sidebar.title("📌 Instructions")
st.sidebar.markdown("""
- Enter the values for each feature below.
- These are anonymized features (Time, V1 to V28, Amount).
- Click **'Check Fraud'** to see the result.
""")

# ----- Input fields -----
st.markdown("### 🧾 Enter Transaction Details")

input_data = []

# 1. Time (added to fix shape mismatch)
time = st.number_input("Time", value=0.0, format="%.2f")
input_data.append(time)

# 2. V1 to V28
for i in range(1, 29):
    val = st.number_input(f"V{i}", value=0.0, format="%.6f")
    input_data.append(val)

# 3. Amount
amount = st.number_input("Amount", value=0.0, format="%.2f")
input_data.append(amount)

# ----- Prediction -----
if st.button("Check Fraud"):
    input_np = np.array(input_data).reshape(1, -1)
    input_scaled = scaler.transform(input_np)
    prediction = model.predict(input_scaled)

    if prediction[0] == 1:
        st.error("⚠️ Fraudulent Transaction Detected!")
    else:
        st.success("✅ Transaction is Legitimate.")

# Footer
st.markdown("---")
st.markdown("<center>Developed for Credit Card Fraud Detection Internship Project</center>", unsafe_allow_html=True)
st.write("Prediction Probabilities: ", model.predict_proba(input_scaled))
st.markdown("<center>© 2023 Your Name</center>", unsafe_allow_html=True)
st.markdown("<center>Powered by Streamlit</center>", unsafe_allow_html=True)
