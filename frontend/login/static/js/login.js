//função para pegar os dados do formulário e enviar para o servidor
function login() {
  //pegar os dados do formulário
  var dados = {
    usuario: document.getElementById("user").value,
    senha: document.getElementById("password").value,
  };

  if (document.getElementById("user").value == "") {
    return false;
  }
  if (document.getElementById("password").value == "") {
    return false;
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    usuario: dados.usuario,
    senha: dados.senha,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(url_api + "login", requestOptions)
    .then((response) => response.json())
    .then((result) =>
      //cria uma condição para verificar se o status foi ok ou não nok
      {
        if (result.status == "ok") {
          //grave nas variáveis de sessão o token, o nome do usuario e o email
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("usuario", result.data.usuario);
          sessionStorage.setItem("email", result.data.email);

          //redireciona para a página de home
          window.location.href = "/home";
        } else {
          //exibe uma mensagem de erro
          console.log(result.message);
        }
      }
    )
    .catch((error) => console.log("error", error));
}
