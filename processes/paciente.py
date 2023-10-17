from flask import Flask, redirect, render_template
from libs.postgresTool import execute_query_df
from libs.utils import *
import json

def rotas_paciente(app):

    @app.route('/paciente-consulta', methods=['POST'])
    def paciente_consulta():
        
        return {'status':'ok', 'data':get_df_to_json()}
    
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

