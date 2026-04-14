# streamlit_app.py

import streamlit as st
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import pickle
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# Page configuration
st.set_page_config(
    page_title="Iris Flower Classifier", 
    page_icon="🌸", 
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
    <style>
        .main {
            background-color: #f8f9fa;
        }
        .sidebar .sidebar-content {
            background-color: #e9f7ef;
        }
        h1, h2, h3 {
            color: #2e7d32;
        }
        .stButton>button {
            background-color: #4caf50;
            color: white;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            border: none;
        }
        .stButton>button:hover {
            background-color: #388e3c;
        }
        .stNumberInput>div>div>input {
            border-radius: 5px;
        }
        .stSuccess {
            background-color: #e8f5e9;
            color: #1b5e20;
            border-radius: 5px;
            padding: 1rem;
        }
        .stDataFrame {
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
""", unsafe_allow_html=True)

# App title with decorative elements
st.title("🌸 Iris Flower Classification")
st.markdown("""
    <div style="background-color:#e8f5e9;padding:1rem;border-radius:10px;margin-bottom:2rem">
        <h3 style="color:#2e7d32;margin:0">An interactive app to explore the Iris dataset and classify species using Support Vector Machine</h3>
    </div>
""", unsafe_allow_html=True)

# Dataset columns
columns = ['Sepal length', 'Sepal width', 'Petal length', 'Petal width', 'Class_labels']

# Load dataset
df = pd.read_csv("iris.data", names=columns)

# Sidebar navigation with icons and better styling
with st.sidebar:
    st.markdown("""
        <h2 style="color:#2e7d32;border-bottom:2px solid #a5d6a7;padding-bottom:10px">
            <i class="fas fa-bars" style="margin-right:10px"></i>Navigation
        </h2>
    """, unsafe_allow_html=True)
    
    menu = st.radio(
        "Choose a section:",
        ["📊 Dataset Explorer", "📈 Data Visualizations", "🤖 Model Training", "🔮 Species Predictor"],
        label_visibility="collapsed"
    )
    
    st.markdown("---")
    st.markdown("""
        <div style="color:#2e7d32;font-size:0.9rem">
            <p><strong>About the Iris Dataset:</strong></p>
            <p>The Iris dataset contains measurements for 150 iris flowers from three species:</p>
            <ul>
                <li>Iris Setosa</li>
                <li>Iris Versicolour</li>
                <li>Iris Virginica</li>
            </ul>
        </div>
    """, unsafe_allow_html=True)

# Dataset Explorer Section
if menu == "📊 Dataset Explorer":
    st.subheader("📋 Dataset Overview")
    
    with st.expander("🔍 View Full Dataset", expanded=False):
        st.dataframe(df.style.background_gradient(cmap='Greens'), height=300)
    
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📏 Basic Statistics")
        st.dataframe(df.describe().style.format("{:.2f}").background_gradient(cmap='Greens'))
    
    with col2:
        st.markdown("### 🌸 Class Distribution")
        class_counts = df['Class_labels'].value_counts()
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.pie(class_counts, labels=class_counts.index, autopct='%1.1f%%', 
               colors=['#4caf50', '#81c784', '#a5d6a7'], startangle=90)
        ax.axis('equal')
        st.pyplot(fig)

# Data Visualizations Section
elif menu == "📈 Data Visualizations":
    st.subheader("📊 Data Visualizations")
    
    tab1, tab2, tab3 = st.tabs(["Pair Plot", "Feature Distribution", "Feature Averages by Class"])
    
    with tab1:
        st.markdown("### 🌺 Pair Plot")
        st.write("Explore relationships between all features with this interactive visualization:")
        fig1 = sns.pairplot(df, hue="Class_labels", palette="Greens")
        st.pyplot(fig1)
    
    with tab2:
        st.markdown("### 📏 Feature Distribution")
        st.write("Distribution of each feature across all species:")
        
        feature = st.selectbox("Select a feature to visualize:", columns[:-1])
        
        fig, ax = plt.subplots(figsize=(8, 5))
        sns.boxplot(x='Class_labels', y=feature, data=df, palette="Greens", ax=ax)
        ax.set_title(f'Distribution of {feature} by Species')
        ax.set_xlabel('Species')
        ax.set_ylabel(f'{feature} (cm)')
        st.pyplot(fig)
    
    with tab3:
        st.markdown("### 📊 Average Feature Values by Class")
        st.write("Compare average measurements across different iris species:")
        
        data = df.values
        X = data[:, 0:4]
        Y = data[:, 4]

        Y_Data = np.array([np.average(X[:, i][Y == j].astype('float32'))
                           for i in range(X.shape[1]) for j in np.unique(Y)])
        Y_Data_reshaped = Y_Data.reshape(4, 3)
        Y_Data_reshaped = np.swapaxes(Y_Data_reshaped, 0, 1)
        X_axis = np.arange(len(columns) - 1)
        width = 0.25

        fig2, ax = plt.subplots(figsize=(10, 6))
        ax.bar(X_axis, Y_Data_reshaped[0], width, label='Setosa', color='#4caf50')
        ax.bar(X_axis + width, Y_Data_reshaped[1], width, label='Versicolour', color='#81c784')
        ax.bar(X_axis + width * 2, Y_Data_reshaped[2], width, label='Virginica', color='#a5d6a7')
        ax.set_xticks(X_axis + width)
        ax.set_xticklabels(columns[:4])
        ax.set_xlabel("Features", fontsize=12)
        ax.set_ylabel("Value in cm", fontsize=12)
        ax.set_title("Average Feature Measurements by Species", pad=20)
        ax.legend(bbox_to_anchor=(1.05, 1), title='Species')
        plt.tight_layout()
        st.pyplot(fig2)

# Model Training Section
elif menu == "🤖 Model Training":
    st.subheader("🤖 Model Training with SVM")
    
    st.markdown("""
        <div style="background-color:#e8f5e9;padding:1rem;border-radius:10px;margin-bottom:2rem">
            <p>This section trains a Support Vector Machine (SVM) classifier on the Iris dataset.</p>
            <p>The model will be trained on 80% of the data and tested on the remaining 20%.</p>
        </div>
    """, unsafe_allow_html=True)
    
    if st.button("🚀 Train Model", help="Click to train the SVM model"):
        with st.spinner('Training model... Please wait'):
            X = df.iloc[:, :-1].values
            Y = df.iloc[:, -1].values
            X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

            svn = SVC(kernel='linear')
            svn.fit(X_train, y_train)
            predictions = svn.predict(X_test)
            acc = accuracy_score(y_test, predictions)

            st.success("Model trained successfully!")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("### 📊 Model Performance")
                st.metric("Accuracy", f"{acc * 100:.2f}%")
                
                st.markdown("### 📝 Classification Report")
                report = classification_report(y_test, predictions, output_dict=True)
                report_df = pd.DataFrame(report).transpose()
                st.dataframe(report_df.style.background_gradient(cmap='Greens'))
            
            with col2:
                st.markdown("### 🔍 Confusion Matrix")
                from sklearn.metrics import confusion_matrix
                cm = confusion_matrix(y_test, predictions)
                
                fig, ax = plt.subplots(figsize=(6, 4))
                sns.heatmap(cm, annot=True, fmt='d', cmap='Greens', 
                            xticklabels=np.unique(Y), yticklabels=np.unique(Y), ax=ax)
                ax.set_xlabel('Predicted')
                ax.set_ylabel('Actual')
                ax.set_title('Confusion Matrix')
                st.pyplot(fig)

            # Save model
            with open('SVM.pickle', 'wb') as f:
                pickle.dump(svn, f)
            
            st.download_button(
                label="💾 Download Model",
                data=pickle.dumps(svn),
                file_name="iris_svm_model.pkl",
                mime="application/octet-stream"
            )

# Prediction Section
elif menu == "🔮 Species Predictor":
    st.subheader("🔮 Iris Species Predictor")
    
    st.markdown("""
        <div style="background-color:#e8f5e9;padding:1rem;border-radius:10px;margin-bottom:2rem">
            <p>Enter the measurements of an iris flower to predict its species.</p>
            <p>Adjust the sliders or input values directly to make predictions.</p>
        </div>
    """, unsafe_allow_html=True)
    
    try:
        with open('SVM.pickle', 'rb') as f:
            model = pickle.load(f)
    except:
        st.warning("Model not found. Please train the model first in the 'Model Training' section.")
        st.stop()
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📏 Sepal Measurements")
        sepal_length = st.slider("Sepal Length (cm)", 0.0, 10.0, 5.1, 0.1)
        sepal_width = st.slider("Sepal Width (cm)", 0.0, 10.0, 3.5, 0.1)
    
    with col2:
        st.markdown("### 📏 Petal Measurements")
        petal_length = st.slider("Petal Length (cm)", 0.0, 10.0, 1.4, 0.1)
        petal_width = st.slider("Petal Width (cm)", 0.0, 10.0, 0.2, 0.1)
    
    if st.button("🔍 Predict Species", use_container_width=True):
        X_new = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
        prediction = model.predict(X_new)
        
        # Display prediction with style
        species_colors = {
            'Iris-setosa': '#4caf50',
            'Iris-versicolor': '#81c784',
            'Iris-virginica': '#a5d6a7'
        }
        
        st.markdown(f"""
            <div style="background-color:{species_colors.get(prediction[0], '#e8f5e9')};
                        padding:2rem;
                        border-radius:10px;
                        text-align:center;
                        margin-top:2rem">
                <h2 style="color:#1b5e20">Predicted Species</h2>
                <p style="font-size:2rem;font-weight:bold;margin:1rem 0">{prediction[0]}</p>
                <p style="font-size:1rem">Based on the input measurements</p>
            </div>
        """, unsafe_allow_html=True)
        
        # Show feature values
        st.markdown("### 📋 Input Measurements")
        input_data = pd.DataFrame({
            'Feature': ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
            'Value (cm)': [sepal_length, sepal_width, petal_length, petal_width]
        })
        st.dataframe(input_data.style.format({'Value (cm)': '{:.1f}'}).background_gradient(cmap='Greens'))