from flask import Flask, redirect, render_template,request
from libs.postgresTool import execute_query_df
from libs.utils import *
import json
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_atendimento(app):
    
    @app.route('/atendimento-consulta', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_consulta():
        try:
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/atendimento-cadastro', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_cadastro():
        
        data = request.get_json()
        return insert_atendimento(data=data)

    @app.route('/atendimento-excluir', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_excluir():
        
        data = request.get_json()
        return excluir_atendimento(data=data)

    @app.route('/atendimento-consulta-detalhes', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_consulta_detalhes():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter=True, data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/atendimento-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def atendimento_editar():
        try:
            data = request.get_json()
            return editar_atendimento(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    return app


def get_df_to_json(filter=None, data=''):
    if filter==None:   
        query = """SELECT id_atendimento, nome, cpf, especialidade, profissional_responsavel, observacao, data_inicio, data_fim, id_paciente, id_profissional
	FROM public.atendimento where data_exclusao is null;"""
    else:
        id = data['id']
        query = f"""SELECT id_atendimento, nome, cpf, especialidade, profissional_responsavel, observacao, data_inicio, data_fim, id_paciente, id_profissional
            FROM public.atendimento WHERE id_atendimento = {id};"""

    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js

def insert_atendimento(data):
        
    df = json_to_df(js=data)
    query = df_to_query(df=df, table_name='atendimento')
    res = execute_query_psycopg2(query=query)

    return res    

def excluir_atendimento(data):
    id = data['id']
    query = delete_from_database(table='atendimento', id=id)
    res = execute_query_psycopg2(query=query)
    return res    

def editar_atendimento(data):
    id = data['id']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='atendimento', id=id)
    res = execute_query_psycopg2(query=query)
    return res 