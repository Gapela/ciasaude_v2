#Conexão com o sqlalchemy
from sqlalchemy import create_engine
from psycopg2 import connect
from pandas import read_sql_query

import json
with open('config/config.json') as json_file:
    config = json.load(json_file)

#Pegue os parametros que estão dentro do arquivo config.json
user = config["database_connection"]["hml"]["username"]
password = config["database_connection"]["hml"]["password"]
host = config["database_connection"]["hml"]["hostname"]
port = config["database_connection"]["hml"]["port"]
database = config["database_connection"]["hml"]["database"]


def connect_db_sqlalchemy():
    
    engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{database}')
    connection = engine.connect()
    
    return connection


def connect_db_psycopg2():
    #crie uma engine para se conectar ao banco de dados usando as variaveis anteriores por favor
    con = connect(dbname=database, 
                  user=user, 
                  password=password, 
                  host=host, 
                  port=port)
    return con


def execute_query_psycopg2(query):
    con = connect_db_psycopg2()
    cur = con.cursor()
    cur.execute(query)
    con.commit()
    con.close()


def execute_query_df(query):
    connection = connect_db_psycopg2()
    df = read_sql_query(query, connection)
    connection.close()
    return df
    