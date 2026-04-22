# File: detector.py
# Purpose: Fake Internship Detector using Logistic Regression and TF-IDF
# Environment: Python 3.13, VS Code, fake_internship_env

import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import re
import joblib
import os
import sys

# Initialize NLTK resources
def initialize_nltk():
    print("Initializing NLTK resources...")
    try:
        nltk.download('punkt', quiet=False)  # Explicitly download punkt with feedback
        nltk.download('stopwords', quiet=False)
        print("NLTK resources initialized successfully.")
    except Exception as e:
        print(f"Error downloading NLTK resources: {e}")
        sys.exit(1)

# Preprocess text data
def preprocess_text(text):
    try:
        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word not in stop_words]
        return ' '.join(tokens)
    except Exception as e:
        print(f"Error preprocessing text: {e}")
        return text  # Return raw text as fallback

# Load and prepare data
def load_data(file_path='data.csv'):
    print(f"Loading data from {file_path}...")
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"{file_path} not found in the project directory.")
        data = pd.read_csv(file_path)
        if 'text' not in data.columns or 'label' not in data.columns:
            raise ValueError("data.csv must contain 'text' and 'label' columns.")
        print(f"Loaded {len(data)} entries from {file_path}.")
        return data
    except Exception as e:
        print(f"Error loading data: {e}")
        sys.exit(1)

# Train and evaluate model
def train_model(data):
    print("Training model...")
    try:
        data['cleaned_text'] = data['text'].apply(preprocess_text)
        vectorizer = TfidfVectorizer(max_features=1000)
        X = vectorizer.fit_transform(data['cleaned_text']).toarray()
        y = data['label']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        print("Test set label distribution:", y_test.value_counts())  # Debug: Check test set balance
        
        model = LogisticRegression(max_iter=1000)
        model.fit(X_train, y_train)
        
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred, target_names=['Fake', 'Genuine'])
        
        print("\nModel Evaluation:")
        print(f"Accuracy: {accuracy:.2f}")
        print("Classification Report:\n", report)
        
        joblib.dump(model, 'fake_internship_model.pkl')
        joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
        print("Model and vectorizer saved successfully.")
        
        return model, vectorizer
    except Exception as e:
        print(f"Error training model: {e}")
        sys.exit(1)

# Predict new internship offer
def predict_internship(text, model, vectorizer):
    try:
        cleaned_text = preprocess_text(text)
        text_vector = vectorizer.transform([cleaned_text]).toarray()
        prediction = model.predict(text_vector)[0]
        return "Genuine" if prediction == 1 else "Fake"
    except Exception as e:
        print(f"Error predicting: {e}")
        return None

# Main function
def main():
    print("Script started.")
    initialize_nltk()
    data = load_data()
    model, vectorizer = train_model(data)
    
    print("\nEnter internship offer text to check (type 'exit' to quit):")
    while True:
        user_input = input("> ")
        if user_input.lower() == 'exit':
            print("Exiting program.")
            break
        result = predict_internship(user_input, model, vectorizer)
        if result:
            print(f"Prediction: {result}\n")

if __name__ == "__main__":
    main()