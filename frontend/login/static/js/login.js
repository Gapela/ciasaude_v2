//função para pegar os dados do formulário e enviar para o servidor
function login() {
  //pegar os dados do formulário
  var dados = {
    usuario: document.getElementById("user").value,
    senha: document.getElementById("password").value,
  };
  //redirecionar para a homepage
  window.location.href = "/home";
}
