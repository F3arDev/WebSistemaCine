<template>
	<div class="table-responsive">
		<table id="tblPeliculas" class="table table-striped">
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
import $ from 'jquery';
import { onMounted, onUnmounted } from 'vue';
let tblPelicuas;

let response = [
	{
		"peliculaID": 1,
		"duracionMinutos": 90,
		"sinopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fringilla ac leo sed facilisis. Morbi suscipit non lacus vitae imperdiet.",
		"titulo": "Alicia en el Pais de las Maravillas",
		"genero": "Fantasia",
		"clasificacion": "TP",
		"tipo": "3D"
	},
	{
		"peliculaID": 2,
		"duracionMinutos": 105,
		"sinopsis": "sinopsis",
		"titulo": "Rapidos y Furiosos 10",
		"genero": "Accion",
		"clasificacion": "TP-13",
		"tipo": "2D"
	}
]

onMounted(() => {
	//init JqueryFuntion
	$(() => {
		tblPelicuas = $('#tblPeliculas').DataTable({
			data: response,
			columns: [
				{ data: 'peliculaID', title: 'Pelicula ID' },
				{ data: 'duracionMinutos', title: 'Duración (minutos)' },
				{ data: 'sinopsis', title: 'Sinopsis' },
				{ data: 'titulo', title: 'Título' },
				{ data: 'genero', title: 'Género' },
				{ data: 'clasificacion', title: 'Clasificación' },
				{ data: 'tipo', title: 'Tipo' }
			],
			lengthChange: false,
			pageLength: 5,
			autoWidth: false,
			bPaginate: false,
			language: {
				url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json',
			},
		});
	})
});

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblPelicuas) {
		tblPelicuas.destroy();
	}
});


</script>