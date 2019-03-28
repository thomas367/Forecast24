<template>
	<div class="weather-card">
		<div class="weatherIcon">
			<slot name="icon"></slot>
		</div>
		<div class="sm-desc">
			<p>
	            <span class="title"><slot name="main"></slot></span>
	            <br>
	            <span><slot name="description"></slot></span>
	        </p>
				
			<h2 class="title" v-show="foreCast">
	        <!--    <span class="icon"> TODO: Add watch icon.</span>  -->
	        <span>{{ foreCastTimeOfDay }}</span>
	        </h2>    
	            
            <div class="row">
                <div class="col-3 content">
                    <p class="heading"><span v-show="!foreCast">Current</span>Temperature</p>
                    <p class="value"><slot name="curr_temp"></slot> °C</p>
                </div>
                <div class="col-3 content">
                    <p class="heading">Min Temperature</p>
                    <p class="value"><slot name="min_temp"></slot> °C</p>
                </div>
                <div class="col-3 content">
                    <p class="heading">Max Temperature</p>
                    <p class="value"><slot name="max_temp"></slot> °C</p>
                </div>
                <div class="col-3 content">
                    <p class="heading">Humidity</p>
                    <p class="value"><slot name="humidity"></slot> %</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-4 content">
                    <p class="heading">Current pressure</p>
                    <p class="value"><slot name="pressure"></slot> hPa</p>
                </div>
                <div class="col-4 content">
                    <p class="heading">Wind speed</p>
                    <p class="value"><slot name="wind_speed"></slot> m/s</p>
                </div>
                <div class="col-4 content">
                    <p class="heading">Wind direction</p>
                    <p class="value"><slot name="wind_deg"></slot></p>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
	import dateFormat from 'date-format'

	export default{
		props: {
			foreCast: {
				type: Boolean,
				default: false
			},
			foreCastDate: {
				Type: Date
			}
		},
		computed: {
			/* Set date format */
			foreCastDateTime: function(){
				return dateFormat('dd/MM/yyyy', new Date(this.foreCastDate));
			},
			/* Set time format */
			foreCastTimeOfDay: function(){
				return dateFormat('hh:mm:ss', new Date(this.foreCastDate));
			}
		} 
	}
</script>

<style scoped lang="scss">
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