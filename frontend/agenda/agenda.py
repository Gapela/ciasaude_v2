from flask import Blueprint, redirect, render_template, request

agenda_bp = Blueprint("agenda", __name__, template_folder="templates",
                         static_folder='static', static_url_path='/agenda/static')


@agenda_bp.route('/agenda')
def agenda():
    return render_template('agenda.html')


@agenda_bp.route('/agenda-novo')
def agenda_novo():
    return render_template('agenda_novo.html')


@agenda_bp.route('/agenda-editar')
def agenda_detail():
    return render_template('agenda_editar.html')
