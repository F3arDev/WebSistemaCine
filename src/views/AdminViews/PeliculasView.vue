<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Peliculas</h1>
	</div>

	<div class="row justify-content-center align-items-center g-2">
		<div class="col divCard">
			<div class="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
				<button @click="CrearPelicula" type="button" class="btn btn-primary">Crear</button>
				<button @click="ActualizarPelicula" type="button" class="btn btn-success">Actualizar</button>
				<button @click="DesabilitarPelicula" type="button" class="btn btn-warning">Desabilitar</button>
			</div>

			<DtPeliculas @upData="getData" ref="dtPeliculaRef" />
		</div>
	</div>


	<div style="display: none;">
		<div id="formCrud">
			<div class="mb-3">
				<label for="" class="form-label">Titulo</label>
				<input v-model="vTitulo" type="text" class="form-control">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Sinopsis</label>
				<input v-model="vSinopsis" type="text" class="form-control">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Duracion Minutos</label>
				<input v-model="vDuracionMin" type="text" class="form-control">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Genero</label>
				<input v-model="vGenero" type="text" class="form-control">
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Clasificacion</label>
				<input v-model="vClasificacion" type="text" class="form-control">
			</div>
			<div>
				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
						aria-expanded="false">
						{{ vTipo }}
					</button>
					<ul class="dropdown-menu">
						<li @click="selectDimension('2D')"><a class="dropdown-item" href="#">2D</a></li>
						<li @click="selectDimension('3D')"><a class="dropdown-item" href="#">3D</a></li>
					</ul>
				</div>
				<br>
				<br>
			</div>
			<!-- {
			"peliculaID": 0,
			"duracionMinutos": 0,
			"sinopsis": "string",
			"titulo": "string",
			"genero": "string",
			"clasificacion": "string",
			"tipo": "string"
			} -->
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import DtPeliculas from '../../components/adminComponent/dtsAdmin/dtPeliculas.vue';

import alertify from 'alertifyjs'
import $ from 'jquery'

import PeliculaServices from '../../services/PeliculasServices';
const PeliServices = new PeliculaServices();

let dtPeliculaRef = ref(null)

let vTitulo = ref('')
let vSinopsis = ref('')
let vGenero = ref('')
let vClasificacion = ref('')
let vTipo = ref('2D')
let vDuracionMin = ref('')

let data

const selectDimension = (dimension) => {
	vTipo.value = dimension;
};

const CrearPelicula = (async () => {
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Crear Pelicula</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '85%')
		.setContent(formCrud)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let resutl = await PeliServices.crearPelicula(
					vDuracionMin.value,
					vSinopsis.value,
					vTitulo.value,
					vGenero.value,
					vClasificacion.value,
					vTipo.value,
				);
				if (!resutl) {
					alertify.error('Error al Crearla');
				}
				await dtPeliculaRef.value.dtUpdate();
				formCrud.reset();
				alertify.success('Creada Correctamente');
			}
		})
})
const ActualizarPelicula = (async () => {
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Actualizar Pelicula</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '85%')
		.setContent(formCrud)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let id = data.peliculaID;
				let resutl = await PeliServices.ActualizarPelicula(
					id,
					vDuracionMin.value,
					vSinopsis.value,
					vTitulo.value,
					vGenero.value,
					vClasificacion.value,
					vTipo.value,
				);

				if (!resutl) {
					alertify.error('Error al Crearla');
				}

				await dtPeliculaRef.value.dtUpdate();
				formCrud.reset();
				alertify.success('Creada Correctamente');
			}
		})

	vTitulo.value = data.titulo
	vSinopsis.value = data.sinopsis
	vDuracionMin.value = data.duracionMinutos
	vGenero.value = data.genero
	vClasificacion.value = data.clasificacion
	vTipo.value = data.tipo
})

const DesabilitarPelicula = (() => {
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Eliminar Pelicula</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '55%')
		.setContent(`
			<h4>Desea eliminar esta Pelicula?<h4>
		`)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let id = data.peliculaID;
				let resutl = await PeliServices.EliminarPelicula(id);

				if (!resutl) {
					alertify.error('Error al Desabilitarla');
				}

				await dtPeliculaRef.value.dtUpdate();
				formCrud.reset();
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