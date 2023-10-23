from flask import Flask, redirect, render_template
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_relatorio(app):

    @app.route('/relatorio', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def relatorio():
        return {'status':'ok'}
    
    return app