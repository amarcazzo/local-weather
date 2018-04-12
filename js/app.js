$(document).ready(function() {

  var interval = setInterval(function() {
                  var momentNow = moment();
                  $('.time').html(momentNow.format('ddd, MMMM Do HH:mm:ss A'));
                }, 1000);

  var location = '';
  var city = '';

  $.getJSON('http://freegeoip.net/json/', function(res) {
    location = res.latitude + ',' + res.longitude;
    console.log(res)
    city = res.city;

    getWeather();
  });

  var getWeather = function(){
    var apiUrl = 'https://api.darksky.net/forecast/d26b15227f9c192e51182b40b614a15c/' + location + '?exclude=hourly,flags&units=ca&lang=es';

    $.getJSON(apiUrl, function(res) {
      let currently = res.currently;
      let daily = res.daily;

      setCurrentWeather(currently);
      setDailyWeather(daily);
    });
  }

  var setCurrentWeather = function(currently){
    let icon = setIcon(currently.icon);

    let current = `<div class="card">
                    <div class="card-block">
                      <img src=${icon} alt=${currently.icon} />
                      <h4 class="card-title">${Math.floor(currently.temperature)} ˚C</h4>
                      <p class="card-text">
                        <p><b>${city}</b></p>
                        <p>${currently.summary}</p>
                        <p><b>Humedad</b> | ${currently.humidity}</p>
                        <p><b>Viento (km/h)</b> | ${currently.windSpeed}</p>
                      </p>
                    </div>
                  </div>`

    $('#current').append(current);
  }

  var setDailyWeather = function(daily){
    for(let i=1;i<5;i++){
      let item = daily.data[i];
      let weekDay = setWeekDay(new Date().getDay() + Number(i));


      let icon = setIcon(item.icon);
      let day = `<div class='col-sm-3'>
                  <div class="card" data-toggle="collapse" href="#collapse${i}" role="button" aria-expanded="false" aria-controls="collapse${i}">
                    <div class="card-block">
                      <img src=${icon} alt=${item.icon} />
                      <p class="card-text">
                        <p>${weekDay}</p>
                        <p><b>Máxima</b> | ${Math.floor(item.temperatureMax)} ˚C</p>
                        <p><b>Minima</b> | ${Math.floor(item.temperatureMin)} ˚C</p>
                        <div class="collapse" id="collapse${i}">
                          <p>${item.summary}</p>
                          <p><b>Humedad</b> | ${item.humidity}</p>
                          <p><b>Viento (km/h)</b> | ${item.windSpeed}</p>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>`;

      $('#daily').append(day);
    };
  }

  function setIcon(icon){
    switch(icon) {
      case 'rain':
        return '../icons/static/rainy-5.svg';
        break;
      case 'cloudy':
        return '../icons/static/cloudy.svg';
        break;
      case 'partly-cloudy-day':
        return '../icons/static/cloudy-day-3.svg';
        break;
      case 'partly-cloudy-night':
        return '../icons/static/cloudy-night-3.svg';
        break;
      case 'clear-day':
        return '../icons/static/day.svg';
        break;
      case 'clear-night':
        return '../icons/static/night.svg';
        break;
      case 'wind':
        return '../icons/static/cloudy-day-3.svg';
        break;
      case 'fog':
        return '../icons/static/cloudy-day-3.svg';
        break;
      case 'hail':
        return '../icons/static/cloudy-day-3.svg';
        break;
      case 'thunderstorm':
        return '../icons/static/thunder.svg';
        break;
    }
  }

  function setWeekDay(i){
    let weekDays = {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sábado'
    };

    return weekDays[i];
  }

});
