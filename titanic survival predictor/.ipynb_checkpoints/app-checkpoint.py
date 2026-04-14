import streamlit as st
import pandas as pd
import pickle
from PIL import Image

# Load the saved RandomForest model
with open("titanic_model.pkl", "rb") as file:
    model = pickle.load(file)

# Set page config
st.set_page_config(
    page_title="🚢 Titanic Survival Predictor", 
    page_icon="🚢", 
    layout="centered",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
    <style>
        .main {
            background-color: #f0f2f6;
        }
        .sidebar .sidebar-content {
            background-color: #2c3e50;
            color: white;
        }
        .stButton>button {
            background-color: #3498db;
            color: white;
            border-radius: 5px;
            border: none;
            padding: 10px 24px;
            font-weight: bold;
        }
        .stButton>button:hover {
            background-color: #2980b9;
            color: white;
        }
        .stSelectbox, .stNumberInput {
            border-radius: 5px;
        }
        .success {
            color: #2ecc71;
            font-weight: bold;
        }
        .danger {
            color: #e74c3c;
            font-weight: bold;
        }
        .title {
            color: #3498db;
        }
        .header-img {
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        }
        .feature-box {
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
        }
    </style>
""", unsafe_allow_html=True)

# Header with image
col1, col2 = st.columns([1, 3])
with col1:
    st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/320px-RMS_Titanic_3.jpg", 
             width=150, caption="RMS Titanic")
with col2:
    st.title("Titanic Survival Prediction")
    st.markdown("""
    <div style="color: #7f8c8d;">
        Predict whether a passenger would have survived the Titanic disaster based on their characteristics
    </div>
    """, unsafe_allow_html=True)

# Sidebar input form
st.sidebar.markdown("<h2 style='color: white;'>Passenger Details</h2>", unsafe_allow_html=True)

# Input fields with better organization
with st.sidebar.expander("Personal Information", expanded=True):
    sex = st.selectbox("Sex", ["male", "female"])
    age_group = st.selectbox("Age Group", ['Baby', 'Child', 'Teenager', 'Student', 'Young Adult', 'Adult', 'Senior'])
    title = st.selectbox("Title", ["Mr", "Miss", "Mrs", "Master", "Royal", "Rare"])

with st.sidebar.expander("Travel Information", expanded=True):
    pclass = st.selectbox("Passenger Class", [1, 2, 3], 
                         help="1 = 1st Class, 2 = 2nd Class, 3 = 3rd Class")
    embarked = st.selectbox("Port of Embarkation", ["S", "C", "Q"], 
                          help="S = Southampton, C = Cherbourg, Q = Queenstown")
    fare_band = st.selectbox("Fare Band", [1, 2, 3, 4], 
                            help="1 = lowest fare, 4 = highest fare")

with st.sidebar.expander("Family Information", expanded=True):
    sibsp = st.number_input("Number of Siblings/Spouses aboard", min_value=0, step=1)
    parch = st.number_input("Number of Parents/Children aboard", min_value=0, step=1)

# Mapping same as in training
sex_mapping = {"male": 0, "female": 1}
age_mapping = {'Baby': 1, 'Child': 2, 'Teenager': 3, 'Student': 4, 'Young Adult': 5, 'Adult': 6, 'Senior': 7}
embarked_mapping = {"S": 1, "C": 2, "Q": 3}
title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Royal": 5, "Rare": 6}

# Main content area
tab1, tab2, tab3 = st.tabs(["Prediction", "Historical Facts", "About"])

with tab1:
    st.markdown("### Predict Survival Chances")
    
    # Prepare input for model
    input_data = pd.DataFrame([{
        'Pclass': pclass,
        'Sex': sex_mapping[sex],
        'SibSp': sibsp,
        'Parch': parch,
        'Embarked': embarked_mapping[embarked],
        'AgeGroup': age_mapping[age_group],
        'Title': title_mapping[title],
        'FareBand': fare_band
    }])
    
    # Display passenger summary
    st.markdown("### Passenger Summary")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Class", f"{pclass}{'st' if pclass == 1 else 'nd' if pclass == 2 else 'rd'} Class")
        st.metric("Age Group", age_group)
    with col2:
        st.metric("Title", title)
        st.metric("Sex", sex.capitalize())
    with col3:
        st.metric("Embarked", embarked)
        st.metric("Fare Band", fare_band)
    
    # Prediction button
    if st.button("Predict Survival", key="predict_button"):
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1] * 100
        
        st.markdown("### Prediction Result")
        
        if prediction == 1:
            st.success(f"✅ This passenger would likely have SURVIVED")
            st.metric("Survival Probability", f"{probability:.2f}%", delta="High chance", delta_color="normal")
            
            # Show survival tips based on characteristics
            st.markdown("#### Why this passenger might have survived:")
            if sex == "female":
                st.markdown("- Women had higher survival rates (74% vs 19% for men)")
            if pclass == 1:
                st.markdown("- 1st class passengers had priority for lifeboats")
            if age_group in ["Baby", "Child"]:
                st.markdown("- Children were prioritized during evacuation")
        else:
            st.error(f"❌ This passenger would likely NOT have survived")
            st.metric("Survival Probability", f"{probability:.2f}%", delta="Low chance", delta_color="inverse")
            
            # Show reasons for low survival chance
            st.markdown("#### Factors that reduced survival chances:")
            if sex == "male":
                st.markdown("- Men were often required to stay behind (only 19% survived)")
            if pclass == 3:
                st.markdown("- 3rd class passengers had limited access to lifeboats")
            if age_group == "Senior":
                st.markdown("- Older passengers may have had difficulty reaching lifeboats")

with tab2:
    st.markdown("### Titanic Historical Facts")
    
    facts = [
        "The Titanic carried 2,224 passengers and crew on its maiden voyage",
        "Only 705 people survived the disaster (31.6% survival rate)",
        "73% of women survived vs only 19% of men",
        "53% of children survived overall",
        "1st class passengers had a 62% survival rate vs 25% for 3rd class",
        "The ship was traveling at 22.5 knots when it hit the iceberg",
        "The water temperature was -2°C (28°F) when the ship sank",
        "Only 20 lifeboats were carried, with capacity for 1,178 people"
    ]
    
    for fact in facts:
        st.markdown(f"🔹 {fact}")
    
    st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Titanic_survivors_boarding_Carpathia.jpg/800px-Titanic_survivors_boarding_Carpathia.jpg",
             caption="Survivors boarding the Carpathia")

with tab3:
    st.markdown("### About This App")
    st.markdown("""
    This predictive model uses machine learning to estimate the likelihood that a passenger would have survived the Titanic disaster based on their characteristics.
    
    **Model Details:**
    - Algorithm: Random Forest Classifier
    - Training Data: Titanic passenger dataset
    - Features Used: Passenger class, sex, age, family size, fare, etc.
    
    **How to Use:**
    1. Enter passenger details in the sidebar
    2. Click "Predict Survival"
    3. View the prediction and probability
    
    The model achieves approximately 80% accuracy on test data.
    """)
    
    st.markdown("---")
    st.markdown("Created with ❤️ using Streamlit")
    st.markdown("Model trained on historical Titanic passenger data")

# Add some visual separation
st.sidebar.markdown("---")
st.sidebar.markdown("""
    <div style="color: #bdc3c7; font-size: small;">
        Note: This is a predictive model only. Actual survival depended on many complex factors.
    </div>
""", unsafe_allow_html=True)