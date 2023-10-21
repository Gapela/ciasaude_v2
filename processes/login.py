from libs.postgresTool import connect_db_psycopg2, execute_query_psycopg2, execute_query_df
from libs.utils import *
from flask_jwt_extended import JWTManager
from flask import request

def rotas_login(app):

    app.config['JWT_SECRET_KEY'] = 'super-secret'
    jwt = JWTManager(app)

    @app.route('/login', methods=['POST'])
    def login():
        pass

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
            status = self.autentica_usuario()

            if status['status'] == 'ok':
                dados_usuario = execute_query_df(f"SELECT * FROM usuario WHERE usuario = '{self.usuario}'")
                usuario_id = dados_usuario['id'][0]
                usuario = dados_usuario['usuario'][0]
                email = dados_usuario['email'][0]
                token = 'a criar token'

                response = {'status': 'ok', 'data': {'usuario_id': usuario_id, 'usuario': usuario, 'email': email, 'token': token}}

                return response

        except Exception as e:
            return {'status': 'erro - pegar_usuario_bd', 'message': str(e)}
        

usuario = 'pelai'
senha = '123456789'
user = User(usuario, senha)

resposne = user.pegar_usuario_bd()
print(resposne)