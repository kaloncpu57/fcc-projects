var currentLoc = {};
$.get("https://ipinfo.io/json", function(data) {
  currentLoc.city = data.city;
  currentLoc.country = data.country;

  getWeather(currentLoc);

  var units = localStorage.getItem("units");
  if (units === null) {
    units = "metric";
    if (currentLoc.country == "US") {
      units = "imperial";
    }
  }
  if (units == "imperial") $("#units-switch").prop("checked", true);
}, "jsonp");


$("#units-switch").click(function () {
  $("#units-switch").prop("checked") ? localStorage.setItem("units", "imperial") : localStorage.setItem("units", "metric");
  getWeather(currentLoc);
});
