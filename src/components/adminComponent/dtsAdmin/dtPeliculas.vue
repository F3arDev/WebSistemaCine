<template>
	<div class="table-responsive">
		<table id="tblPelicula" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import $ from 'jquery'
import { onMounted, onUnmounted } from 'vue';

import PeliculaServices from '@/services/PeliculasServices';
const PeliServices = new PeliculaServices();
let tblPelicula;


const emit = defineEmits(['upData']);


onMounted(async () => {
	//init JqueryFuntion
	await PeliServices.fetchAll();
	let listPeliculas = await PeliServices.getpeliculas();
	$(() => {
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

		tblPelicula.on('click', 'tr', async function () {
			let data = tblPelicula.row($(this).closest('tr')).data();
			
			let rowSelect = tblPelicula.row({ selected: true }).index() === tblPelicula.row($(this).closest('tr')).index();
			if (rowSelect == false) {
				let item = data
				emit('upData', item);
			}
		})
	})
});

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblPelicula) {
		tblPelicula.destroy();
	}
});

const dtUpdate = (async () => {
	await PeliServices.fetchAll();
	let listPeliculas = await PeliServices.getpeliculas();
	tblPelicula.clear().rows.add(listPeliculas.value).draw();
})

defineExpose({ dtUpdate });

</script>