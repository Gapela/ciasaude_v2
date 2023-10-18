from flask import Flask, redirect, render_template
from libs.postgresTool import execute_query_df
from libs.utils import *
import json

def rotas_profissional(app):

    @app.route('/profissional-consulta', methods=['POST'])
    def profissional_consulta():
        return {'status':'ok', 'data':get_df_to_json()}
    
    return app

def get_df_to_json():
    query = """SELECT
                    id_profissional, nome, endereco,
                    rg, cpf, telefone,
                    especialidade, obs_especializacao, crm,
                    pagamento, empresa, plano,
                    pix, banco, agencia, conta
                FROM 
                    public.profissional;"""
    
    df = execute_query_df(query)
    js = df_to_json(df)
    js = json.loads(js)
    return js