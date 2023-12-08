from flask import Blueprint, redirect, render_template, request

dashboard_bp = Blueprint("dashboard", __name__, template_folder="templates",
                         static_folder='static', static_url_path='/dashboard/static')


@dashboard_bp.route('/dashboard_paciente')
def dashboard_paciente():
    return render_template('dashboard_paciente.html')

@dashboard_bp.route('/dashboard_atendimento')
def dashboard_atendimento():
    return render_template('dashboard_atendimento.html')

@dashboard_bp.route('/dashboard_profissional')
def dashboard_profissional():
    return render_template('dashboard_profissional.html')

@dashboard_bp.route('/dashboard_financeiro')
def dashboard_financeiro():
    return render_template('dashboard_financeiro.html')

