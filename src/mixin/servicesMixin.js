import forecastData from '../services/forecastData.js'

const forecastDataObj = new forecastData();

export default{
	methods: {
		urlWeather: function(city){
			return forecastDataObj.currentWeather(city);
		}
	}
}