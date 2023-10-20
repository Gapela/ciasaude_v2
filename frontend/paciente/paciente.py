from flask import Blueprint, redirect, render_template, request

paciente_bp = Blueprint("paciente", __name__, template_folder="templates",
                        static_folder='static', static_url_path='/paciente/static')


@paciente_bp.route('/paciente')
def paciente():
    return render_template('paciente.html')


@paciente_bp.route('/paciente/novo')
def paciente_novo():
    return render_template('paciente_novo.html')


@paciente_bp.route('/paciente/<int:paciente_id>')
def paciente_detail(paciente_id):
    return f'Página do paciente {paciente_id}'
