<template>
	<div class="wrapper">
		<div class="heading">
			<p class="title">Weather at location: {{location}}</p>
		</div>
		<weather-card>	
			<img slot="icon" :src="'http://openweathermap.org/img/w/'+weather.icon+'.png'" height="70" width="70"/>
            <span slot="main">{{ weather.main }}</span>
            <span slot="description">{{ weather.description }}</span>
            <span slot="curr_temp">{{ main.temp }}</span>
            <span slot="min_temp">{{ main.temp_min }}</span>
            <span slot="max_temp">{{ main.temp_max }}</span>
            <span slot="humidity">{{ main.humidity }}</span>
            <span slot="pressure">{{ main.pressure }}</span>
            <span slot="wind_speed">{{ wind.speed }}</span>
            <span slot="wind_deg"><div v-html="windDirection"></div></span>
        </weather-card>
        <hr>
        <div class="heading">
        	<p class="title">5 days forecast</p>
        </div>
        <p class="filterTitle">Filter by date</p>
        <div class="tabs">
        	<ul>
        		<span v-for="(date, index) in forecastDates">
        			<li :class="{'is-active': date.isActive}">
        				<a href="#" @click.prevent="filterByDate(index)">
        				<!--	<span>TODO: add calendar icon</span> -->
        					<span>{{date.date}}</span>
        				</a>
        			</li>
        		</span>
        	</ul>
        </div>
        <div v-for="(weatherItem, index) in forecastListByDate">
        	<weather-card :fore-cast="true" :fore-cast-date="weatherItem.dt_txt" v-show="selectedDate == weatherItem.date">
        		<img slot="icon" :src="'http://openweathermap.org/img/w/'+weatherItem.weather[0].icon+'.png'" height="70" width="70"/>
                <span slot="main">{{ weatherItem.weather[0].main }}</span>
                <span slot="description">{{ weatherItem.weather[0].description }}</span>
                <span slot="curr_temp">{{ weatherItem.main.temp }}</span>
                <span slot="humidity">{{ weatherItem.main.humidity }}</span>
                <span slot="pressure">{{ weatherItem.main.pressure }}</span>
                <span slot="wind_speed">{{ weatherItem.wind.speed }}</span>
                <span slot="wind_deg"><div v-html="windDirection"></div></span>
        	</weather-card>
        </div>
	</div>
</template>

<script>
	import weatherCard from './weatherCard.vue'
	import dateFormat from 'date-format'

	export default{
		components: {
			weatherCard
		},
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
		computed: {
			/* Calculate wind direction */
			windDirection: function(){
				const degree = this.wind.deg;
				
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
			}
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
					return forecasts
				}
				return [];
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

	.filterTitle{
		text-align: center;
	}
	
</style>