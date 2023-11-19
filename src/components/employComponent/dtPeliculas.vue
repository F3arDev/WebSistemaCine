<template>
	<div class="table-responsive">
		<table id="tblPelicula" class="table table-striped">
			<!-- <thead>

				<tr>
					<th>Column 1</th>
					<th>Column 2</th>
					<th>Column 3</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Item111</td>
					<td>Item222</td>
					<td>Item333</td>
				</tr>
				<tr>
					<td>Item55</td>
					<td>Item66</td>
					<td>Item77</td>
				</tr>
			</tbody> -->
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import $ from 'jquery';

import peliculasServices from '../../services/PeliculasServices.js'
const peliServices = new peliculasServices();
let tblCartelera;
let peliculas;
onMounted(async () => {
	//init JqueryFuntion
	await peliServices.fetchAll();
	peliculas = await peliServices.getpeliculas();
	console.log(peliculas.value)
	$(() => {
		tblCartelera = $('#tblPelicula').DataTable({
			// {
			// 	"peliculaID": 1,
			// 	"duracionMinutos": 90,
			// 	"sinopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fringilla ac leo sed facilisis. Morbi suscipit non lacus vitae imperdiet.",
			// 	"titulo": "Alicia en el Pais de las Maravillas",
			// 	"genero": "Fantasia",
			// 	"clasificacion": "TP",
			// 	"tipo": "3D"
			// }
			data: peliculas.value,
			columns: [
				{ data: 'titulo', title: 'Titulo' },
				{ data: 'genero', title: 'genero' }
			],
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
			select: true,
			select: 'single'
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