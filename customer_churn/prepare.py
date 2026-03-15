import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# import splitting and imputing functions
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer

import acquire

def split_telco_data(df):
    '''
    This function performs split on telco data, stratify churn.
    Returns train, validate, and test dfs.
    '''
    train_validate, test = train_test_split(df, test_size=.2, 
                                        random_state=123, 
                                        stratify=df.churn)
    train, validate = train_test_split(train_validate, test_size=.2, 
                                   random_state=123, 
                                   stratify=train_validate.churn)
    return train, validate, test

def prep_telco(df):
    # Drop duplicate columns
    cols_to_drop = ['contract_type_id', 'internet_service_type_id', 'payment_type_id', 'payment_type_id.1', 'internet_service_type_id', 'internet_service_type_id.1']
    df.drop(columns=cols_to_drop, inplace = True)
    
    # Drop null values stored as whitespace    
    df['total_charges'] = df['total_charges'].str.strip()
    df = df[df.total_charges != '']
    
    # Convert to correct datatype
    df['total_charges'] = df.total_charges.astype(float)
    
    # Get dummies for categorical variables 
    dummy_df = pd.get_dummies(df[['gender', 'partner', 'dependents', 'phone_service', 'multiple_lines', 'online_security', 'online_backup', 'device_protection', 'tech_support', 'streaming_tv', 'streaming_movies', 'paperless_billing', 'churn', 'contract_type', 'payment_type', 'internet_service_type']], dummy_na=False, drop_first=False)
    
    # Concatenate dummy dataframe to original
    df = pd.concat([df, dummy_df], axis=1)
    
    # Drop duplicate dummies
    cols_to_drop = ['gender_Female', 'partner_No', 'dependents_No', 'phone_service_No', 'multiple_lines_No phone service', 'online_security_No internet service', 'online_backup_No internet service', 'device_protection_No internet service', 'tech_support_No internet service', 'streaming_tv_No internet service', 'streaming_movies_No internet service', 'paperless_billing_No', 'churn_No']
    df.drop(columns = cols_to_drop, inplace = True)
    return df