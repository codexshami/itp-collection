import streamlit as st
import pandas as pd
from datetime import datetime
import os

CSV_FILE = "gym.csv"

# ----------- Create file if doesn't exist -----------
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, "w") as f:
        f.write("Date,Workout,Time\n")  # Header

# ----------- Read data safely -----------
def read_data():
    try:
        df = pd.read_csv(CSV_FILE, on_bad_lines='skip')
        df["Date"] = pd.to_datetime(df["Date"], dayfirst=True, errors="coerce")
        df["Workout"] = df["Workout"].str.strip().str.capitalize()
        df["Time"] = pd.to_timedelta(df["Time"], errors="coerce")
        df.dropna(subset=["Date", "Workout", "Time"], inplace=True)
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return pd.DataFrame(columns=["Date", "Workout", "Time"])

# ----------- Append new entry -----------
def append_entry(date, workout, time_str):
    with open(CSV_FILE, "a", newline="") as f:
        f.write(f"{date.strftime('%d-%m-%Y')},{workout.strip().capitalize()},{time_str.strip()}\n")

# ----------- Streamlit UI -----------
st.set_page_config(page_title="🏋️ Daily Gym Tracker", layout="centered")
st.title("🏋️ Daily Gym Tracker")
st.markdown("Track, visualize, and log your daily workouts using `gym.csv`.")

# ----------- Entry Form -----------
st.subheader("➕ Add New Workout Entry")
with st.form("entry_form"):
    date = st.date_input("Date", value=datetime.today())
    workout = st.selectbox("Workout Type", ["Walk", "Gym", "Work", "Holiday", "Slept", "Other"])
    hours = st.number_input("Hours", min_value=0, max_value=23, step=1)
    minutes = st.number_input("Minutes", min_value=0, max_value=59, step=1)
    submit = st.form_submit_button("Add Entry")

    if submit:
        time_str = f"{int(hours):02}:{int(minutes):02}:00"
        append_entry(date, workout, time_str)
        st.success(f"✅ Entry added: {date.strftime('%d-%m-%Y')} - {workout} - {time_str}")

# ----------- Load updated data -----------
df = read_data()

# ----------- Filter -----------
st.sidebar.header("📅 Filter by Date")
if not df.empty:
    min_date, max_date = df["Date"].min(), df["Date"].max()
    start = st.sidebar.date_input("Start Date", value=min_date, min_value=min_date, max_value=max_date)
    end = st.sidebar.date_input("End Date", value=max_date, min_value=min_date, max_value=max_date)
    filtered = df[(df["Date"] >= pd.to_datetime(start)) & (df["Date"] <= pd.to_datetime(end))]

    # ----------- Summary -----------
    st.subheader("📊 Summary")
    st.metric("Total Days Logged", filtered["Date"].nunique())
    st.metric("Total Workout Time", str(filtered["Time"].sum()))

    # ----------- Charts -----------
    st.subheader("⏱️ Total Time by Workout Type")
    workout_total = filtered.groupby("Workout")["Time"].sum().sort_values(ascending=False)
    st.bar_chart(workout_total.dt.total_seconds() / 60)  # minutes

    st.subheader("📅 Daily Workout Duration")
    daily = filtered.groupby("Date")["Time"].sum()
    st.line_chart(daily.dt.total_seconds() / 60)

    # ----------- Logs -----------
    if st.checkbox("🗒️ Show Daily Logs"):
        for _, row in filtered.sort_values("Date").iterrows():
            st.markdown(f"**{row['Date'].date()}** → `{row['Workout']}` for **{str(row['Time'])}**")

    # ----------- Raw data -----------
    if st.checkbox("🔍 Show Table"):
        st.dataframe(filtered.sort_values("Date"))

else:
    st.warning("No valid data available in `gym.csv`. Please add some entries first.")

# ----------- Footer -----------
st.markdown("---")
st.caption("Made with ❤️ using Streamlit")
