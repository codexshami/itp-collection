import streamlit as st
import requests
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Set page config
st.set_page_config(
    page_title="Weather Dashboard",
    page_icon="⛅",
    layout="wide"
)

# Hardcoded API Key
API_KEY = ""  # Your API key here

# Custom CSS
st.markdown("""
    <style>
    .main {
        background-color: #f5f5f5;
    }
    .stTextInput input {
        background-color: #fff;
    }
    .stRadio > div {
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
    }
    </style>
    """, unsafe_allow_html=True)

# Sidebar controls
with st.sidebar:
    st.title("⛅ Weather Dashboard")
    st.write("Get weather forecasts for any location")
    
    # Location input
    col1, col2 = st.columns(2)
    with col1:
        city = st.text_input("City", "London")
    with col2:
        country = st.text_input("Country Code", "GB", 
                              help="Optional - 2-letter country code")
    
    # Unit selection
    unit = st.radio("Unit System", 
                   ("Metric (°C, m/s)", "Imperial (°F, mph)"), 
                   index=0)
    
    # Forecast days
    forecast_days = st.slider("Forecast Days", 1, 5, 3)
    
    # Submit button
    if st.button("Get Weather Forecast", use_container_width=True):
        st.session_state.get_data = True
    else:
        st.session_state.get_data = False

# Main app
st.title("🌤️ Weather Visualization Dashboard")

@st.cache_data(ttl=3600)  # Cache data for 1 hour
def fetch_weather_data():
    """Fetch weather forecast data from OpenWeatherMap API"""
    try:
        unit_system = "metric" if "Metric" in unit else "imperial"
        location = f"{city},{country}" if country else city
        
        url = "http://api.openweathermap.org/data/2.5/forecast"
        params = {
            'q': location,
            'appid': API_KEY,
            'units': unit_system,
            'cnt': forecast_days * 8  # 8 data points per day (3-hour intervals)
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.HTTPError as http_err:
        st.error(f"HTTP error occurred: {http_err}")
        if response:
            st.error(f"Response: {response.json().get('message', 'Unknown error')}")
        return None
    except Exception as err:
        st.error(f"An error occurred: {err}")
        return None

def display_current_weather(data):
    """Display current weather summary"""
    current = data['list'][0]
    city = data['city']['name']
    country = data['city']['country']
    
    temp = current['main']['temp']
    feels_like = current['main']['feels_like']
    weather = current['weather'][0]['main']
    description = current['weather'][0]['description']
    humidity = current['main']['humidity']
    wind_speed = current['wind']['speed']
    
    temp_unit = '°C' if "Metric" in unit else '°F'
    speed_unit = 'm/s' if "Metric" in unit else 'mph'
    
    st.subheader(f"Current Weather in {city}, {country}")
    
    cols = st.columns(4)
    with cols[0]:
        st.metric("Temperature", f"{temp:.1f}{temp_unit}")
    with cols[1]:
        st.metric("Feels Like", f"{feels_like:.1f}{temp_unit}")
    with cols[2]:
        st.metric("Conditions", description.title())
    with cols[3]:
        st.metric("Humidity", f"{humidity}%")
    
    cols = st.columns(4)
    with cols[0]:
        st.metric("Wind Speed", f"{wind_speed} {speed_unit}")
    with cols[1]:
        st.metric("Pressure", f"{current['main']['pressure']} hPa")
    with cols[2]:
        st.metric("Cloud Cover", f"{current['clouds']['all']}%")
    with cols[3]:
        st.metric("Visibility", f"{current.get('visibility', 'N/A')} m")

def create_visualizations(df):
    """Create weather visualizations"""
    temp_unit = '°C' if "Metric" in unit else '°F'
    speed_unit = 'm/s' if "Metric" in unit else 'mph'
    
    # Temperature chart
    st.subheader(f"Temperature Forecast ({temp_unit})")
    fig, ax = plt.subplots(figsize=(10, 4))
    sns.lineplot(x='datetime', y='temperature', data=df, 
                label='Temperature', ax=ax)
    sns.lineplot(x='datetime', y='feels_like', data=df, 
                label='Feels Like', ax=ax)
    plt.xlabel('Date and Time')
    plt.ylabel(f"Temperature ({temp_unit})")
    plt.xticks(rotation=45)
    plt.legend()
    st.pyplot(fig)
    
    # Combined charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader(f"Wind Speed ({speed_unit})")
        fig, ax = plt.subplots(figsize=(8, 3))
        sns.lineplot(x='datetime', y='wind_speed', data=df, color='purple')
        plt.xlabel('Date and Time')
        plt.xticks(rotation=45)
        st.pyplot(fig)
    
    with col2:
        st.subheader("Humidity (%)")
        fig, ax = plt.subplots(figsize=(8, 3))
        sns.lineplot(x='datetime', y='humidity', data=df, color='green')
        plt.xlabel('Date and Time')
        plt.xticks(rotation=45)
        st.pyplot(fig)
    
    # Weather conditions
    st.subheader("Weather Conditions")
    fig, ax = plt.subplots(figsize=(10, 4))
    weather_counts = df['weather_main'].value_counts()
    sns.barplot(x=weather_counts.index, y=weather_counts.values, palette='viridis')
    plt.xlabel('Weather Condition')
    plt.ylabel('Count')
    st.pyplot(fig)

if st.session_state.get_data:
    with st.spinner("Fetching weather data..."):
        weather_data = fetch_weather_data()
    
    if weather_data:
        # Process data into DataFrame
        processed_data = []
        for entry in weather_data['list']:
            timestamp = datetime.fromtimestamp(entry['dt'])
            processed_data.append({
                'datetime': timestamp,
                'temperature': entry['main']['temp'],
                'feels_like': entry['main']['feels_like'],
                'humidity': entry['main']['humidity'],
                'wind_speed': entry['wind']['speed'],
                'weather_main': entry['weather'][0]['main']
            })
        
        df = pd.DataFrame(processed_data)
        
        # Display data
        display_current_weather(weather_data)
        create_visualizations(df)
        
        # Show raw data option
        if st.checkbox("Show raw forecast data"):
            st.dataframe(df)
    else:
        st.error("Failed to fetch weather data. Please check your location and try again.")
else:
    st.info("Configure your settings in the sidebar and click 'Get Weather Forecast'")