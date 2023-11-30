//função para verificar se o usuario está logado. se não tiver, redireciona para a página de login. para saber se esta logado, usar a variavel de sessão token
function verificarLogin() {
  if (sessionStorage.getItem("token") == null) {
    window.location.href = "/login";
  }
}

function request_backend(url, body, token, method = "POST") {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: method,
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
        window.location.href = redirect;
      } else {
        alert("Erro: " + data.data);
      }
    })
    .catch((error) => {
      console.log(error);
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

function send_file(arquivo, folder, fields) {
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

function get_all_input_content_formdata(inputs) {
  //cria um objeto do tipo FormData
  var formData = new FormData();
  //percorre todos os inputs
  for (let i = 0; i < inputs.length; i++) {
    //verifica se o input é do tipo file
    if (inputs[i].type == "file") {
      //se for, adiciona o arquivo no formData
      formData.append("file", inputs[i].files[0]);
    } else {
      //se não for, adiciona o input no formData
      formData.append(inputs[i].id, inputs[i].value);
    }
  }
  return formData;
}

function new_send_file(formData, endpoint, redirect) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + sessionStorage.getItem("token")
  );
  url = window.url_api + endpoint;

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
      if (data.status == "ok") {
        window.location.href = redirect;
        return data.file_path;
      } else {
        return data;
      }
    })
    .catch(function (error) {
      console.error("Erro ao enviar arquivo: ", error);
    });
}

function download_anexo() {
  variavel = window.location.search;
  id_paciente = variavel.split("=")[1];
  url = window.url_api + "download-file/" + window.file_path;
  //formdata com o id do paciente
  token = sessionStorage.getItem("token");
  method = "POST";
  window.request_backend(url, body, token, method).then((data) => {
    //decode data de base64 para blob
    let encoded_string = data.data; // Sua string codificada em base64
    let binary_string = window.atob(encoded_string);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    // Cria um novo Blob com os dados retornados
    var blob = new Blob([bytes], { type: "application/octet-stream" });

    // Cria uma URL para o Blob
    var url = URL.createObjectURL(blob);

    // Cria um link temporário
    var a = document.createElement("a");
    a.href = url;
    a.download = "filename." + data.extensao; // Substitua 'filename.ext' pelo nome do arquivo que você deseja

    // Adiciona o link ao corpo do documento e simula um clique nele
    document.body.appendChild(a);
    a.click();

    // Remove o link do corpo do documento
    document.body.removeChild(a);
  });
}

window.download_anexo = download_anexo;
window.request_backend = request_backend;
window.insert_database = insert_database;
window.get_all_input_content_js = get_all_input_content_js;
window.get_all_input_content_formdata = get_all_input_content_formdata;
