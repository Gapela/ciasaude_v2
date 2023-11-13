from flask import Flask, redirect, render_template, request, send_file
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
    

        
    #Baixar arquivo da pasta storage
    @app.route('/download-file', methods=['GET'])
    @jwt_required()
    @cross_origin()
    def download_file():
        
        file = request.form['file_path']
        file = 'C:/Works/ciasaude_v2'+file
        return send_file(file, as_attachment=True)

    return app