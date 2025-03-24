<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Carteleras</h1>
	</div>

	<div class="row justify-content-center align-items-center g-2">
		<div class="col divCard">
			<div class="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
				<button @click="CrearCartelera" type="button" class="btn btn-primary">Crear</button>
				<button @click="ActualizarCartelera" type="button" class="btn btn-success">Actualizar</button>
				<button @click="DesabilitarCartelera" type="button" class="btn btn-warning">Desabilitar</button>
			</div>

			<dtCartelera ref="dtCarteleraRef" @cartelera="handelCarteleras" />
		</div>
	</div>


	<div style="display: none;">
		<div id="formCrud">
			<div class="mb-3">
				<label for="" class="form-label">Pelicula</label>
				<input v-model="vPelicula" type="text" class="form-control" disabled placeholder="Seleccione una Pelicula">
			</div>
			<div class="table-responsive">
				<table id="tblPelicula" class="table table-striped">
				</table>
			</div>

			<div>
				<br>
			</div>

			<div class="mb-3">
				<label for="" class="form-label">Horario</label>
				<input v-model="vHorario" type="text" class="form-control" disabled placeholder="Seleccione un Horario">
			</div>
			<div class="table-responsive">
				<table id="tblHorario" class="table table-striped">
				</table>
			</div>

			<div>
				<br>
			</div>

			<div class="mb-3">
				<label for="" class="form-label">Sala</label>
				<input v-model="vSala" type="text" class="form-control" disabled placeholder="Seleccione una Sala">
			</div>
			<div class="table-responsive">
				<table id="tblSala" class="table table-striped">
				</table>
			</div>

			<div>
				<br>
			</div>

			<div class="mb-3">
				<label for="" class="form-label">Descripcion</label>
				<input v-model="vDescripcion" type="text" class="form-control">
			</div>
		</div>
	</div>
</template>

<script setup>
import dtCartelera from '../../components/employComponent/dtCartelera.vue'
import { ref } from 'vue';
import alertify from 'alertifyjs';
import $ from 'jquery';

import PeliculaServices from '../../services/PeliculasServices';
const PeliServices = new PeliculaServices();

import HorariosServices from '../../services/HorarioServices';
const horaServices = new HorariosServices();

import SalasServices from '../../services/SalasServices';
const salaServices = new SalasServices();

import CarteleraServices from '../../services/CarteleraServices';
const cartServices = new CarteleraServices();

const dtCarteleraRef = ref(null)

let vPelicula = ref('')
let vHorario = ref('')
let vSala = ref('')
let vDescripcion = ref('')
let data = ref([]);

let peliculaID;
let horarioID;
let salaID;

let tblPelicula
let tblHorario
let tblSala

