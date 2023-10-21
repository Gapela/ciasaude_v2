from libs.postgresTool import execute_query_df
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta
from flask import request, jsonify
from libs.utils import *
import jwt

def rotas_login(app):

    @app.route('/login', methods=['POST'])
    def login():
        try:
            usuario = 'pelai'
            senha = 'pelai123'
            user = User(usuario, senha)
            status = user.autentica_usuario()

            if status['status'] == 'ok':
                usuario_bd = user.pegar_usuario_bd()
                print(usuario_bd)
                return jsonify(usuario_bd)
            
        except Exception as e:
            return jsonify({'status': 'erro', 'message': str(e)})
        
    return app

class User:
    def __init__(self, usuario, senha):
        self.usuario = usuario
        self.senha = senha

    def autentica_usuario(self):
        try:
            cript = Criptografia(self.senha)
            senha_hash = cript.criptografa()

            dados_usuario = execute_query_df(f"SELECT * FROM usuario WHERE usuario = '{self.usuario}' AND senha = '{senha_hash}'")

            usuario_bd = dados_usuario['usuario'][0]
            senha_bd = dados_usuario['senha'][0]

            if usuario_bd == self.usuario and senha_bd == senha_hash:
                return {'status': 'ok', 'message': 'Usuário autenticado com sucesso!'}
            
        except Exception as e:
            return {'status': 'nok', 'message': 'Usuário ou senha inválidos!'}
        
    def pegar_usuario_bd(self):

        try:
            dados_usuario = execute_query_df(f"SELECT * FROM usuario WHERE usuario = '{self.usuario}'")
            id_usuario = str(dados_usuario.loc[0:0, 'id_usuario'].iloc[0])
            usuario = dados_usuario.loc[0:0, 'usuario'].iloc[0]
            email = dados_usuario.loc[0:0, 'email'].iloc[0]
            token = 'token_test'
            
            return {'status': 'ok', 'data': {'id_usuario': id_usuario, 'usuario': usuario, 'email': email, 'token': token}}
                
        except Exception as e:
            return {'status': 'erro', 'message': str(e)}