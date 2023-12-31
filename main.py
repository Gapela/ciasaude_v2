from flask import Flask
from processes.login import rotas_login
from processes.atendimento import rotas_atendimento
from processes.paciente import rotas_paciente
from processes.profissional import rotas_profissional
from processes.relatorio import rotas_relatorio
from processes.upload_File import rotas_upload
from processes.despesas import rotas_despesas
from processes.agenda import rotas_agenda

from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_cors import CORS, cross_origin

app = Flask(__name__)
jwt = JWTManager(app)
cors = CORS(app)
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
# Rotas
app = rotas_login(app)
app = rotas_atendimento(app)
app = rotas_paciente(app)
app = rotas_profissional(app)
app = rotas_relatorio(app)
app = rotas_upload(app)
app = rotas_despesas(app)
app = rotas_agenda(app)

@app.route('/', methods=['POST'])
def index():
    return {'status': 'ok'}




if __name__ == '__main__':
    app.run(debug=True, port=8000)