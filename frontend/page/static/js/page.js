//função para verificar se o usuario está logado. se não tiver, redireciona para a página de login. para saber se esta logado, usar a variavel de sessão token
function verificarLogin() {
  if (sessionStorage.getItem("token") == null) {
    window.location.href = "/login";
  }
}
