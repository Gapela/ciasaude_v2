from flask import Blueprint, redirect, render_template, request

login_bp = Blueprint("login", __name__, template_folder="templates",
                     static_folder='static', static_url_path='/login/static')


@login_bp.route('/login')
def login():
    return render_template('login.html')



