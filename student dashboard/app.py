import streamlit as st
import pandas as pd
import pickle
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import warnings
warnings.filterwarnings('ignore')

# ---------------------------------------------------
# PAGE CONFIGURATION
# ---------------------------------------------------
st.set_page_config(
    page_title="Student Analytics Dashboard", 
    layout="wide",
    page_icon="🎓",
    initial_sidebar_state="expanded"
)

# ---------------------------------------------------
# CUSTOM CSS FOR BETTER STYLING
# ---------------------------------------------------
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background-color: #f0f2f6;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 0.5rem;
    }
    .prediction-result {
        font-size: 2rem;
        text-align: center;
        padding: 2rem;
        border-radius: 15px;
        margin: 1rem 0;
    }
    .success-prediction {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    .feature-importance {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------
# LOAD PIPELINE (full pipeline: preprocess + model)
# ---------------------------------------------------
@st.cache_resource
def load_pipeline():
    try:
        return pickle.load(open("student_pipeline.pkl", "rb"))
    except FileNotFoundError:
        st.error("❌ Pipeline file 'student_pipeline.pkl' not found. Please ensure it's in the same directory.")
        return None

pipeline = load_pipeline()

# ---------------------------------------------------
# LOAD DATA (for EDA only)
# ---------------------------------------------------
@st.cache_data
def load_data():
    try:
        df = pd.read_csv("student-por.csv")
        return df
    except FileNotFoundError:
        st.error("❌ Dataset file 'student-por.csv' not found. Please ensure it's in the same directory.")
        return pd.DataFrame()

df = load_data()

# ---------------------------------------------------
# SIDEBAR
# ---------------------------------------------------
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/2919/2919600.png", width=100)
    st.title("🎓 Student Analytics")
    st.markdown("---")
    st.markdown("### Navigation")
    page = st.radio("Go to", ["📊 Exploratory Analysis", "🎯 Grade Prediction", "📈 Performance Insights"])
    
    if not df.empty:
        st.markdown("---")
        st.markdown("### Dataset Info")
        st.write(f"**Students:** {len(df)}")
        st.write(f"**Features:** {len(df.columns)}")
        st.write(f"**Average G3:** {df['G3'].mean():.2f}")

# ---------------------------------------------------
# HEADER
# ---------------------------------------------------
st.markdown('<h1 class="main-header">🎓 Student Performance Analytics Dashboard</h1>', unsafe_allow_html=True)

# =======================================================
# ------------------ PAGE 1 → EXPLORATORY ANALYSIS ------
# =======================================================
if page == "📊 Exploratory Analysis" and not df.empty:
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Total Students", len(df))
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col2:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        avg_grade = df['G3'].mean()
        st.metric("Average Final Grade", f"{avg_grade:.2f}")
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col3:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        pass_rate = (df['G3'] >= 10).mean() * 100
        st.metric("Pass Rate", f"{pass_rate:.1f}%")
        st.markdown('</div>', unsafe_allow_html=True)
    
    with col4:
        st.markdown('<div class="metric-card">', unsafe_allow_html=True)
        st.metric("Features", len(df.columns))
        st.markdown('</div>', unsafe_allow_html=True)
    
    # Dataset Preview
    st.markdown("## 📋 Dataset Overview")
    
    tab1, tab2, tab3, tab4, tab5 = st.tabs(["📊 Data Preview", "📈 Distributions", "🔍 Correlations", "📊 Categorical Analysis", "🎯 Target Analysis"])
    
    with tab1:
        st.subheader("Dataset Sample")
        st.dataframe(df.head(10), use_container_width=True)
        
        st.subheader("Dataset Summary")
        st.write(df.describe())
        
        st.subheader("Missing Values")
        missing_df = pd.DataFrame({
            'Column': df.columns,
            'Missing Values': df.isnull().sum(),
            'Percentage': (df.isnull().sum() / len(df)) * 100
        })
        st.dataframe(missing_df, use_container_width=True)
    
    with tab2:
        st.subheader("Feature Distributions")
        col1, col2 = st.columns(2)
        
        with col1:
            numeric_cols = df.select_dtypes(include=np.number).columns
            selected_num_col = st.selectbox("Select numeric column", numeric_cols, key="num_dist")
            
            fig = px.histogram(df, x=selected_num_col, nbins=20, 
                              title=f"Distribution of {selected_num_col}",
                              color_discrete_sequence=['#1f77b4'])
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            categorical_cols = df.select_dtypes(include='object').columns
            if len(categorical_cols) > 0:
                selected_cat_col = st.selectbox("Select categorical column", categorical_cols, key="cat_dist")
                
                value_counts = df[selected_cat_col].value_counts()
                fig = px.pie(values=value_counts.values, names=value_counts.index,
                            title=f"Distribution of {selected_cat_col}")
                st.plotly_chart(fig, use_container_width=True)
    
    with tab3:
        st.subheader("Feature Correlations")
        
        # Correlation heatmap
        fig = px.imshow(df.select_dtypes(include=np.number).corr(),
                       title="Correlation Heatmap",
                       color_continuous_scale='RdBu_r',
                       aspect="auto")
        st.plotly_chart(fig, use_container_width=True)
        
        # Scatter plot with correlation
        col1, col2 = st.columns(2)
        with col1:
            x_axis = st.selectbox("X-axis", numeric_cols, key="scatter_x")
        with col2:
            y_axis = st.selectbox("Y-axis", numeric_cols, index=1, key="scatter_y")
        
        fig = px.scatter(df, x=x_axis, y=y_axis, color='G3',
                        title=f"{x_axis} vs {y_axis}",
                        trendline="ols",
                        color_continuous_scale='viridis')
        st.plotly_chart(fig, use_container_width=True)
    
    with tab4:
        st.subheader("Categorical Features Analysis")
        if len(categorical_cols) > 0:
            selected_cat = st.selectbox("Select categorical feature", categorical_cols, key="cat_analysis")
            
            col1, col2 = st.columns(2)
            
            with col1:
                # Box plot
                fig = px.box(df, x=selected_cat, y='G3', 
                            title=f"Grade Distribution by {selected_cat}")
                st.plotly_chart(fig, use_container_width=True)
            
            with col2:
                # Bar plot with average grades
                avg_grades = df.groupby(selected_cat)['G3'].mean().sort_values(ascending=False)
                fig = px.bar(x=avg_grades.index, y=avg_grades.values,
                            title=f"Average Grade by {selected_cat}",
                            labels={'x': selected_cat, 'y': 'Average G3'})
                st.plotly_chart(fig, use_container_width=True)
    
    with tab5:
        st.subheader("Target Variable Analysis")
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Grade distribution
            fig = px.histogram(df, x='G3', nbins=20, 
                              title="Distribution of Final Grades (G3)",
                              color_discrete_sequence=['#ff7f0e'])
            fig.add_vline(x=10, line_dash="dash", line_color="red", 
                         annotation_text="Passing Threshold")
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Pass/Fail ratio
            pass_fail = df['G3'].apply(lambda x: 'Pass' if x >= 10 else 'Fail')
            counts = pass_fail.value_counts()
            fig = px.pie(values=counts.values, names=counts.index,
                        title="Pass/Fail Distribution")
            st.plotly_chart(fig, use_container_width=True)

# =======================================================
# ------------------ PAGE 2 → GRADE PREDICTION ----------
# =======================================================
elif page == "🎯 Grade Prediction":
    st.header("🎓 Student Grade Prediction")
    
    if pipeline is None:
        st.error("Please ensure the pipeline file 'student_pipeline.pkl' is available for predictions.")
    elif df.empty:
        st.error("Please ensure the dataset file 'student-por.csv' is available for reference values.")
    else:
        st.markdown("""
        <div style='background-color: #e8f4fd; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;'>
        <h3>📝 Instructions</h3>
        <p>Fill in the student information below to predict their final grade (G3). 
        The model will analyze the input and provide a prediction on a scale of 0-20.</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Organize inputs into categories
        st.subheader("👤 Student Demographics")
        col1, col2, col3 = st.columns(3)
        
        input_data = {}
        
        with col1:
            input_data['school'] = st.selectbox("School", sorted(df['school'].unique()))
            input_data['sex'] = st.selectbox("Gender", sorted(df['sex'].unique()))
            input_data['age'] = st.slider("Age", 
                                         int(df['age'].min()), 
                                         int(df['age'].max()),
                                         int(df['age'].mean()))
        
        with col2:
            input_data['address'] = st.selectbox("Address Type", sorted(df['address'].unique()))
            input_data['famsize'] = st.selectbox("Family Size", sorted(df['famsize'].unique()))
            input_data['Pstatus'] = st.selectbox("Parent Cohabitation", sorted(df['Pstatus'].unique()))
        
        with col3:
            input_data['Medu'] = st.select_slider("Mother Education", 
                                                 options=sorted(df['Medu'].unique()),
                                                 value=int(df['Medu'].median()))
            input_data['Fedu'] = st.select_slider("Father Education", 
                                                 options=sorted(df['Fedu'].unique()),
                                                 value=int(df['Fedu'].median()))
        
        st.markdown("---")
        st.subheader("🏠 Family Background")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            input_data['Mjob'] = st.selectbox("Mother Job", sorted(df['Mjob'].unique()))
            input_data['Fjob'] = st.selectbox("Father Job", sorted(df['Fjob'].unique()))
        
        with col2:
            input_data['guardian'] = st.selectbox("Guardian", sorted(df['guardian'].unique()))
            input_data['famsup'] = st.selectbox("Family Support", sorted(df['famsup'].unique()))
        
        with col3:
            input_data['reason'] = st.selectbox("Reason for School", sorted(df['reason'].unique()))
        
        st.markdown("---")
        st.subheader("📚 Academic Information")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            input_data['traveltime'] = st.select_slider("Travel Time", 
                                                       options=sorted(df['traveltime'].unique()),
                                                       value=int(df['traveltime'].median()))
            input_data['studytime'] = st.select_slider("Study Time", 
                                                      options=sorted(df['studytime'].unique()),
                                                      value=int(df['studytime'].median()))
        
        with col2:
            input_data['failures'] = st.select_slider("Past Failures", 
                                                     options=sorted(df['failures'].unique()),
                                                     value=int(df['failures'].median()))
            input_data['schoolsup'] = st.selectbox("School Support", sorted(df['schoolsup'].unique()))
        
        with col3:
            input_data['paid'] = st.selectbox("Extra Paid Classes", sorted(df['paid'].unique()))
            input_data['higher'] = st.selectbox("Wants Higher Education", sorted(df['higher'].unique()))
        
        st.markdown("---")
        st.subheader("💡 Student Behavior & Activities")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            input_data['activities'] = st.selectbox("Extra-curricular Activities", sorted(df['activities'].unique()))
            input_data['internet'] = st.selectbox("Internet Access", sorted(df['internet'].unique()))
        
        with col2:
            input_data['romantic'] = st.selectbox("In Relationship", sorted(df['romantic'].unique()))
            input_data['freetime'] = st.select_slider("Free Time", 
                                                     options=sorted(df['freetime'].unique()),
                                                     value=int(df['freetime'].median()))
        
        with col3:
            input_data['goout'] = st.select_slider("Going Out", 
                                                  options=sorted(df['goout'].unique()),
                                                  value=int(df['goout'].median()))
            input_data['Dalc'] = st.select_slider("Workday Alcohol", 
                                                options=sorted(df['Dalc'].unique()),
                                                value=int(df['Dalc'].median()))
        
        # Add remaining features that might not be covered above
        other_features = [col for col in df.columns if col != 'G3' and col not in input_data]
        for feature in other_features:
            if df[feature].dtype == "object":
                input_data[feature] = st.selectbox(feature, sorted(df[feature].unique()))
            else:
                input_data[feature] = st.number_input(
                    feature, 
                    min_value=float(df[feature].min()),
                    max_value=float(df[feature].max()),
                    value=float(df[feature].median())
                )
        
        # Prediction button
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            predict_btn = st.button("🎯 Predict Final Grade", type="primary", use_container_width=True)
        
        if predict_btn:
            with st.spinner("🔮 Predicting student performance..."):
                try:
                    input_df = pd.DataFrame([input_data])
                    prediction = pipeline.predict(input_df)[0]
                    
                    # Ensure prediction is within reasonable bounds
                    prediction = max(0, min(20, prediction))
                    
                    # Display result with styling
                    if prediction >= 10:
                        st.markdown(f"""
                        <div class="prediction-result success-prediction">
                            <h2>🎉 Prediction Successful!</h2>
                            <h3>Predicted Final Grade (G3): {prediction:.2f} / 20</h3>
                            <p>Status: <strong>PASS</strong> ✅</p>
                        </div>
                        """, unsafe_allow_html=True)
                    else:
                        st.markdown(f"""
                        <div class="prediction-result" style="background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
                            <h2>📊 Prediction Result</h2>
                            <h3>Predicted Final Grade (G3): {prediction:.2f} / 20</h3>
                            <p>Status: <strong>AT RISK</strong> ⚠️</p>
                        </div>
                        """, unsafe_allow_html=True)
                    
                    # Additional insights
                    col1, col2, col3 = st.columns(3)
                    
                    with col1:
                        st.metric("Predicted Score", f"{prediction:.2f}")
                    
                    with col2:
                        if prediction >= 16:
                            performance = "Excellent"
                        elif prediction >= 14:
                            performance = "Very Good"
                        elif prediction >= 12:
                            performance = "Good"
                        elif prediction >= 10:
                            performance = "Satisfactory"
                        else:
                            performance = "Needs Improvement"
                        st.metric("Performance Level", performance)
                    
                    with col3:
                        points_to_pass = max(0, 10 - prediction)
                        st.metric("Points to Pass", f"{points_to_pass:.2f}")
                        
                except Exception as e:
                    st.error(f"❌ Prediction Error: {str(e)}")

# =======================================================
# ------------------ PAGE 3 → PERFORMANCE INSIGHTS ------
# =======================================================
elif page == "📈 Performance Insights" and not df.empty:
    st.header("📈 Advanced Performance Insights")
    
    tab1, tab2, tab3 = st.tabs(["📊 Performance Trends", "🎓 Student Clustering", "🔮 Prediction Analysis"])
    
    with tab1:
        st.subheader("Academic Performance Trends")
        
        col1, col2 = st.columns(2)
        
        with col1:
            # G1, G2, G3 progression
            fig = go.Figure()
            fig.add_trace(go.Box(y=df['G1'], name='G1 (First Period)'))
            fig.add_trace(go.Box(y=df['G2'], name='G2 (Second Period)'))
            fig.add_trace(go.Box(y=df['G3'], name='G3 (Final)'))
            fig.update_layout(title="Grade Distribution Across Periods")
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Study time vs grades
            study_effect = df.groupby('studytime')['G3'].mean()
            fig = px.bar(x=study_effect.index, y=study_effect.values,
                        title="Average Final Grade by Study Time",
                        labels={'x': 'Study Time (1-4)', 'y': 'Average G3'})
            st.plotly_chart(fig, use_container_width=True)
    
    with tab2:
        st.subheader("Student Segmentation")
        
        # Simple clustering based on key features
        from sklearn.cluster import KMeans
        from sklearn.preprocessing import StandardScaler
        
        # Select features for clustering
        cluster_features = ['age', 'Medu', 'Fedu', 'studytime', 'failures', 'G3']
        cluster_df = df[cluster_features].copy()
        
        # Scale the data
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(cluster_df)
        
        # Apply K-means
        kmeans = KMeans(n_clusters=3, random_state=42)
        clusters = kmeans.fit_predict(scaled_data)
        
        cluster_df['Cluster'] = clusters
        
        fig = px.scatter_3d(cluster_df, x='studytime', y='Medu', z='G3',
                           color='Cluster', title="Student Clusters",
                           color_continuous_scale='viridis')
        st.plotly_chart(fig, use_container_width=True)
        
        # Cluster descriptions
        st.subheader("Cluster Characteristics")
        cluster_summary = cluster_df.groupby('Cluster').mean()
        st.dataframe(cluster_summary.style.background_gradient(cmap='Blues'))
    
    with tab3:
        st.subheader("Model Performance Insights")
        
        if pipeline is not None:
            # Feature importance (if available in pipeline)
            st.info("""
            **Feature Importance Analysis** shows which factors most strongly influence student performance.
            This helps educators focus on the most impactful areas for student success.
            """)
            
            # Placeholder for feature importance - you would need to extract this from your model
            st.warning("""
            ⚠️ **Note**: To display feature importance, ensure your pipeline includes a model 
            that supports feature importance (like Random Forest, XGBoost, etc.) and modify 
            the code to extract and visualize these importances.
            """)
            
            # Example placeholder visualization
            features = ['Medu', 'Fedu', 'studytime', 'failures', 'absences', 'G1', 'G2']
            importance = [0.15, 0.12, 0.18, 0.10, 0.08, 0.25, 0.12]  # Example values
            
            fig = px.bar(x=importance, y=features, orientation='h',
                        title="Example Feature Importance (Placeholder)",
                        labels={'x': 'Importance', 'y': 'Features'})
            st.plotly_chart(fig, use_container_width=True)

# =======================================================
# ------------------ FOOTER -----------------------------
# =======================================================
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666;'>
    <p>🎓 Student Performance Analytics Dashboard | Built with Streamlit</p>
    <p>For educational purposes only</p>
</div>
""", unsafe_allow_html=True)