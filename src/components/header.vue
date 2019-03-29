<template>
	<header class="main-header">
		<div class="header-body">
			<h1 class="title">
				Forecast24
			</h1>
			<p class="subtitle">
				Find weather info for a city
			</p>
			<b-form @submit.prevent="getWeatherData">
				<div class="input d-inline-flex">
					<b-form-input size="md" type="text" placeholder="Search..." v-model="city"/>
			        <b-button size="md" type="submit" variant="primary">Search</b-button>
				</div>
			</b-form>
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
		created(){
			this.getWeatherData(this.city);
        	this.$bus.emit('search-location', this.city);
		},
		methods: {
			/* Get current weather and 5 days forecast data */
			getWeatherData: function(){
				this.$bus.emit('search-location', this.city);
            	axios.get(this.urlWeather(this.city))
                .then(response => {
                	//console.log(response.data);
                    this.$bus.emit('weather-found', response.data);
                });
                axios.get(this.urlForecast(this.city))
                .then(response =>{
                	//console.log(response.data);
                	this.$bus.emit('forecast-found', response.data);
                });
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
				margin-top: 10px;
				margin-bottom: 2rem;

			}
		}
	}
</style>