from flask import Flask, redirect, render_template, request
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin

def rotas_upload(app):

    @app.route('/upload-file', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def upload_file():
        
        file = request.files['file']
        folder = request.form['folder']
        
        caminho = f'storage/{folder}/' + file.filename
        file.save(caminho)
        caminho = ['storage', folder, file.filename]
        return {'status':'ok', "file_path":caminho}
    
    return app