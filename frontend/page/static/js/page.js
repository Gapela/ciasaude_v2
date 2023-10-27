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
      console.log(data);
      if (data.status == "ok") {
        //redirecionar para o link na variavel redirect
        //window.location.href = redirect;
      } else {
        alert("Erro: " + data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function get_base64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      var base64 = reader.result.split(",")[1]; // extrai a string base64
      var objeto = {
        nome: file.name,
        tipo: file.type,
        tamanho: file.size,
        base64: base64,
      };
      resolve(objeto);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}

function get_all_input_content_js(inputs, folder) {
  json = {};
  for (let i = 0; i < inputs.length; i++) {
    //converter os inputs em json usando o id do input como chave e a value como valor
    json[inputs[i].id] = inputs[i].value;

    if (inputs[i].type != "file") {
      json[inputs[i].id] = inputs[i].value;
    } else if (inputs[i].type == "file") {
      send_file(inputs[i].files[0], folder).then((res) => {
        json["arquivo"] = res;
      });
    }

    //verifica se o input é do tipo checkbox
    if (inputs[i].type == "checkbox") {
      //se for, desmarca o checkbox
      inputs[i].checked = false;
    } else {
      //se não for, limpa o campo
      inputs[i].value = "";
    }
  }
  return json;
}

function send_file(arquivo, folder) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + sessionStorage.getItem("token")
  );
  url = window.url_api + "upload-file";

  var formData = new FormData();
  formData.append("file", arquivo);
  formData.append("folder", folder);

  return fetch(url, {
    method: "POST",
    body: formData,
    headers: myHeaders,
    redirect: "follow",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.file_path;
    })
    .catch(function (error) {
      console.error("Erro ao enviar arquivo: ", error);
    });
}

window.request_backend = request_backend;
window.insert_database = insert_database;
window.get_base64 = get_base64;
window.get_all_input_content_js = get_all_input_content_js;
