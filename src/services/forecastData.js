export default class ForecastData{
	
	constructor(){
		this.baseUrl = 'http://api.openweathermap.org/data/2.5/'
		this.api = 'weather'
		this.apiKey = 'e5cdbd515249b28526ac579afe58f4fa'
		this.query = 'q='
		this.apiUrl = this.baseUrl+this.api+'?'+this.query+'&APPID='+this.apiKey+'&units=metric';
	}

	rebuildApiUrl(){
		this.apiUrl = this.baseUrl+this.api+'?'+this.query+'&APPID='+this.apiKey+'&units=metric';
	}
	/* Weather services by search */
	currentWeather(city){
		this.query = 'q=' + city
		this.api = 'weather'
		this.rebuildApiUrl();

		return this.apiUrl;
	}

	weekForecast(city){
		this.query = 'q=' + city
		this.api = 'forecast'
		this.rebuildApiUrl();

		return this.apiUrl;
	}

	/* Weather services by geolocation */
	currentWeatherGeolocation(lat, lon){
		this.query = 'lat=' + lat + '&lon=' + lon
		this.api = 'weather'
		this.rebuildApiUrl();

		return this.apiUrl;
	}

	weekForecastGeolocation(lat, lon){
		this.query = 'lat=' + lat + '&lon=' + lon
		this.api = 'forecast'
		this.rebuildApiUrl();

		return this.apiUrl;
	}

}