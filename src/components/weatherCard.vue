<template>
	<div class="weather-card">
		<div class="box">
			<div class="media">
				<div class="media-left">
					<slot name="icon"></slot>
				</div>
				<div class="media-content">
					<div class="content">
						<p>
	                        <span class="title"><slot name="main"></slot></span>
	                        <br>
	                        <span><slot name="description"></slot></span>
	                    </p>
					</div>
				    <!--	
				    <h2 class="title" v-show="foreCast">
	                    <span class="icon"><i class="fa fa-clock-o"></i></span>
	                    <span>{{ foreCastTimeOfDay }}</span>
	                </h2>  
	                -->
                	<div class="level">
                        <div class="level-item">
                        <!--    <p class="heading"><span v-show="!foreCast">Current</span> Temperature</p>  -->
                            <p class="title"><slot name="curr_temp"></slot> °C</p>
                        </div>
                        <div class="level-item">
                            <p class="heading">Min Temperature</p>
                            <p class="title"><slot name="min_temp"></slot> °C</p>
                        </div>
                        <div class="level-item">
                            <p class="heading">Max Temperature</p>
                            <p class="title"><slot name="max_temp"></slot> °C</p>
                        </div>
                        <div class="level-item ">
                            <p class="heading">Humidity</p>
                            <p class="title"><slot name="humidity"></slot> %</p>
                        </div>
                    </div>
                    <hr>
                    <div class="level">
                        <div class="level-item has-">
                            <p class="heading">Current pressure</p>
                            <p class="title"><slot name="pressure"></slot> hPa</p>
                        </div>
                        <div class="level-item">
                            <p class="heading">Wind speed</p>
                            <p class="title"><slot name="wind_speed"></slot> m/s</p>
                        </div>
                        <div class="level-item">
                            <p class="heading">Wind direction</p>
                            <p class="title"><slot name="wind_deg"></slot></p>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
	/*	props: {
			foreCast: {
				type: Boolean,
				default: false
			},
			foreCastDate: {
				Type: Date
			}
		},
		computed: {
			foreCastDate: function(){
				return dateFormat('dd/MM/yyyy', new Date(this.foreCastDate));
			},
			foreCastTimeOfDay: function(){
				return dateFormat('hh:mm:ss', new Date(this.foreCastDate));
			}
		}  */
	}
</script>

<style scoped lang="scss">
	.weather-card{
		margin-bottom: 10px;

	}

</style>