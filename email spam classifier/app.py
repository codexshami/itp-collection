import streamlit as st
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from imblearn.over_sampling import SMOTE

# ----------------------------------------
# Load and preprocess data
@st.cache_data
def load_data():
    df = pd.read_csv('mail_data.csv')
    df = df.where(pd.notnull(df), '')  

    df.loc[df['Category'] == 'spam', 'Category'] = 0
    df.loc[df['Category'] == 'ham', 'Category'] = 1

    X = df['Message']
    Y = df['Category'].astype(int)

    return train_test_split(X, Y, test_size=0.2, random_state=3), df

# ----------------------------------------
# Train the model with SMOTE
@st.cache_resource
def train_balanced_model(X_train, Y_train):
    vectorizer = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True, ngram_range=(1, 2), max_features=3000)
    X_train_features = vectorizer.fit_transform(X_train)

    smote = SMOTE(random_state=42)
    X_train_balanced, Y_train_balanced = smote.fit_resample(X_train_features, Y_train)

    model = LogisticRegression()
    model.fit(X_train_balanced, Y_train_balanced)
    
    return model, vectorizer

# ----------------------------------------
# Streamlit UI
def main():
    st.set_page_config(page_title="Spam Classifier", layout="wide")

    # Sidebar
    with st.sidebar:
        st.title("Email Classifier")
        st.write("This tool uses machine learning to detect spam emails.")
        st.markdown("---")
        st.markdown("**Instructions:**")
        st.markdown("1. Enter your message.")
        st.markdown("2. Click Predict.")
        st.markdown("3. View result & model performance.")
        st.markdown("---")
        st.caption("Made with ❤️ by Mohd Shami")

    # Load and train
    (X_train, X_test, Y_train, Y_test), raw_df = load_data()
    model, vectorizer = train_balanced_model(X_train, Y_train)

    st.title("Spam Mail Detection Web App")
    st.subheader("Check whether an email/message is spam or not")

    user_input = st.text_area("Enter your message here:")

    if st.button("Predict"):
        if user_input.strip() == "":
            st.warning("Please enter a message to classify.")
        else:
            input_vector = vectorizer.transform([user_input])
            prediction = model.predict(input_vector)

            if prediction[0] == 1:
                st.success("This is a Ham (Not Spam) message.")
            else:
                st.error("This is a Spam message.")

    # Model performance section
    with st.expander("Show Model Performance"):
        X_test_features = vectorizer.transform(X_test)
        predictions = model.predict(X_test_features)

        acc = accuracy_score(Y_test, predictions)
        st.write(f"**Accuracy on Test Data:** {acc:.2%}")

        st.write("**Confusion Matrix:**")
        cm = confusion_matrix(Y_test, predictions)
        st.dataframe(pd.DataFrame(cm, columns=["Predicted Ham", "Predicted Spam"], index=["Actual Ham", "Actual Spam"]))

        st.write("**Classification Report:**")
        report = classification_report(Y_test, predictions, output_dict=True)
        st.dataframe(pd.DataFrame(report).transpose().round(2))

    # Distribution chart
    with st.expander("Show Dataset Distribution"):
        counts = raw_df['Category'].value_counts()
        labels = ['Ham', 'Spam']
        fig = counts.plot.pie(autopct='%1.1f%%', labels=labels, colors=['green', 'red'], ylabel='', title='Ham vs Spam Distribution').get_figure()
        st.pyplot(fig)

# ----------------------------------------
if __name__ == '__main__':
    main()
