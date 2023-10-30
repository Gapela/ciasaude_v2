from flask import Blueprint, redirect, render_template, request

atendimento_bp = Blueprint("atendimento", __name__, template_folder="templates",
                           static_folder='static', static_url_path='/atendimento/static')


@atendimento_bp.route('/atendimento')
def atendimento():
    return render_template('atendimento.html')


@atendimento_bp.route('/atendimento-editar')
def atendimento_detail():
    return render_template('atendimento_editar.html')

@atendimento_bp.route('/atendimento-novo')
def atendimento_novo():
    return render_template('atendimento_novo.html')
