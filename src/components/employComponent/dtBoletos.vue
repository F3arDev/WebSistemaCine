<template>
	<div class="table-responsive">
		<table id="tblBoleto" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import $ from 'jquery';

import carteleraServices from '../../services/CarteleraServices';
const cartService = new carteleraServices();

import PeliculasServices from '../../services/PeliculasServices.js'
const peliService = new PeliculasServices();
let tblBoleto;
let carteleras;
let peliculas;
onMounted(async () => {
	//init JqueryFuntion
	await cartService.fetchAll();
	carteleras = await cartService.getCarteleras();

	await peliService.fetchAll();
	peliculas = await peliService.getpeliculas();

	$(() => {
		tblBoleto = $('#tblBoleto').DataTable({
			// data: carteleras.value,
			// columns: [
			// 	{
			// 		// Configuración de la columna para renderizar el título de la película
			// 		data: 'peliculaID',
			// 		title: 'Título',
			// 		render: function (data, type, row) {
			// 			// Verifica si peliculas.value es un objeto o un array
			// 			if (Array.isArray(peliculas.value)) {
			// 				// Caso: peliculas.value es un array
			// 				var pelicula = peliculas.value.find(function (p) {
			// 					return p.peliculaID === data;
			// 				});
			// 				// Retorna el título de la película
			// 				return pelicula ? pelicula.titulo : '';
			// 			} else {
			// 				// Caso: peliculas.value es un objeto
			// 				for (var key in peliculas.value) {
			// 					if (peliculas.value[key].peliculaID === data) {
			// 						return peliculas.value[key].titulo;
			// 					}
			// 				}
			// 				return '';
			// 			}
			// 		},
			// 	},
			// 	{ data: 'salaID', title: 'Sala' },
			// ],
			columnDefs: [
				{ className: "dt-left", targets: "_all" },
				{ width: '70%', targets: 0 }, // Primera columna
				{ width: '30%', targets: 1 }  // Segunda columna
			],
			lengthChange: false,
			info: false,
			pageLength: 5,
			ordering: false,
			autoWidth: false,
			searching:false,
			select: true,
			select: 'single'
		});
	})
});
onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblBoleto) {
		tblBoleto.destroy();
	}
});


</script>