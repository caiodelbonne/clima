document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    clearInfo();
    showWarning('Aguarde . . . ');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input,
    )}&appid=aa39b48617fcb5cc013f42f4c8a3bd28&=units=metric&lang=pt_br`;

    let result = await fetch(url);

    let json = await result.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        vento: json.wind.speed,
        ventoAngulo: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning('localização não encontrada ');
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning('');

  document.querySelector(
    '.titulo',
  ).innerHTML = `${json.name} , ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(
    '.ventoInfo',
  ).innerHTML = `${json.vento} <span>km/h</span>`;
  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`,
    );
  document.querySelector('.ventoPonto').style.transform = `rotate(${
    json.ventoAngulo - 90
  }deg)`;

  document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}
