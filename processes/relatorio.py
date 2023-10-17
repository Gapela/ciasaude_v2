from flask import Flask, redirect, render_template

def rotas_relatorio(app):

    @app.route('/relatorio', methods=['POST'])
    def relatorio():
        return {'status':'ok'}
    
    return app