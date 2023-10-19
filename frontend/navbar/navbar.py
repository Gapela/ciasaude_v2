from flask import Blueprint, render_template, redirect


navbar_bp = Blueprint("navbar", __name__, template_folder="templates", static_folder='static', static_url_path='/navbar/static')
