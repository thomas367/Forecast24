<template>
	<div class="wrapper">
		<!-- Current section-->
		<div class="heading">
			<p>Weather at location: {{location}}</p>
		</div>
		<!-- Current weather data -->
		<div class="weather-card">
			<div class="weatherIcon">
				<img :src="'http://openweathermap.org/img/w/'+weather.icon+'.png'" height="70" width="70"/>
			</div>
			<div class="sm-desc">
				<p>
		            <span>{{ weather.main }}</span>
		            <br>
		            <span>{{ weather.description }}</span>
		        </p>
		    </div>    	        
	        <div class="row">
	            <div class="col-sm-3 col-6 content">
	                <p class="category">Current Temperature</p>
	                <p class="value">{{ main.temp }} °C</p>
	            </div>
	            <div class="col-sm-3 col-6 content">
	                <p class="category">Humidity</p>
	                <p class="value">{{ main.humidity }} %</p>
	            </div>
	            <div class="col-sm-3 col-6 content">
	                <p class="category">Wind speed</p>
	                <p class="value">{{ wind.speed }} m/s</p>
	            </div>
	            <div class="col-sm-3 col-6 content">
	                <p class="category">Wind direction</p>
	                <p class="value">{{windDirection(wind.deg)}}</p>
	            </div>
	        </div>
		</div>
		<!-- Forecast section -->
		<hr>
		<div class="heading">
        	<p class="title">5 days forecast</p>
        </div>
        <!-- Date filter -->
        <div class="filterDate">
	        <p>Filter by date</p>
	        <div class="scrollbar">
		        <b-button-group size="md" class="filter">
			        <b-button v-for="(date, index) in forecastDates" :key="index" @click.prevent="filterByDate(index)" variant="outline-primary">				      
				    	<span>{{date.date}}</span>   
			        </b-button>
		        </b-button-group>
	        </div>
	    </div>
	    <div v-for="(weatherItem, index) in forecastListByDate">
	    	<div class="weather-card" v-show="selectedDate == weatherItem.date">
				<div class="weatherIcon">
					<img :src="'http://openweathermap.org/img/w/'+weatherItem.weather[0].icon+'.png'" height="70" width="70"/>
				</div>
				<div class="desc row">
					<p class="sm-desc col-2">
			            <span>{{ weatherItem.weather[0].main }}</span>
			            <br>
			            <span>{{ weatherItem.weather[0].description }}</span>
			        </p>
			        <div class="time offset-2 col-3 row">
			        	<span><ios-clock-icon/></span>
	       				<span>{{ convertTime(weatherItem.dt_txt) }}</span>
			        </div>
			    </div>       
		        <div class="row">
		            <div class="col-sm-3 col-6 content">
		                <p class="category">Temperature</p>
		                <p class="value">{{ weatherItem.main.temp }} °C</p>
		            </div>
		            <div class="col-sm-3 col-6 content">
		                <p class="category">Humidity</p>
		                <p class="value">{{ weatherItem.main.humidity }} %</p>
		            </div>
		            <div class="col-sm-3 col-6 content">
		                <p class="category">Wind speed</p>
		                <p class="value">{{ weatherItem.wind.speed }} m/s</p>
		            </div>
		            <div class="col-sm-3 col-6 content">
		                <p class="category">Wind direction</p>
		                <p class="value">{{ windDirection(weatherItem.wind.deg) }}</p>
		            </div>
		        </div>
			</div>
	    </div>
	</div>
</template>

<script>
	import dateFormat from 'date-format'

	export default{
		props: ['location'],
		data(){
			return{
				weather: {},
				main: {},
				sys: {},
				wind: {},
				forecast: {},
				forecastListByDate: [],
				forecastDates: [],
				selectedDate: ''
			}
		},
		created(){
			/* Set current weather data */
			this.$bus.on('weather-found', data =>{
				const mainData = data;
				this.main = mainData.main;
				this.weather = mainData.weather[0];
				this.sys = mainData.sys;
				this.wind = mainData.wind;
			});

			/* Set forecast weather data */
			this.$bus.on('forecast-found', data =>{
				const forecastData = data;
				this.forecast = forecastData;
				this.forecastListByDate = this.forecastByDate();
				this.selectedDate = this.forecastListByDate[0].date;
				this.forecastDates[0].isActive = true; 
			
			});
		},
		methods: {
			/* Filter selected date */
			filterByDate: function(index){
				for(let i=0; i<this.forecastDates.length; i++){
					this.forecastDates[i].isActive = false;
				}
				this.selectedDate = '';
				this.forecastDates[index].isActive = true;
				this.selectedDate = this.forecastDates[index].date;
				
			},
			forecastByDate: function(){
				if(this.forecast){
					var forecasts = this.forecast.list;
					forecasts.forEach(data =>{
						let date = dateFormat('dd/MM/yyyy', new Date(data.dt_txt));
						data['date'] = date;
						let forecastDate = {date, isActive: false};	
						if(!forecasts.containsObjProperty(forecastDate, 'date', this.forecastDates)){
                       		this.forecastDates.push(forecastDate);
                    	}  
					})
					console.log(forecasts)
					return forecasts
				}
				return [];
			},
			/* Calculate wind direction */
			windDirection: function(degree){
				
				if(degree > 337.5){
					return 'N'
				}
				else if(degree > 292.5){
					return 'NW'
				}
				else if(degree > 247.5){
					return 'W'
				}
				else if(degree > 202.5){
					return 'SW'
				}
				else if(degree > 157.5){
					return 'S'
				}
				else if(degree > 122.5){
					return 'SE'
				}
				else if(degree > 67.5){
					return 'E'
				}
				else if(degree > 22.5){
					return 'NE'
				}
				return 'N'
			},
			convertTime: function(time){
				return dateFormat('hh:mm', new Date(time));
			}
		} 
	}
</script>

<style scoped lang="scss">
	
	.heading{
		margin-top: 1rem;
		font-size: 26px;
		font-family: inherit;

	}

	.scrollbar{
		overflow: auto;
		width: auto;
	}

	.filterDate{
		text-align: center;

		.filter{
			margin-bottom: 10px;
		}

	}

	.time{
		justify-content: center;
		font-size: 26px;
		margin-bottom: 0.5rem;
	} 

	.weather-card{
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #cccccc;
		border-radius: 5px;

	}

	.content {
		text-align: center;

	}
</style>