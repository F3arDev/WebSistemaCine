<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Salas de Cine</h1>
	</div>

	<div class="row justify-content-center align-items-center g-2">
		<div class="col divCard">
			<div class="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
				<button @click="CrearSala" type="button" class="btn btn-primary">Crear</button>
				<button @click="ActualizarSala" type="button" class="btn btn-success">Actualizar</button>
				<button @click="DesabilitarSala" type="button" class="btn btn-warning">Desabilitar</button>
			</div>
			<dtSalaCine @upData="getData" ref="dtSalaRef" />
		</div>
	</div>


	<div style="display: none;">
		<div id="formCrud">
			<div class="mb-3">
				<label for="" class="form-label">NumeroSala</label>
				<input v-model="vnumSala" type="text" class="form-control" placeholder="Escriba el numero de la sala">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">capacidadAsientos</label>
				<input v-model="vcapAsientos" type="text" class="form-control"
					placeholder="Escriba la capacidad de los asientos de la sala">
			</div>
			<!-- {
        "salaID": 0,
        "numeroSala": 0,
        "capacidadAsientos": 0
        } -->
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import dtSalaCine from '../../components/adminComponent/dtsAdmin/dtSalaCine.vue'

import salasServices from '@/services/SalasServices.js'

const salServices = new salasServices()
let dtSalaRef = ref(null)

let vnumSala = ref('')
let vcapAsientos = ref('')
let data
import alertify from 'alertifyjs'
import $ from 'jquery'

const CrearSala = (async () => {
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Crear Sala</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '55%')
		.setContent(formCrud)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let resutl = await salServices.crearSala(
					vnumSala.value,
					vcapAsientos.value,
				);

				if (!resutl) {
					alertify.error('Error al Crearla');
				}

				await dtSalaRef.value.dtUpdate();
				vnumSala.value = ''
				vcapAsientos.value = ''
				alertify.success('Creada Correctamente');
			}
		})
})

const ActualizarSala = (async () => {
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Actualizar Sala</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '85%')
		.setContent(formCrud)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let id = data.salaID;
				let resutl = await salServices.ActualizarSala(
					id,
					vnumSala.value,
					vcapAsientos.value,
				);
				if (!resutl) {
					alertify.error('Error al Crearla');
				}
				await dtSalaRef.value.dtUpdate();
				vnumSala.value = ''
				vcapAsientos.value = ''
				alertify.success('Creada Correctamente');
			}
		})
	vnumSala.value = data.numeroSala
	vcapAsientos.value = data.capacidadAsientos
})

const DesabilitarSala = (() => {
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Eliminar Cartelera</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '55%')
		.setContent(`
			<h4>Desea eliminar esta Sala?<h4>
		`)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let id = data.salaID;
				let resutl = await salServices.EliminarSala(id);
				if (!resutl) {
					alertify.error('Error al Desabilitarla');
				}
				await dtSalaRef.value.dtUpdate();
				alertify.success('Desabilitarla Correctamente');
			}
		})
})

const getData = (x) => {
	
	data = x
}

</script>

<style scoped></style>