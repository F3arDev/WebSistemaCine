<template>
	<h5>Carteleras</h5>
	<div class="table-responsive">
		<table id="tblCartelera" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import $ from 'jquery';

import carteleraServices from '../../../services/CarteleraServices.js';
const cartService = new carteleraServices();


let tblCartelera;
let carteleras = ref([]);
let peliculas;
let salas;
const emit = defineEmits(['update', 'cartelera', 'resAsientos']);

onMounted(async () => {
	//init JqueryFuntion
	await cartService.fetchAll();
	carteleras = await cartService.getCarteleras();
	$(() => {
		tblCartelera = $('#tblCartelera').DataTable({
			data: carteleras.value,
			columns: [
				{ data: 'carteleraID', title: 'ID', },
				{ data: 'titulo_Pelicula', title: 'Titulo' },
				{ data: 'fecha', title: 'Fecha' },
				{ data: 'horaInicio', title: 'Hora Inicio' },
				{ data: 'horaFin', title: 'Hora Fin' },
				{ data: 'numeroSala', title: 'No.Sala' },
			],
			columnDefs: [
				{ className: "dt-left", targets: "_all" },
				// { width: '70%', targets: 0 }, // Primera columna
				// { width: '30%', targets: 1 }  // Segunda columna
			],
			lengthChange: false,
			info: false,
			pageLength: 5,
			ordering: false,
			autoWidth: false,
			select: true,
			select: 'single'
		});
		// Configura el evento de clic en la fila
		$('#tblCartelera').on('click', 'tr', async function () {
			let data = await tblCartelera.row($(this).closest('tr')).data();
			let rowSelect = tblCartelera.row({ selected: true }).index() === tblCartelera.row($(this).closest('tr')).index();
			debugger
			if (rowSelect == false) {
				emit('cartelera', data);
			} else {
				console.log('La fila a sido deseleccionada')
				emit('cartelera', 0);
			}
		});

	})



});





onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblCartelera) {
		tblCartelera.destroy();
	}
});


</script>