from flask import Flask, redirect, render_template, request
from libs.postgresTool import execute_query_df, connect_db_psycopg2
from libs.utils import *
import json

def rotas_paciente(app):

    @app.route('/paciente-consulta', methods=['POST'])
    def paciente_consulta():
        try:
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            return {'status':'error', 'data':str(e)} 

    @app.route('/paciente-cadastro', methods=['POST'])
    def paciente_cadastro():
        
        data = request.get_json()
        return insert_paciente(data=data)

    return app

def get_df_to_json():
    query = """SELECT 
                    id_paciente, 
                    nome, 
                    endereco, 
                    cep, 
                    rg, 
                    cpf, 
                    telefone, 
                    email, 
                    data_nascimento, 
                    responsavel, 
                    medico_solicitante, 
                    crm, 
                    ocupacao, 
                    cid, 
                    observacao, 
                    pagamento, 
                    empresa, 
                    numero_carteirinha, 
                    plano
	                FROM public.paciente;"""
    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js



def insert_paciente(data):
    
    
    df = json_to_df(js=data)
   
    
    insert_df_to_db(df=df, table_name='paciente', conn=connect_db_psycopg2())
    return {'status':'ok', 'data':'paciente cadastrado com sucesso'}