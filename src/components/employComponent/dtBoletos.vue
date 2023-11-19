<template>
	<div class="table-responsive">
		<table id="tblBoletos" class="table table-striped">
			<thead>

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
				
			</tbody>
		</table>
	</div>
</template>

<script setup>
import $ from 'jquery';
import { onMounted, onUnmounted } from 'vue';
let tblCartelera;

onMounted(() => {
	//init JqueryFuntion
	$(() => {
		tblCartelera = $('#tblBoletos').DataTable({
			

			searching: false,
			lengthChange: false,
			info: false,
			pageLength: 5,
			ordering: false
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