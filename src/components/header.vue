<template>
	<header class="main-header">
		<div class="header-body">
			<h1 class="title">
				Forecast24
			</h1>
			<p class="subtitle">
				Find weather info for a city
			</p>
			<div class="bar row d-inline-flex">
				<b-form @submit.prevent="getWeatherData">
					<div class="input d-inline-flex">
						<b-form-input size="md" type="text" placeholder="Search..." v-model="city"/>
				        <b-button size="md" type="submit" variant="primary">Search</b-button>   
					</div>
				</b-form>
				<b-button size="md" variant="warning" @click="getMylocation">Find me</b-button>
			</div>
		</div>
	</header>
</template>

<script>
	import axios from 'axios'
	import ServicesMixin from '../mixin/servicesMixin.js'

	export default{
		data: function(){
			return {
				city: 'Thessaloniki'
			}
		},
		mixins: [ServicesMixin],
		created: function(){
			this.getWeatherData(this.city);
        	this.$bus.emit('search-location', this.city);
		},
		methods: {
			/* Get current weather and 5 days 
			 * forecast data by search a city
			 */
			getWeatherData: function(){
				this.$bus.emit('search-location', this.city);
            	axios.get(this.urlWeather(this.city))
                .then(response => {
                    this.$bus.emit('weather-found', response.data);
                });
                axios.get(this.urlForecast(this.city))
                .then(response => {
                	this.$bus.emit('forecast-found', response.data);
                });
			},
			/* Get current weather and 5 days 
			 * forecast data by cords (geolocation)
			 */
			 getMylocation: function(){
			 	const options = {
			 		enableHighAccuracy: true,
			 		setTimeout: 5000,
			 		maximumAge: 0
			 	};

			 	let error = function error(err) {
                	console.warn('ERROR(' + err.code + '): ' + err.message);
            	};

			 	navigator.geolocation.getCurrentPosition(position =>{
			 		let crd = position.coords;
			 		axios.get(this.urlWeatherGeolocation(crd.latitude, crd.longitude))
			 		.then(response => {
			 			this.city = response.data.name;
			 			this.$bus.emit('search-location', this.city);
			 			this.$bus.emit('weather-found', response.data);
			 		});
			 		axios.get(this.urlForecastGeolocation(crd.latitude, crd.longitude))
			 		.then(response => {
			 			this.$bus.emit('forecast-found', response.data);
			 		});
			 	}, error, options);
			 }
		}
	}
</script>

<style scoped lang="scss">
	.main-header{
		background-color: #00D1B2;

		.header-body {
			text-align: center;
	
			.title{
				color: white;
				
			}

			.subtitle{
				color: white;
				font-size: 24px;
			}

			.input{
				width: 300px;

				@media (min-width: 320px){
					width: 200px;
				}

				@media (min-width: 768px){
					width: 300px;
				}
				
			}

			.bar{
				margin-bottom: 2rem;
				margin-top: 10px;

			}
		}
	}
</style>