from flask import Flask, redirect, render_template
from flask_jwt_extended import jwt_required

def rotas_relatorio(app):

    @app.route('/relatorio', methods=['POST'])
    @jwt_required()
    def relatorio():
        return {'status':'ok'}
    
    return app