const CrearCartelera = (async () => {
	await PeliServices.fetchAll();
	let listPeliculas = await PeliServices.getpeliculas();

	await horaServices.fetchAll();
	let listHoras = await horaServices.getHoriarios();

	await salaServices.fetchAll();
	let listSalas = await salaServices.getsalas();

	
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Crear Cartelera</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '85%')
		.setContent(formCrud)
		.set({
			onclose: function () {
				tblPelicula.destroy();
				tblHorario.destroy();
				tblSala.destroy();
			},
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let resutl = await cartServices.crearCartelera(
					vDescripcion.value,
					peliculaID,
					horarioID,
					salaID
				);
				if (!resutl) {
					alertify.error('Error al Crearla');
				}
				await dtCarteleraRef.value.dtUpdate();
				alertify.success('Creada Correctamente');
			}
		})

	tblPelicula = $('#tblPelicula').DataTable({
		data: listPeliculas.value,
		columns: [
			{ data: 'peliculaID', title: 'ID' },
			{ data: 'titulo', title: 'Titulo' },
			{ data: 'genero', title: 'Genero' },
			{ data: 'duracionMinutos', title: 'Duracion' },
			{ data: 'clasificacion', title: 'Clasificacion' },
			{ data: 'tipo', title: 'Tipo' },
			{ data: 'sinopsis', title: 'Sinopsis' }
		],
		lengthChange: false,
		info: false,
		pageLength: 5,
		ordering: true,
		order: [[0, 'desc']],
		autoWidth: false,
		bPaginate: false,
		searching: false,
		ordering: false,
		select: true,
		select: 'single'
	});

	tblHorario = $('#tblHorario').DataTable({
		data: listHoras.value,
		columns: [
			{ data: 'horarioID', title: 'ID' },
			{ data: 'fecha', title: 'Fecha' },
			{ data: 'horaInicio', title: 'Hora Inicio' },
			{ data: 'horaFin', title: 'Hora Fin' }
		],
		lengthChange: false,
		info: false,
		pageLength: 5,
		ordering: true,
		order: [[0, 'desc']],
		autoWidth: false,
		bPaginate: false,
		searching: false,
		ordering: false,
		select: true,
		select: 'single'
	});

	tblSala = $('#tblSala').DataTable({
		data: listSalas.value,
		columns: [
			{ data: 'salaID', title: 'ID' },
			{ data: 'numeroSala', title: 'No.Sala' },
			{ data: 'capacidadAsientos', title: 'Capacidad de Asientos' },
		],
		lengthChange: false,
		info: false,
		pageLength: 5,
		ordering: true,
		order: [[0, 'desc']],
		autoWidth: false,
		bPaginate: false,
		searching: false,
		ordering: false,
		select: true,
		select: 'single'
	});

	tblPelicula.on('click', 'tr', async function () {
		let data = tblPelicula.row($(this).closest('tr')).data();
		let rowSelect = tblPelicula.row({ selected: true }).index() === tblPelicula.row($(this).closest('tr')).index();
		if (rowSelect == false) {
			vPelicula.value = data.titulo

			peliculaID = data.peliculaID;
		}
	})

	tblHorario.on('click', 'tr', async function () {
		let data = tblHorario.row($(this).closest('tr')).data();
		let rowSelect = tblHorario.row({ selected: true }).index() === tblHorario.row($(this).closest('tr')).index();

		if (rowSelect == false) {
			vHorario.value = `Fecha: ${data.fecha}, Hora Inicio: ${data.horaInicio}, Hora Finalizacion: ${data.horaFin} `
			horarioID = data.horarioID
		}
	})

	tblSala.on('click', 'tr', async function () {
		let data = tblSala.row($(this).closest('tr')).data();
		let rowSelect = tblSala.row({ selected: true }).index() === tblSala.row($(this).closest('tr')).index();

		if (rowSelect == false) {
			vSala.value = `No.Sala: ${data.numeroSala}, Capacidad Asientos: ${data.capacidadAsientos}`
			salaID = data.salaID
		}
	})
})

