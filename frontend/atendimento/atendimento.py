from flask import Blueprint, redirect, render_template, request

atendimento_bp = Blueprint("atendimento", __name__, template_folder="templates",
                           static_folder='static', static_url_path='/atendimento/static')


@atendimento_bp.route('/atendimento')
def atendimento():
    return 'Página do atendimento'


@atendimento_bp.route('/atendimento/<int:atendimento_id>')
def atendimento_detail(atendimento_id):
    return f'Página do atendimento {atendimento_id}'
