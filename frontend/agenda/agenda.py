from flask import Blueprint, redirect, render_template, request

agenda_bp = Blueprint("agenda", __name__, template_folder="templates",
                         static_folder='static', static_url_path='/agenda/static')


@agenda_bp.route('/agenda')
def agenda():
    return render_template('agenda.html')


@agenda_bp.route('/agenda/<int:agenda_id>')
def agenda_detail(agenda_id):
    return f'Página do agenda {agenda_id}'
