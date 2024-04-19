let chave = "66b746f202363d773d03854fa5931741"

function colocarNaTela(dados){ 
  if (dados.cod !== "404") {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
    document.querySelector('.umidade').innerHTML = 'Umidade: '+ dados.main.humidity +"%"
        
    document.querySelector(".input-cidade").value = "";

    document.getElementById("headIcon").href = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
  }
  else {
    limparCampos()
    buscarLocalizacao()
  }
}


async function buscarCidade(cidade){
  let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=" + chave + "&lang=pt_br&units=metric").then(resposta => resposta.json())

  colocarNaTela(dados)
}


function cliqueiNoBotao() {
  let cidade = document.querySelector(".input-cidade").value.trim();

  if (cidade !== "") {
    buscarCidade(cidade);
  }
  else {
    limparCampos()
    buscarLocalizacao()
  }
}

window.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    cliqueiNoBotao()
  }
});

function limparCampos(){
  document.querySelector(".cidade").innerHTML = ""
  document.querySelector(".temp").innerHTML =  ""
  document.querySelector(".descricao").innerHTML = ""
  document.querySelector(".icone").src = ""
  document.querySelector('.umidade').innerHTML = ""

  document.querySelector(".input-cidade").value = "";

  document.getElementById("headIcon").href = "assets/icon/default.svg";
}

/* Função que busca a localização do usuário */
function buscarLocalizacao() {
  navigator.geolocation.getCurrentPosition(function(position) {fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then(response => response.json()).then(data => {buscarCidade(data.address.city);}).catch(error => console.error(error));});
}

buscarLocalizacao()