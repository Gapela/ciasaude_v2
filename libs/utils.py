import pandas as pd
import json

#crie uma função que pegue um dataframe e transforme em json
def df_to_json(df):
    return df.to_json(orient='records')

#função para pegar um json e transformar em dataframe
def json_to_df(js):
    js = json.dumps(js)
    res = pd.read_json(js, orient='records')
    return res

#função para inserir um dataframe no banco de dados recebendo como parâmetro a conexão e o dataframe e o nome da tabela
def insert_df_to_db(conn, df, table_name):
    df.to_sql(table_name, conn, if_exists='append', index=False, schema='public')