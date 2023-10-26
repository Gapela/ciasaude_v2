import pandas as pd
import hashlib
import json

#crie uma função que pegue um dataframe e transforme em json
def df_to_json(df):
    return df.to_json(orient='records')

#função para pegar um json e transformar em dataframe
def json_to_df(js):
    try:
        if isinstance(js, list):
            js = json.dumps(js)
        else:
            # inclue o json numa lista
            js = json.dumps([js])    
    except Exception as e:
        print(e)
    
    
    res = pd.read_json(js, orient='records')
    return res

#função para inserir um dataframe no banco de dados recebendo como parâmetro a conexão e o dataframe e o nome da tabela
def insert_df_to_db(conn, df, table_name):
    df.to_sql(table_name, conn, if_exists='append', index=False, schema='public')

#função para pegar um dataframe e transformar em query de insert
def df_to_query(df, table_name):
    query = f"""INSERT INTO public.{table_name} ("""
    for col in df.columns:
        query += f"""{col}, """
    query = query[:-2]
    query += f""") VALUES """
    for index, row in df.iterrows():
        query += "("
        for col in df.columns:
            query += f"""'{row[col]}', """
        query = query[:-2]
        query += "), "
    query = query[:-2]
    query += ";"
    return query


def delete_from_database(table, id):
    # faça uma query para atualizar o campo data_exclusão usando o id no filtro
    query = f"""UPDATE public.{table} SET data_exclusao = now() WHERE id_{table} = {id};"""
    return query

#função para criar uma query de update para todos os campos do dataframe com base no parametro id
def df_to_update_query(df, table_name, id):
    query = f"""UPDATE public.{table_name} SET """
    for col in df.columns:
        query += f"""{col} = '{df[col][0]}', """
    query = query[:-2]
    query += f""" WHERE id_{table_name} = {id};"""
    return query

class Criptografia:
    def __init__(self, key):
        self.key = key

    def criptografa(self):
        senha =  self.key.encode()
        hash_object = hashlib.sha256()
        hash_object.update(senha)
        hash_senha = hash_object.hexdigest()
        
        return hash_senha