from flask import Blueprint, redirect, render_template, request

despesas_bp = Blueprint("despesas", __name__, template_folder="templates",
                        static_folder='static', static_url_path='/despesas/static')


@despesas_bp.route('/despesas')
def despesas():
    return render_template('despesas.html')


@despesas_bp.route('/despesas-novo')
def despesas_novo():
    return render_template('despesas_novo.html')


@despesas_bp.route('/despesas-editar')
def despesas_detail():
    return render_template('despesas_editar.html')
