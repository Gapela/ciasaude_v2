from flask import Flask
# importação dos blueprints
from paciente.paciente import paciente_bp
from profissional.profissional import profissional_bp
from relatorio.relatorio import relatorio_bp
from atendimento.atendimento import atendimento_bp
from login.login import login_bp
from navbar.navbar import navbar_bp
from page.page import page_bp
from despesas.despesas import despesas_bp
from agenda.agenda import agenda_bp
from dashboard.dashboard import dashboard_bp

app = Flask(__name__)

# Registro dos blueprints
app.register_blueprint(paciente_bp)
app.register_blueprint(profissional_bp)
app.register_blueprint(relatorio_bp)
app.register_blueprint(atendimento_bp)
app.register_blueprint(login_bp)
app.register_blueprint(navbar_bp)
app.register_blueprint(page_bp)
app.register_blueprint(despesas_bp)
app.register_blueprint(agenda_bp)
app.register_blueprint(dashboard_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=8001)
