from flask import Flask
from processes.login import rotas_login
from processes.atendimento import rotas_atendimento
from processes.paciente import rotas_paciente
from processes.profissional import rotas_profissional
from processes.relatorio import rotas_relatorio

app = Flask(__name__)

# Rotas
app = rotas_login(app)
app = rotas_atendimento(app)
app = rotas_paciente(app)
app = rotas_profissional(app)
app = rotas_relatorio(app)


@app.route('/', methods=['POST'])
def index():
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(debug=True, port=8000)
