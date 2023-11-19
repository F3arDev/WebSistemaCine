<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Boletos</h1>
	</div>
	<div class="container-fluid">
		<div class="row justify-content-start  g-2 align-items-start">
			<div class="col-4">
				<div class=" divCard">
					<h5>boletos</h5>
					<dtBoletos />
					<div class="d-grid gap-2">
						<button type="button" name="" id="" class="btn btn-primary">Generar Factura</button>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="row">
					<div class="col-4 divCard">
						<div class="d-grid gap-2">
							<button class="btn btn-primary" type="button">Generar Boleto</button>
							<dropdownCliente />
						</div>
					</div>
					<div class="col divCard">
						<gridSalas />
					</div>
				</div>
				<div class="row">
					<div class="col divCard">
						<dtPeliculas></dtPeliculas>
					</div>


				</div>

			</div>
		</div>

	</div>

	<!-- <div class="divCard">
		<dtCartelera />
	</div> -->
</template>

<script setup>
import dtPeliculas from '../../components/employComponent/dtPeliculas.vue';
import dtBoletos from '../../components/employComponent/dtBoletos.vue'
import dropdownCliente from '../../components/employComponent/dropdownCliente.vue';

import gridSalas from '../../components/employComponent/gridSalas.vue';
</script>

<style scoped></style>