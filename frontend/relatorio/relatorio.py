from flask import Blueprint, redirect, render_template, request

relatorio_bp = Blueprint("relatorio", __name__, template_folder="templates",
                         static_folder='static', static_url_path='/relatorio/static')


@relatorio_bp.route('/relatorio')
def relatorio():
    return render_template('relatorio.html')



