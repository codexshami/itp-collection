import pandas as pd
import streamlit as st
import plotly.express as px

# ✅ Streamlit Page Settings
st.set_page_config(layout="wide")
st.title("📈 Social Media Campaign Performance Tracker (Facebook Ads)")

# ✅ Load Data
df = pd.read_csv("data.csv")

# ✅ Preprocessing
df.drop_duplicates(inplace=True)
df.fillna(0, inplace=True)

df['reporting_start'] = pd.to_datetime(df['reporting_start'])
df['reporting_end'] = pd.to_datetime(df['reporting_end'])

# ✅ Add Metrics
df['CTR (%)'] = (df['clicks'] / df['impressions']) * 100
df['Conversion Rate (%)'] = (df['total_conversion'] / df['clicks']) * 100
df['Approved Conv. Rate (%)'] = (df['approved_conversion'] / df['clicks']) * 100

# ✅ Sidebar Filters
campaigns = st.sidebar.multiselect("Select Campaign", df['fb_campaign_id'].unique(), default=df['fb_campaign_id'].unique())
genders = st.sidebar.multiselect("Select Gender", df['gender'].unique(), default=df['gender'].unique())
ages = st.sidebar.multiselect("Select Age Group", df['age'].unique(), default=df['age'].unique())
date_range = st.sidebar.date_input("Date Range", [])

# ✅ Apply Filters
filtered_df = df[
    (df['fb_campaign_id'].isin(campaigns)) &
    (df['gender'].isin(genders)) &
    (df['age'].isin(ages))
]

if len(date_range) == 2:
    filtered_df = filtered_df[
        (filtered_df['reporting_start'] >= pd.to_datetime(date_range[0])) &
        (filtered_df['reporting_start'] <= pd.to_datetime(date_range[1]))
    ]

# ✅ KPI Metrics
total_spend = filtered_df['spent'].sum()
total_clicks = filtered_df['clicks'].sum()
total_impressions = filtered_df['impressions'].sum()
avg_ctr = filtered_df['CTR (%)'].mean()
total_conversions = filtered_df['total_conversion'].sum()
approved_conversions = filtered_df['approved_conversion'].sum()

col1, col2, col3, col4 = st.columns(4)
col1.metric("💰 Total Spent", f"${total_spend:,.2f}")
col2.metric("🖱️ Total Clicks", f"{total_clicks:,}")
col3.metric("📢 Impressions", f"{total_impressions:,}")
col4.metric("📊 Avg CTR", f"{avg_ctr:.2f}%")

col5, col6 = st.columns(2)
col5.metric("✅ Total Conversions", f"{total_conversions:,}")
col6.metric("✔️ Approved Conversions", f"{approved_conversions:,}")

# ✅ Charts

# 1. Spend by Campaign
fig1 = px.bar(
    filtered_df.groupby('fb_campaign_id')['spent'].sum().reset_index(),
    x='fb_campaign_id', y='spent',
    title='💵 Spend by Campaign ID', text_auto=True
)
st.plotly_chart(fig1, use_container_width=True)

# 2. CTR Trend
ctr_trend = filtered_df.groupby('reporting_start')['CTR (%)'].mean().reset_index()
fig2 = px.line(ctr_trend, x='reporting_start', y='CTR (%)', title='📈 CTR Over Time')
st.plotly_chart(fig2, use_container_width=True)

# 3. Clicks vs Impressions (Bubble Size: Spend)
fig3 = px.scatter(
    filtered_df,
    x='impressions', y='clicks',
    size='spent', color='fb_campaign_id',
    hover_data=['CTR (%)', 'Conversion Rate (%)'],
    title="🧮 Clicks vs Impressions"
)
st.plotly_chart(fig3, use_container_width=True)

# 4. Conversion Rate by Gender
fig4 = px.bar(
    filtered_df.groupby('gender')['Conversion Rate (%)'].mean().reset_index(),
    x='gender', y='Conversion Rate (%)',
    title="👥 Conversion Rate by Gender"
)
st.plotly_chart(fig4, use_container_width=True)

# 5. Conversion Rate by Age Group
fig5 = px.bar(
    filtered_df.groupby('age')['Conversion Rate (%)'].mean().reset_index(),
    x='age', y='Conversion Rate (%)',
    title="👶👵 Conversion Rate by Age Group"
)
st.plotly_chart(fig5, use_container_width=True)

# ✅ Footer
st.markdown("---")
st.markdown("Made with ❤️ by [Mohd Shami](https://codewithshami.blogspot.com)  |  [GitHub](https://github.com/codewithshami)  |  [LinkedIn](https://www.linkedin.com/in/mohd-shami/)")
     
