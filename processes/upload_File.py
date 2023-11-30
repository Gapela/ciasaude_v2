from flask import Flask, redirect, render_template, request, send_file
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
import base64

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
    @app.route('/download-file/<setor>/<pasta>/<file>', methods=['POST'])
    @jwt_required()
    @cross_origin()
    def download_file(setor, pasta,file):
        
        
        file = 'C:/Works/ciasaude_v2/'+setor+'/'+pasta+'/'+file
        #converter o arquivo para base64
        with open(file, "rb") as pdf_file:
            encoded_string = base64.b64encode(pdf_file.read()).decode('utf-8')
            return {'status':'ok', 'data':f'{encoded_string}', 'extensao':f'{file.split(".")[-1]}'}

        #return send_file(file, as_attachment=True)

    return app