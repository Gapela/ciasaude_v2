from flask import Flask, redirect, render_template
from libs.postgresTool import execute_query_df
from libs.utils import *
import json

def rotas_atendimento(app):

    @app.route('/atendimento-consulta', methods=['POST'])
    def atendimento_consulta():
        try:
            return {'status':'ok', 'data':get_df_to_json()}
        except Exception as e:
            return {'status':'error', 'data':str(e)}
    return app


def get_df_to_json():
    query = """SELECT id_atendimento, nome, cpf, especialidade, profissional_responsavel, observacao, data_inicio, data_fim, id_paciente, id_profissional
	FROM public.atendimento;"""
    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js