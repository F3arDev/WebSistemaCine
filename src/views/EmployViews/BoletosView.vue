<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Boletos</h1>
	</div>
	<div class="container-fluid">
		<div class="row justify-content-start align-items-start">
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
						<dtCartelera @update="handelDtBoletos" @cartelera="handelCarteleras"
							@resAsientos="handelresAsientos" />
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center align-items-center">
			<div class="col divCard">
				<div>
					<h5>Boletos</h5>
					<dtBoletos ref="dtBoletosFuncion" />
					<div class="d-grid gap-2">
						<button type="button" name="" id="" class="btn btn-primary">Generar Factura</button>
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

import BoletosServices from '../../services/BoletoServices.js'
const boleServices = new BoletosServices();

const helloRef = ref(null);
const dtBoletosFuncion = ref(null)

let facturaID = null;
let numAsiento;
let tipoCLiente;
let carteleraID;

let resAsientos = [];

const loadBoleto = (async () => {
	if (facturaID == null) {
		let result = await factServices.crearFactura();
		facturaID = result;
	}
	let result = await boleServices.crearBoleto(tipoCLiente, carteleraID, facturaID, numAsiento);
	await dtBoletosFuncion.value.dtUpdate(facturaID);
	debugger
	console.log(result)
})

const handelDtBoletos = (number, resAsientos) => {
	console.log(`Evento: ${number}`);
	debugger
	helloRef.value.SeatingComponent(number, resAsientos);
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

const handelresAsientos = (data) => {
	resAsientos = data;
	debugger
	console.log(`Asiento: ${resAsientos}`);
};
</script>

<style scoped></style>