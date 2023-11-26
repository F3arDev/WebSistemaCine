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

			<dtCartelera @cartelera="handelCarteleras" />
		</div>
	</div>


	<div style="display: none;">
		<div id="formCrud">
			<div class="mb-3">
				<label for="" class="form-label">Pelicula</label>
				<input type="text" class="form-control">
			</div>
			<div class="table-responsive">
				<table id="tblPelicula" class="table table-striped">
				</table>
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Horario</label>
				<input type="text" class="form-control">
			</div>
			<div class="table-responsive">
				<table id="tblHorario" class="table table-striped">
				</table>
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Sala</label>
				<input type="text" class="form-control">
			</div>
			<div class="table-responsive">
				<table id="tblSala" class="table table-striped">
				</table>
			</div>
			<div class="mb-3">
				<label for="" class="form-label">Descripcion</label>
				<input type="text" class="form-control">
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import alertify from 'alertifyjs';
import $ from 'jquery'


import dtCartelera from '../../../components/adminComponent/dtsAdmin/dtCartelera.vue';




import BoletoServices from '../../services/BoletoServices';
const boleServices = new BoletoServices();


let data = ref([]);

const CrearCartelera = (async () => {
	await boleServices.fetchBoletoxFactID(data.facturaID);
	let ListBoletoFactura = await boleServices.getboletosxFactID()


	let formCrud = $('#formCrud')[0];
	alertify.alert('')
		.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Cartelera</div>')
		.set('closable', false)
		.set('resizable', true)
		.resizeTo('70%', '55%')
		.setContent(formCrud)
		.set({ onclose: function () { } });


	let tblPelicula = $('#tblPelicula').DataTable({
		data: ListBoletoFactura.value,
		columns: [
			{ data: 'boletoID', title: 'ID' },
			{ data: 'tituloPelicula', title: 'Pelicula' },
			{ data: 'fecha', title: 'Fecha' },
			{ data: 'horaInicio', title: 'Hora de Inicio' },
			{ data: 'numeroSala', title: 'No.Sala' },
			{ data: 'numeroAsiento', title: 'No.Asiento' },
			{ data: 'precio', title: 'Pecio' }
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
	});
})

const ActualizarCartelera = (() => {

})

const DesabilitarCartelera = (() => {

})


const handelCarteleras = (x) => {
	data.value = x;
	console.log(`data: ${data.value}`);
};


</script>

<style scoped></style>