//função para verificar se o usuario está logado. se não tiver, redireciona para a página de login. para saber se esta logado, usar a variavel de sessão token
function verificarLogin() {
  if (sessionStorage.getItem("token") == null) {
    window.location.href = "/login";
  }
}

function request_backend(url, body, token) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) =>
      //cria uma condição para verificar se o status foi ok ou não nok
      {
        //retorna o json que veio da api
        return result;
      }
    )
    .catch((error) => console.log("error", error));
}

function insert_database(json, endpoint, redirect) {
  url = window.url_api + endpoint;
  body = json;
  token = sessionStorage.getItem("token");

  window
    .request_backend(url, body, token)
    .then((data) => {
      if (data.status == "ok") {
        //redirecionar para o link na variavel redirect
        window.location.href = redirect;
      } else {
        alert("Erro: " + data.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

window.request_backend = request_backend;
window.insert_database = insert_database;
