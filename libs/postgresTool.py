#Conexão com o sqlalchemy
from sqlalchemy import create_engine
from psycopg2 import connect

import json
with open('config/config.json') as json_file:
    config = json.load(json_file)

#Pegue os parametros que estão dentro do arquivo config.json
user = config["database_connection"]["hml"]["username"]
password = config["database_connection"]["hml"]["password"]
host = config["database_connection"]["hml"]["hostname"]
port = config["database_connection"]["hml"]["port"]
database = config["database_connection"]["hml"]["database"]

#crie uma função para se conectar ao banco de dados em python
def connect_db_sqlalchemy():
    #crie uma engine para se conectar ao banco de dados usando as variaveis anteriores
    engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{database}')

    #crie a conexão usando a engine
    connection = engine.connect()
    query = 'create table teste (id serial)'
    connection.execute(query)
    return connection

#crie uma função para se conectar ao banco de dados em python usando o psycopg2
def connect_db_psycopg2():
    #crie uma engine para se conectar ao banco de dados usando as variaveis anteriores por favor
    con = connect(dbname=database, 
                  user=user, 
                  password=password, 
                  host=host, 
                  port=port)
    return con

#crie uma função para executar uma query usando o psycopg2
def execute_query_psycopg2(query):

    con = connect_db_psycopg2()

    cur = con.cursor()

    cur.execute(query)

    con.commit()

    con.close()