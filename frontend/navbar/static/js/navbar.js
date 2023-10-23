//função para fazer logout
function logout() {
  //limpa as variáveis de sessão
  sessionStorage.clear();
  //redireciona para a página de login
  window.location.href = "/login";
}
