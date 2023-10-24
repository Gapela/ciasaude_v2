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
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) =>
      //cria uma condição para verificar se o status foi ok ou não nok
      {
        alert("Resultado: " + result.status);
      }
    )
    .catch((error) => console.log("error", error));
}
