var key = "1849c34206f8bc0e5fecd79182ebdb3c";

function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

function setWeather(loc, units) {
  var data = JSON.parse(localStorage.getItem("weather-object")),
      temp,
      speed;
  if (units == "metric") {
    temp = "C";
    speed = "m/s";
  } else if (units == "imperial") {
    temp = "F";
    speed = "mi/h";
  }
  $("#location").text(loc.city + ", " + loc.country);
  $("#weather-name").text(data.weather[0].main);
  $("#weather-icon").attr("class", data.weather[0].main.toLowerCase());
  $("#temperature").text(Math.round(data.main.temp) + "°" + temp);
}

function getWeather(loc) {
  var units = localStorage.getItem("units");
  if (units === null) {
    units = "metric";
    if (loc.country == "US") {
      units = "imperial";
    }
  }

  var lastCall = localStorage.getItem("last-api-call");
  if (lastCall !== null) {
    lastCall = JSON.parse(lastCall);
    if (isEquivalent(lastCall.location, loc) && lastCall.units == units && Math.floor((new Date() - new Date(lastCall.time)) / 60000) < 10) {
      setWeather(loc, units);
      return;
    }
  }

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(loc.city) + "," + encodeURIComponent(loc.country) + "&units=" + units + "&appid=" + key + "&callback=";
  console.log("Retrieving data from API...");
  $.get(url, function (data) {
    localStorage.setItem("weather-object", JSON.stringify(data));
    localStorage.setItem("last-api-call",
      JSON.stringify({
        location: loc,
        time: new Date(),
        units: units
      })
    );
    setWeather(loc, units);
  });
}
