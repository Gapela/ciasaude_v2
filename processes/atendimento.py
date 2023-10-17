from flask import Flask, redirect, render_template

def rotas_atendimento(app):

    @app.route('/atendimento', methods=['POST'])
    def atendimento():
        return {'status':'ok'}
    
    return app