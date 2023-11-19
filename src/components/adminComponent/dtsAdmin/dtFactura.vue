<template>
	<h4>
		Registros de Facturas
	</h4>
	<div class="table-responsive">
		<table id="tblFactura" class="table table-striped">
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
	<div>
		<button @click="alertifybtn()">alerty</button>
	</div>
</template>

<script setup>
import $ from 'jquery';
import alertify from 'alertifyjs';
import { onMounted, onUnmounted } from 'vue';
let tblFactura;

const alertifybtn = (() => {
	alertify.confirm('');
})

onMounted(() => {
	//init JqueryFuntion
	$(() => {
		tblFactura = $('#tblFactura').DataTable();
	})
})

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblFactura) {
		tblFactura.destroy();
	}
})


</script>

<style scoped></style>