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
	</div>
</template>

<script>
	import weatherCard from './weatherCard.vue'
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
				wind: {}
			}
		},
		created(){
			this.$bus.on('weather-found', (data) =>{
				const mainData = data;
				this.main = mainData.main;
				this.weather = mainData.weather[0];
				this.sys = mainData.sys;
				this.wind = mainData.wind;
				
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
		} 
	}
</script>

<style scoped lang="scss">
	
	.heading{
		margin-top: 1rem;
		font-size: 26px;
		font-family: inherit;
	}
	
</style>