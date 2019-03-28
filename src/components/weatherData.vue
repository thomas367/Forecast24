<template>
	<div class="wrapper">
		<div class="heading">
			<h1 class="title">Weather at location: {{location}}</h1>
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
            <span slot="wind_deg">{{ wind.deg }}</span>
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
				
			})
		} 
	}
</script>

<style scoped lang="scss">
	
</style>