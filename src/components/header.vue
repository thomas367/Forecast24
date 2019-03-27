<template>
	<header class="main-header">
		<div class="header-body">
			<h1 class="title">
				Forecast24
			</h1>
			<p class="subtitle">
				Find weather info for a city
			</p>
			<b-form @submit.prevent="onSearch">
				<div class="input d-inline-flex">
					<b-form-input size="md" type="text" placeholder="Search..." v-model="city"/>
			        <b-button size="md" type="submit" variant="primary">Search</b-button>
				</div>
			</b-form>
		</div>
	</header>
</template>

<script>
	export default{
		data: function(){
			return {
				city: ''
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