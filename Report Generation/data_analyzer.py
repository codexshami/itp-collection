import pandas as pd
from typing import Dict, Any

class DataAnalyzer:
    @staticmethod
    def basic_statistics(df: pd.DataFrame) -> pd.DataFrame:
        """Generate formatted basic statistics for numerical columns"""
        stats = df.describe()
        return stats.applymap(lambda x: f"{x:.2f}" if isinstance(x, (int, float)) else x)

    @staticmethod
    def count_missing_values(df: pd.DataFrame) -> pd.DataFrame:
        """Count and format missing values in each column"""
        missing = df.isnull().sum()
        missing_df = pd.DataFrame({'Missing Values': missing})
        missing_df['Percentage'] = (missing / len(df) * 100)
        missing_df['Percentage'] = missing_df['Percentage'].map("{:.2f}%".format)
        return missing_df

    @staticmethod
    def value_counts(df: pd.DataFrame, column: str, top_n: int = 10) -> pd.DataFrame:
        """Get formatted value counts for a specific column"""
        if column not in df.columns:
            raise ValueError(f"Column '{column}' not found in DataFrame")
        
        counts = df[column].value_counts().head(top_n)
        counts_df = pd.DataFrame({column: counts.index, 'Count': counts.values})
        counts_df['Percentage'] = (counts.values / len(df) * 100).round(2)
        return counts_df

    @staticmethod
    def correlation_matrix(df: pd.DataFrame) -> pd.DataFrame:
        """Calculate and format correlation matrix"""
        numeric_df = df.select_dtypes(include=['number'])
        if len(numeric_df.columns) < 2:
            return pd.DataFrame()
        
        corr = numeric_df.corr()
        return corr.round(2)

    @staticmethod
    def analyze_data(df: pd.DataFrame) -> Dict[str, Any]:
        """Comprehensive analysis of the dataframe"""
        analysis = {
            'data_overview': df.head(5),
            'basic_stats': DataAnalyzer.basic_statistics(df),
            'missing_values': DataAnalyzer.count_missing_values(df),
            'correlation_matrix': DataAnalyzer.correlation_matrix(df)
        }

        categorical_cols = df.select_dtypes(include=['object']).columns
        if len(categorical_cols) > 0:
            col = categorical_cols[0]
            analysis[f'value_counts_{col}'] = DataAnalyzer.value_counts(df, col)

        return analysis
