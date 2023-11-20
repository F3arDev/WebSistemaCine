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
							<button @click="loadBoleto()" class="btn btn-primary" type="button">Generar Boleto</button>
							<dropdownCliente @gridData="handelDropdown" />
						</div>
					</div>
					<div class="col divCard">
						<gridSalas ref="helloRef" @asiento="handelAsientos" />
					</div>
				</div>
				<div class="row">
					<div class="col divCard">
						<dtCartelera @update="handelDtBoletos" @cartelera="handelCarteleras" />
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import dtCartelera from '../../components/employComponent/dtCartelera.vue';
import dtBoletos from '../../components/employComponent/dtBoletos.vue';
import dropdownCliente from '../../components/employComponent/dropdownCliente.vue';
import gridSalas from '../../components/employComponent/gridSalas.vue';

import FacturaServices from '../../services/FacturaServices.js'
const factServices = new FacturaServices();

const helloRef = ref(null);
let facturaID = null;
let numAsiento;
let tipoCLiente;
let carteleraID;

const loadBoleto = (async () => {
	if (facturaID == null) {
		let result = await factServices.crearFactura();
		facturaID = result;
	}
	console.log(`
	Cartelera: ${carteleraID}
	tipoCliente: ${tipoCLiente}
	Asiento: ${numAsiento}
	idFactura: ${facturaID}
	`)
})

const handelDtBoletos = (number) => {
	console.log(`Evento: ${number}`);
	helloRef.value.SeatingComponent(number);
};

const handelCarteleras = (id) => {
	carteleraID = id;
	console.log(`Cartelera: ${carteleraID}`);
};

const handelDropdown = (data) => {
	tipoCLiente = data;
	console.log(`tipoCliente: ${tipoCLiente}`);
};

const handelAsientos = (data) => {
	numAsiento = data;
	console.log(`Asiento: ${numAsiento}`);
};

</script>

<style scoped></style>