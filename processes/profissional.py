from flask import Flask, redirect, render_template, request
from libs.postgresTool import execute_query_df, execute_query_psycopg2
from libs.utils import *
import json
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
import base64
import random

def rotas_profissional(app):

    @app.route('/profissional-consulta', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def profissional_consulta():
        return {'status':'ok', 'data':get_df_to_json()}
    

    @app.route('/profissional-cadastro', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def profissional_cadastro():
        try:
                file = request.files['file']
                folder = 'profissional'
                data = request.form.to_dict()
                extensao = file.filename.split('.')[-1]
                caminho = f'storage/{folder}/' + str(random.randrange(10000,10000000))+'.' + extensao 
                file.save(caminho)
                data['arquivo'] = caminho
        except:
                
                data = request.form.to_dict()     
                # remover do json a chave file
                data.pop('file')
        
        print(data)
        res = insert_profissional(data=data)
        print(res)
        return res

    @app.route('/profissional-excluir', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def profissional_excluir():
        
        data = request.get_json()
        print(data)
        return excluir_profissional(data=data)

    @app.route('/profissional-consulta-detalhes', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def profissional_consulta_detalhes():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter=True, data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/profissional-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def profissional_editar():
        try:
            try:

                file = request.files['file']
                folder = 'profissional'
                data = request.form.to_dict()
                extensao = file.filename.split('.')[-1]
                caminho = f'storage/{folder}/' + data['id_profissional']+'.' + extensao 
                file.save(caminho)
                data['arquivo'] = caminho
            except:
                
                data = request.form.to_dict()     
                # remover do json a chave file
                data.pop('file')
            print(data)
            return editar_profissional(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}



    return app

def get_df_to_json(filter=None, data=''):
    if filter==None:
        query = """SELECT
                        id_profissional, nome, endereco,
                        rg, cpf, telefone,
                        especialidade, obs_especializacao, crm,
                        pagamento, empresa, plano,
                        pix, banco, agencia, conta
                    FROM 
                        public.profissional where data_exclusao is null;"""
    else:
        id = data['id_profissional']
        query = f"""SELECT
                        id_profissional, nome, endereco,
                        rg, cpf, telefone,
                        especialidade, obs_especializacao, crm,
                        pagamento, empresa, plano,
                        pix, banco, agencia, conta, arquivo
                    FROM 
                        public.profissional
                    WHERE
                        id_profissional = {id};"""

    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js

def insert_profissional(data):
      
    df = json_to_df(js=data)
    
    query = df_to_query(df=df, table_name='profissional')
    res = execute_query_psycopg2(query=query)

    return res    

def excluir_profissional(data):
    id = data['id_profissional']
    query = delete_from_database(table='profissional', id=id)
    res = execute_query_psycopg2(query=query)
    return res    

def editar_profissional(data):
    id = data['id_profissional']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='profissional', id=id)
    res = execute_query_psycopg2(query=query)
    return res 