const ActualizarCartelera = (async () => {
	await PeliServices.fetchAll();
	let listPeliculas = await PeliServices.getpeliculas();

	await horaServices.fetchAll();
	let listHoras = await horaServices.getHoriarios();

	await salaServices.fetchAll();
	let listSalas = await salaServices.getsalas();


	let carteleraIDData = await cartServices.fetchCarterleraID(data.value);
	
	let formCrud = $('#formCrud')[0];
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Crear Cartelera</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '85%')
		.setContent(formCrud)
		.set({
			onclose: function () {
				tblPelicula.destroy();
				tblHorario.destroy();
				tblSala.destroy();
			},
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let id = data.value;
				let resutl = await cartServices.ActualizarCartelera(
					id,
					vDescripcion.value,
					peliculaID,
					horarioID,
					salaID
				);
				if (!resutl) {
					alertify.error('Error al Crearla');
				}
				await dtCarteleraRef.value.dtUpdate();

				formCrud.reset();
				alertify.success('Creada Correctamente');
			}
		})

	tblPelicula = $('#tblPelicula').DataTable({
		data: listPeliculas.value,
		columns: [
			{ data: 'peliculaID', title: 'ID' },
			{ data: 'titulo', title: 'Titulo' },
			{ data: 'genero', title: 'Genero' },
			{ data: 'duracionMinutos', title: 'Duracion' },
			{ data: 'clasificacion', title: 'Clasificacion' },
			{ data: 'tipo', title: 'Tipo' },
			{ data: 'sinopsis', title: 'Sinopsis' }
		],
		lengthChange: false,
		info: false,
		pageLength: 5,
		ordering: true,
		order: [[0, 'desc']],
		autoWidth: false,
		bPaginate: false,
		searching: false,
		ordering: false,
		select: true,
		select: 'single'
	});

	tblHorario = $('#tblHorario').DataTable({
		data: listHoras.value,
		columns: [
			{ data: 'horarioID', title: 'ID' },
			{ data: 'fecha', title: 'Fecha' },
			{ data: 'horaInicio', title: 'Hora Inicio' },
			{ data: 'horaFin', title: 'Hora Fin' }
		],
		lengthChange: false,
		info: false,
		pageLength: 5,
		ordering: true,
		order: [[0, 'desc']],
		autoWidth: false,
		bPaginate: false,
		searching: false,
		ordering: false,
		select: true,
		select: 'single'
	});

	tblSala = $('#tblSala').DataTable({
		data: listSalas.value,
		columns: [
			{ data: 'salaID', title: 'ID' },
			{ data: 'numeroSala', title: 'No.Sala' },
			{ data: 'capacidadAsientos', title: 'Capacidad de Asientos' },
		],
		lengthChange: false,
		info: false,
		pageLength: 5,
		ordering: true,
		order: [[0, 'desc']],
		autoWidth: false,
		bPaginate: false,
		searching: false,
		ordering: false,
		select: true,
		select: 'single'
	});

	tblPelicula.on('click', 'tr', async function () {
		let data = tblPelicula.row($(this).closest('tr')).data();
		let rowSelect = tblPelicula.row({ selected: true }).index() === tblPelicula.row($(this).closest('tr')).index();
		if (rowSelect == false) {
			vPelicula.value = data.titulo
			peliculaID = data.peliculaID;
		}
	})

	tblHorario.on('click', 'tr', async function () {
		let data = tblHorario.row($(this).closest('tr')).data();
		let rowSelect = tblHorario.row({ selected: true }).index() === tblHorario.row($(this).closest('tr')).index();

		if (rowSelect == false) {
			vHorario.value = `Fecha: ${data.fecha}, Hora Inicio: ${data.horaInicio}, Hora Finalizacion: ${data.horaFin} `
			horarioID = data.horarioID
		}
	})

	tblSala.on('click', 'tr', async function () {
		let data = tblSala.row($(this).closest('tr')).data();
		let rowSelect = tblSala.row({ selected: true }).index() === tblSala.row($(this).closest('tr')).index();

		if (rowSelect == false) {
			vSala.value = `No.Sala: ${data.numeroSala}, Capacidad Asientos: ${data.capacidadAsientos}`
			salaID = data.salaID
		}
	})
	vPelicula.value = carteleraIDData.tituloPelicula
	vHorario.value = `Fecha: ${carteleraIDData.fecha}, Hora Inicio: ${carteleraIDData.horaInicio}, Hora Finalizacion: ${carteleraIDData.horaFin} `
	vSala.value = `No.Sala: ${carteleraIDData.numeroSala}, Capacidad Asientos: ${carteleraIDData.capacidadAsientos}`
})

const DesabilitarCartelera = (() => {
	alertify.confirm('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Eliminar Cartelera</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '85%')
		.setContent(`
			<h4>Desea eliminar esta cartelera?<h4>
		`)
		.set({
			labels: { "ok": "SI", "cancel": "NO" },
			onok: async function () {
				let id = data.value;
				let resutl = await cartServices.EliminarCartelera(id);

				if (!resutl) {
					alertify.error('Error al Eliminarla');
				}
				
				await dtCarteleraRef.value.dtUpdate();
				alertify.success('Eliminada Correctamente');
			}
		})
})

const handelCarteleras = (x) => {
	data.value = x;
	console.log(`data: ${data.value}`);
};
</script>

<style scoped></style>