from flask import Flask, redirect, render_template

def rotas_profissional(app):

    @app.route('/profissional', methods=['POST'])
    def profissional():
        return {'status':'ok'}
    
    return app