from flask import Blueprint, redirect, render_template, request

profissional_bp = Blueprint("profissional", __name__, template_folder="templates",
                            static_folder='static', static_url_path='/profissional/static')


@profissional_bp.route('/profissional')
def profissional():
    return render_template('profissional.html')


@profissional_bp.route('/profissional/<int:profissional_id>')
def profissional_detail(profissional_id):
    return f'Página do profissional {profissional_id}'
