<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Horarios</h1>
	</div>

	<div class="row justify-content-center align-items-center g-2">
		<div class="col divCard">
			<div class="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
				<button @click="CrearHorario" type="button" class="btn btn-primary">Crear</button>
				<button @click="ActualizarHorario" type="button" class="btn btn-success">Actualizar</button>
				<button @click="DesabilitarHorario" type="button" class="btn btn-warning">Desabilitar</button>
			</div>

			<dtHorarios @upData="getData" ref="dtHorariosRef" />
		</div>
	</div>


	<div style="display: none;">
		<div id="formCrud">
			<div class="mb-3">
				<label for="" class="form-label">Fecha</label>
				<input v-model="vfecha" type="date" class="form-control" placeholder="Seleccione una fecha">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Hora Inicio</label>
				<input v-model="vHoraInicio" type="time" class="form-control" placeholder="Seleccione una hora de inicio">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Hora Fin</label>
				<input v-model="vHoraFin" type="time" class="form-control" placeholder="Seleccione una hora de fin">
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import dtHorarios from '../../components/adminComponent/dtHorarios.vue'

import HorariosServices from '../../services/HorarioServices'
const horariServices = new HorariosServices()


let dtHorariosRef = ref(null)

let vfecha = ref('')
let vHoraInicio = ref('')
let vHoraFin = ref('')

let data
import alertify from 'alertifyjs'
import $ from 'jquery'

const CrearHorario = (async () => {
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Crear Horarios</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '65%')
		.setContent(formCrud)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let resutl = await horariServices.crearHorario(
					vfecha.value,
					vHoraInicio.value,
					vHoraFin.value
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

const ActualizarHorario = (async () => {
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

const DesabilitarHorario = (() => {
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
	debugger
	data = x
}

</script>

<style scoped></style>