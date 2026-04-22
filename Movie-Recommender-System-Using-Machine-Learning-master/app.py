import pickle
import streamlit as st
import requests
import urllib.parse
import pandas as pd

OMDB_API_KEY = "404acc5b-5102-48f3-ab78-f98d71e22271"

# ✅ Safe fetch poster from OMDb API
def fetch_poster(movie_title):
    safe_title = urllib.parse.quote_plus(movie_title.strip())
    url = f"http://www.omdbapi.com/?t={safe_title}&apikey={OMDB_API_KEY}"

    try:
        response = requests.get(url, timeout=5)
        data = response.json()

        if response.status_code == 200 and data.get("Poster") and data["Poster"] != "N/A":
            return data["Poster"]
        else:
            return "https://via.placeholder.com/400x600?text=No+Poster"
    except Exception as e:
        print(f"Error: {e}")
        return "https://via.placeholder.com/400x600?text=Error"

# ✅ Load data
try:
    movies = pickle.load(open("artifacts/movie_list.pkl", "rb"))
    similarity = pickle.load(open("artifacts/similarity.pkl", "rb"))
except Exception as e:
    st.error("❌ Could not load required pickle files.")
    st.stop()

# ✅ Recommend movies
def recommend(movie):
    try:
        index = movies[movies['title'] == movie].index[0]
    except IndexError:
        st.warning("🚫 Movie not found in dataset.")
        return [], []

    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])

    recommended_names = []
    recommended_posters = []

    for i in distances[1:6]:
        movie_title = movies.iloc[i[0]].title
        recommended_names.append(movie_title)
        recommended_posters.append(fetch_poster(movie_title))

    return recommended_names, recommended_posters

# ✅ Streamlit UI
st.set_page_config(page_title="🎬 Movie Recommender", layout="wide")
st.title("🎥 Movie Recommender System")

movie_list = movies['title'].values
selected_movie = st.selectbox("🔎 Search for a movie", movie_list)

if st.button("🎯 Show Recommendations"):
    names, posters = recommend(selected_movie)

    if names:
        cols = st.columns(5)
        for i in range(len(names)):
            with cols[i]:
                st.image(posters[i], caption=names[i], use_column_width=True)
    else:
        st.info("📭 No recommendations available.")

st.markdown("---")
st.markdown("<center>Made with ❤️ by <b>Mohd Shami</b></center>", unsafe_allow_html=True)
