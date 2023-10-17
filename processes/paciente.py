from flask import Flask, redirect, render_template

def rotas_paciente(app):

    @app.route('/paciente', methods=['POST'])
    def paciente():
        return {'status':'ok'}
    
    return app