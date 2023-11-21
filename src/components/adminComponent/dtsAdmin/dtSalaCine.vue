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
		"salaID": 1,
		"numeroSala": 1,
		"capacidadAsientos": 25
	},
	{
		"salaID": 2,
		"numeroSala": 2,
		"capacidadAsientos": 30
	}
]

onMounted(() => {
	//init JqueryFuntion
	$(() => {
		tblPelicuas = $('#tblPeliculas').DataTable({
			data: response,
			columns: [
				{ data: 'salaID', title: 'ID' },
				{ data: 'numeroSala', title: 'No-Sala' },
				{ data: 'capacidadAsientos', title: 'Capacidad Asientos' },
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