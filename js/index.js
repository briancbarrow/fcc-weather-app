$(document).ready(function() {
  var appID = 'a62cd1cab307b87f29523ee6112488f5';

  var CorF = 'F';
  var units = 'imperial';
  getWeather();
  var submitFlag = false;

  $('#changeUnits').click(function(){

    if(CorF === 'F'){
    CorF = 'C';
      units = 'metric';
    } else {
      CorF = 'F';
      units = 'imperial';
    }
    if(submitFlag === true){
      getWeatherSubmit($('#city').val(), $('#region').val());
    } else{
      getWeather();
    }

  });



  function getWeather(){
 $.get('https://ipinfo.io', function(data){
   $('.city').html(data.city + ', ' + data.region);
   $('.country').html(data.country);
   console.log(data);

   openWeather(data.loc);
 }, 'jsonp'); //end ipinfo get


  function openWeather(loc){
    var lat = loc.split(',')[0];
    var long = loc.split(',')[1];



    var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=' + units + '&APPID=' + appID;

    $.get(weatherAPI, function(weather){
      $('.weather').html('<h1 class="solid-text">' + weather.main.temp + '° ' + CorF + ' </h1>');
      $('.description').html('<h5 class="solid-text">' + weather.weather[0].description + '</h5>');
      $('.icon').html('<img src="http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png">');
     /* $('body').css("background-image", "url(http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png)");  */
      console.log(weather.main.temp);
    }, 'jsonp');


    /*
    var divHeight = $('.icon').css("height");
  $('.h').html(divHeight);  */
  }

  }

  $('form').submit( function (evt){
    submitFlag = true;
    evt.preventDefault();
    var city = $('#city').val();
    var region = $('#region').val();
    getWeatherSubmit(city, region);
  });

  function getWeatherSubmit(city, region){
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +',' + region + '&units=' + units + '&APPID=' + appID;

    $.get(weatherAPI, function(weather){

      city = weather.name;
      var country = weather.sys.country;
      if(city.toUpperCase() !== $('#city').val().toUpperCase()){
        alert("Showing weather for " + city + ", " + country +". If this isn't what you wanted, check your spelling and try again.")
        $('.city').html(city + ', ' + weather.sys.country);
      } else{

      $('.city').html(city + ', ' + region);
      }

      $('.weather').html('<h1 class="solid-text">' + weather.main.temp + '° ' + CorF + ' </h1>');
      $('.description').html('<h5 class="solid-text">' + weather.weather[0].description + '</h5>');
      $('.icon').html('<img src="https://openweathermap.org/img/w/' + weather.weather[0].icon + '.png">');
     /* $('body').css("background-image", "url(http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png)");  */
      console.log(region);
    }, 'jsonp');
  }

}); //end document ready
