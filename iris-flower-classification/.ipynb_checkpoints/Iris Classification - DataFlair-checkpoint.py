# iris_svm_app.py

import streamlit as st
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import pickle
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# Page config
st.set_page_config(page_title="Iris Flower Classifier", page_icon="🌸", layout="wide")
st.title("🌸 Iris Flower Classification (SVM)")

# Dataset columns
columns = ['Sepal length', 'Sepal width', 'Petal length', 'Petal width', 'Class_labels']

# Load dataset
df = pd.read_csv("iris.data", names=columns)

# Sidebar menu
menu = st.sidebar.radio("Navigation", ["📊 Dataset", "📈 Visualization", "🤖 Train & Evaluate", "🔮 Predict"])

# 📊 Dataset section
if menu == "📊 Dataset":
    st.subheader("Dataset Preview")
    st.dataframe(df.head())
    st.write("**Basic Statistics**")
    st.write(df.describe())

# 📈 Visualization section
elif menu == "📈 Visualization":
    st.subheader("Pair Plot")
    fig1 = sns.pairplot(df, hue="Class_labels")
    st.pyplot(fig1)

    st.subheader("Average Feature Values by Class")
    data = df.values
    X = data[:, 0:4]
    Y = data[:, 4]

    Y_Data = np.array([np.average(X[:, i][Y == j].astype('float32'))
                       for i in range(X.shape[1]) for j in np.unique(Y)])
    Y_Data_reshaped = Y_Data.reshape(4, 3)
    Y_Data_reshaped = np.swapaxes(Y_Data_reshaped, 0, 1)
    X_axis = np.arange(len(columns) - 1)
    width = 0.25

    fig2, ax = plt.subplots()
    ax.bar(X_axis, Y_Data_reshaped[0], width, label='Setosa')
    ax.bar(X_axis + width, Y_Data_reshaped[1], width, label='Versicolour')
    ax.bar(X_axis + width * 2, Y_Data_reshaped[2], width, label='Virginica')
    ax.set_xticks(X_axis)
    ax.set_xticklabels(columns[:4])
    ax.set_xlabel("Features")
    ax.set_ylabel("Value in cm.")
    ax.legend(bbox_to_anchor=(1.05, 1))
    st.pyplot(fig2)

# 🤖 Train & Evaluate section
elif menu == "🤖 Train & Evaluate":
    st.subheader("Model Training & Evaluation")
    X = df.iloc[:, :-1].values
    Y = df.iloc[:, -1].values
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2)

    svn = SVC()
    svn.fit(X_train, y_train)
    predictions = svn.predict(X_test)
    acc = accuracy_score(y_test, predictions)

    st.write(f"**Model Accuracy:** `{acc * 100:.2f}%`")
    st.text("Classification Report:")
    st.text(classification_report(y_test, predictions))

    with open('SVM.pickle', 'wb') as f:
        pickle.dump(svn, f)
    st.success("Model trained & saved as `SVM.pickle` ✅")

# 🔮 Predict section
elif menu == "🔮 Predict":
    st.subheader("Flower Prediction")

    # Load model
    try:
        with open('SVM.pickle', 'rb') as f:
            model = pickle.load(f)
    except:
        st.error("⚠ Please train the model first in 'Train & Evaluate' section.")
        st.stop()

    # Single prediction
    st.write("### Enter Flower Measurements")
    sepal_length = st.number_input("Sepal Length (cm)", 0.0, 10.0, 5.1)
    sepal_width = st.number_input("Sepal Width (cm)", 0.0, 10.0, 3.5)
    petal_length = st.number_input("Petal Length (cm)", 0.0, 10.0, 1.4)
    petal_width = st.number_input("Petal Width (cm)", 0.0, 10.0, 0.2)

    if st.button("Predict Flower Type"):
        X_new = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
        prediction = model.predict(X_new)[0]

        species_info = {
            "Iris-setosa": "🌼 **Setosa** – Small flowers, short petals, usually found in moist areas.",
            "Iris-versicolor": "🌺 **Versicolour** – Medium-sized petals, bluish-purple flowers.",
            "Iris-virginica": "🌹 **Virginica** – Large petals, vibrant violet-blue flowers."
        }

        st.success(f"Predicted Species: **{prediction}**")
        st.write(species_info.get(prediction, "Unknown species"))

    st.markdown("---")
    st.write("### Bulk Prediction via CSV Upload")
    uploaded_file = st.file_uploader("Upload CSV with columns: Sepal length, Sepal width, Petal length, Petal width", type=["csv"])
    if uploaded_file:
        input_df = pd.read_csv(uploaded_file)
        preds = model.predict(input_df)
        input_df["Predicted Species"] = preds
        st.dataframe(input_df)
        st.download_button("Download Predictions", input_df.to_csv(index=False), "predictions.csv", "text/csv")
