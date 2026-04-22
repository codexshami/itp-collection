import pandas as pd
import streamlit as st
import plotly.express as px

# ✅ Page Config
st.set_page_config(page_title="E-commerce Sales Dashboard", layout='wide')

# ✅ App Title
st.title("🛒 E-commerce Business Sales Dashboard")

# ✅ Load Data
@st.cache_data
def load_data():
    df = pd.read_csv("data.csv", encoding='ISO-8859-1')
    df.dropna(subset=['CustomerID'], inplace=True)
    df = df[~df['InvoiceNo'].astype(str).str.startswith('C')]
    df['TotalPrice'] = df['Quantity'] * df['UnitPrice']
    df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'], errors='coerce')
    df = df.dropna(subset=['InvoiceDate'])
    df['MonthYear'] = df['InvoiceDate'].dt.to_period('M').astype(str)
    return df

df = load_data()

# ✅ Filter by Country
country_filter = st.selectbox("🌍 Select Country", sorted(df['Country'].unique()))
filtered_df = df[df['Country'] == country_filter]

# ✅ KPI Metrics
col1, col2, col3 = st.columns(3)
col1.metric("💰 Total Revenue", f"${filtered_df['TotalPrice'].sum():,.2f}")
col2.metric("📦 Transactions", f"{filtered_df['InvoiceNo'].nunique():,}")
col3.metric("🧑‍🤝‍🧑 Unique Customers", f"{filtered_df['CustomerID'].nunique():,}")

# ✅ Top 10 Products by Revenue
top_products = (
    filtered_df.groupby('Description')['TotalPrice']
    .sum().sort_values(ascending=False)
    .head(10).reset_index()
)
fig1 = px.bar(top_products, x='Description', y='TotalPrice',
              title='Top 10 Products by Revenue', text_auto='.2s')
st.plotly_chart(fig1, use_container_width=True)

# ✅ Monthly Sales Trend
monthly_sales = (
    filtered_df.groupby('MonthYear')['TotalPrice']
    .sum().reset_index().sort_values('MonthYear')
)
fig2 = px.line(monthly_sales, x='MonthYear', y='TotalPrice',
               title='📈 Monthly Sales Trend', markers=True)
st.plotly_chart(fig2, use_container_width=True)

# ✅ Customer Segmentation
customer_segments = (
    filtered_df.groupby('CustomerID')['TotalPrice']
    .sum().reset_index()
)
customer_segments['Segment'] = pd.qcut(
    customer_segments['TotalPrice'], 4, labels=['Low', 'Medium', 'High', 'Very High']
)
fig3 = px.box(customer_segments, x='Segment', y='TotalPrice',
              title='Customer Segmentation by Revenue')
st.plotly_chart(fig3, use_container_width=True)

# ✅ Data Table
st.markdown(f"### 📋 Filtered Transaction Data for `{country_filter}`")
st.dataframe(filtered_df)

# ✅ Download Button
@st.cache_data
def get_csv_data():
    return filtered_df.to_csv(index=False)

st.download_button("⬇️ Download Filtered Data", data=get_csv_data(),
                   file_name=f"{country_filter}_filtered_data.csv", mime="text/csv")

# ✅ Sidebar Instructions
st.sidebar.header("📌 Instructions")
st.sidebar.markdown("""
- Select a **country** to filter dashboard.
- View **KPIs**, top products, trends, and segments.
- **Download** filtered transaction data.
""")

# ✅ Footer
st.markdown("---")
st.markdown("Made with ❤️ by [Mohd Shami](https://codewithshami.blogspot.com)  |  [GitHub](https://github.com/codewithshami)  |  [LinkedIn](https://www.linkedin.com/in/mohd-shami/)")
