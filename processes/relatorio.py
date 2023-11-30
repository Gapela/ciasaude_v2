from flask import Flask, redirect, render_template, request
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
import json
from datetime import datetime
from libs.postgresTool import execute_query_df
import base64

def rotas_relatorio(app):

    @app.route('/relatorio', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def relatorio():
        js = request.get_json()
        module = js['module']
        if len(js['data'])==0:
            file = generate_full(module)
            
            with open(file, "rb") as pdf_file:
                encoded_string = base64.b64encode(pdf_file.read()).decode('utf-8')
                return {'status':'ok', 'data':f'{encoded_string}', 'extensao':f'{file.split(".")[-1]}'}
        else:
            query = generate_query(js)
            file = generate_report(query)
            
            with open(file, "rb") as pdf_file:
                encoded_string = base64.b64encode(pdf_file.read()).decode('utf-8')
                return {'status':'ok', 'data':f'{encoded_string}', 'extensao':f'{file.split(".")[-1]}'}
        
    
    return app


def generate_report(query):
    df = execute_query_df(query)
    file_path = f'storage/report/relatorio_{datetime.now().strftime("%d%m%Y_%H%M%S")}.csv'
    df.to_csv(file_path, sep=';', index=False)
    return file_path

def generate_query(js):
    ...

def generate_full(module):
    query = f'select * from {module}'
    filepath = generate_report(query)
    return filepath    