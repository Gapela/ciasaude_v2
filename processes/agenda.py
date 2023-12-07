from flask import Flask, redirect, render_template,request
from libs.postgresTool import execute_query_df, execute_query_psycopg2
from libs.utils import *
import json
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_agenda(app):
    
    @app.route('/agenda-consulta', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def agenda_consulta():
        try:
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/agenda-cadastro', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def agenda_cadastro():
        
        data = request.form.to_dict()
        
        print(data)
        res = insert_agenda(data=data)
        print(res)
        return res

    @app.route('/agenda-excluir', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def agenda_excluir():
        
        data = request.get_json()
        return excluir_agenda(data=data)

    @app.route('/agenda-consulta-detalhes', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def agenda_consulta_detalhes():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter=True, data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/agenda-paciente-profissional', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def agenda_paciente_profissional():
        try:
            data = request.get_json()
            return {'status':'ok', 'data':get_df_to_json(filter='agenda_list', data=data)}
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    @app.route('/agenda-editar', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def agenda_editar():
        try:
            
            data = request.form.to_dict()
            print(data)
            return editar_agenda(data=data)
        except Exception as e:
            return {'status':'error', 'data':str(e)}

    return app


def get_df_to_json(filter=None, data=''):
    if filter==None:   
        query = """select id_agenda, pac.nome as paciente, agenda.especialidade, prof.nome as profissional, agenda.data_agenda, agenda.horario, agenda.forma_pagamento, agenda.plano,
        agenda.numero_carteirinha, agenda.observacao
        from agenda as agenda
        left join paciente pac
        on agenda.id_paciente::integer = pac.id_paciente
        left join profissional prof
        on agenda.id_profissional::integer  = prof.id_profissional
        where agenda.data_exclusao is null"""
    elif filter=='agenda_list':
        query_1 = "select id_paciente, concat(nome,' - ', cpf) as paciente from paciente where data_exclusao is null"
        query_2 = "select id_profissional,concat(nome,' - ', crm) as profissional from profissional where data_exclusao is null"
        df_1 = execute_query_df(query_1)
        df_2 = execute_query_df(query_2)
        js_1 = df_to_json(df_1)
        js_2 = df_to_json(df_2)
        js = {'paciente':json.loads(js_1), 'profissional':json.loads(js_2)}
        
        return js
    else:
        id = data['id_agenda']
        query = f"""select id_agenda, agenda.id_paciente, agenda.especialidade, agenda.id_profissional, agenda.data_agenda, agenda.horario, agenda.forma_pagamento, agenda.plano,
        agenda.numero_carteirinha, agenda.observacao
        from agenda as agenda
        left join paciente pac
        on agenda.id_paciente::integer = pac.id_paciente
        left join profissional prof
        on agenda.id_profissional::integer  = prof.id_profissional
        where agenda.data_exclusao is null and agenda.id_agenda = {id}"""

    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js

def insert_agenda(data):
        
    df = json_to_df(js=data)
    
    query = df_to_query(df=df, table_name='agenda')
    res = execute_query_psycopg2(query=query)

    return res    

def excluir_agenda(data):
    id = data['id_agenda']
    query = delete_from_database(table='agenda', id=id)
    res = execute_query_psycopg2(query=query)
    return res    

def editar_agenda(data):
    id = data['id_agenda']
    df = json_to_df(js=data)
    query = df_to_update_query(df=df, table_name='agenda', id=id)
    res = execute_query_psycopg2(query=query)
    return res 