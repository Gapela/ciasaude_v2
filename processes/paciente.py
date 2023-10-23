from flask import Flask, redirect, render_template, request
from libs.postgresTool import execute_query_df, connect_db_psycopg2, execute_query_psycopg2
from libs.utils import *
import json
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_paciente(app):

    @app.route('/paciente-consulta', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def paciente_consulta():
        try:
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            return {'status':'error', 'data':str(e)} 

    @app.route('/paciente-cadastro', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def paciente_cadastro():
        
        data = request.get_json()
        return insert_paciente(data=data)

    @app.route('/paciente-excluir', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def paciente_excluir():
        
        data = request.get_json()
        return excluir_paciente(data=data)

    @app.route('/paciente-consulta-detalhes', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def paciente_consulta_detalhes():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter=True, data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/paciente-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def paciente_editar():
        try:
            data = request.get_json()
            return editar_paciente(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    return app

def get_df_to_json(filter=None, data=''):
    if filter==None:
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
                        FROM public.paciente where data_exclusao is null;"""
    else:
        id = data['id']
        query = f"""SELECT 
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
                        FROM public.paciente where id_paciente={id};"""
    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js

def insert_paciente(data):
    df = json_to_df(js=data)
    query = df_to_query(df=df, table_name='paciente')
    res = execute_query_psycopg2(query=query)

    return res

def excluir_paciente(data):
    id = data['id']
    query = delete_from_database(table='paciente', id=id)
    res = execute_query_psycopg2(query=query)
    return res


def editar_paciente(data):
    id = data['id']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='paciente', id=id)
    res = execute_query_psycopg2(query=query)
    return res