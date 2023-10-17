

#crie uma função que pegue um dataframe e transforme em json
def df_to_json(df):
    return df.to_json(orient='records')
