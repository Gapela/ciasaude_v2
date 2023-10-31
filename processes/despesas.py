from flask import Flask, redirect, render_template, request
from libs.postgresTool import execute_query_df, connect_db_psycopg2, execute_query_psycopg2
from libs.utils import *
import json
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_despesas(app):

    @app.route('/despesas-consulta', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def despesas_consulta():
        try:
            print({'status':'ok', 'data':get_df_to_json()})
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            print({'status':'error', 'data':str(e)} )
            return {'status':'error', 'data':str(e)} 

    @app.route('/despesas-cadastro', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def despesas_cadastro():
        
        file = request.files['file']
        folder = 'despesas'
        caminho = f'storage/{folder}/' + file.filename
        file.save(caminho)
        data = request.form.to_dict()
        data['arquivo'] = caminho
        
        print(data)
        res = insert_despesas(data=data)
        print(res)
        return res

    @app.route('/despesas-excluir', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def despesas_excluir():
        
        data = request.get_json()
        return excluir_despesas(data=data)

    @app.route('/despesas-consulta-detalhes', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def despesas_consulta_detalhes():
        try:
            
            data = request.get_json()
            print(data)
            return {'status':'ok', 'data':get_df_to_json(filter=True, data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/despesas-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def despesas_editar():
        try:
            file = request.files['file']
            folder = 'despesas'
            caminho = f'storage/{folder}/' + file.filename
            file.save(caminho)
            data = request.form.to_dict()
            data['arquivo'] = caminho
            
            print(data)
            return editar_despesas(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    return app

def get_df_to_json(filter=None, data=''):
    if filter==None:
        query = """SELECT 
                        *
                        FROM public.despesas where data_exclusao is null;"""
    else:
        id = data['id_despesas']
        query = f"""SELECT 
                        *
                        FROM public.despesas where id_despesas={id};"""
    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js

def insert_despesas(data):
    df = json_to_df(js=data)
    query = df_to_query(df=df, table_name='despesas')
    print(query)
    res = execute_query_psycopg2(query=query)

    return res

def excluir_despesas(data):
    id = data['id_despesas']
    query = delete_from_database(table='despesas', id=id)
    res = execute_query_psycopg2(query=query)
    return res


def editar_despesas(data):
    id = data['id_despesas']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='despesas', id=id)
    res = execute_query_psycopg2(query=query)
    return res