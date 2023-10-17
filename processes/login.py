from flask import Flask, redirect, render_template

def rotas_login(app):

    @app.route('/login', methods=['POST'])
    def login():
        return {'status':'ok'}
    
    return app