import pandas as pd
import json
from typing import Union

class DataReader:
    @staticmethod
    def read_csv(file_path: str) -> pd.DataFrame:
        """Read data from CSV file with error handling"""
        try:
            return pd.read_csv(file_path)
        except Exception as e:
            raise ValueError(f"Error reading CSV file: {str(e)}")
    
    @staticmethod
    def read_json(file_path: str) -> pd.DataFrame:
        """Read data from JSON file with error handling"""
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            return pd.DataFrame(data)
        except Exception as e:
            raise ValueError(f"Error reading JSON file: {str(e)}")
    
    @staticmethod
    def read_excel(file_path: str) -> pd.DataFrame:
        """Read data from Excel file with error handling"""
        try:
            return pd.read_excel(file_path)
        except Exception as e:
            raise ValueError(f"Error reading Excel file: {str(e)}")
    
    @staticmethod
    def read_file(file_path: str) -> pd.DataFrame:
        """Automatically detect and read file based on extension"""
        if not isinstance(file_path, str):
            raise ValueError("File path must be a string")
        
        if file_path.endswith('.csv'):
            return DataReader.read_csv(file_path)
        elif file_path.endswith('.json'):
            return DataReader.read_json(file_path)
        elif file_path.endswith(('.xlsx', '.xls')):
            return DataReader.read_excel(file_path)
        else:
            raise ValueError("Unsupported file format. Supported formats: CSV, JSON, Excel")