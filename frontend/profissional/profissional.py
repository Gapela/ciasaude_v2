from flask import Blueprint, redirect, render_template, request

profissional_bp = Blueprint("profissional", __name__, template_folder="templates",
                            static_folder='static', static_url_path='/profissional/static')


@profissional_bp.route('/profissional')
def profissional():
    return render_template('profissional.html')

@profissional_bp.route('/profissional-novo')
def profissional_novo():
    return render_template('profissional_novo.html')

@profissional_bp.route('/profissional-editar')
def profissional_detail():
    return render_template('profissional_editar.html')