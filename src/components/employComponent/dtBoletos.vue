<template>
	<div class="table-responsive">
		<table id="tblBoleto" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import $ from 'jquery';

import BoletoServices from '../../services/BoletoServices';
const boleServices = new BoletoServices();

let tblBoleto;
let ListBoletoFactura = ref([]);

onMounted(async () => {
	$(() => {
		tblBoleto = $('#tblBoleto').DataTable({
			data: ListBoletoFactura.value,
			// {
			// 	"boletoID": 3,
			// 	"tipoClienteID": 3,
			// 	"carteleraID": 1,
			// 	"facturaID": 5,
			// 	"numeroAsiento": 3,
			// 	"precio": 20
			// }
			columns: [
				{ data: 'boletoID', title: 'ID' },
				{ data: 'tipoClienteID', title: 'Cliente' },
				{ data: 'carteleraID', title: 'Cartelera' },
				{ data: 'numeroAsiento', title: 'Asiento' },
				{ data: 'precio', title: 'Precio' },
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
			searching: false,
			bPaginate: false,
		});
	})
});
onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblBoleto) {
		tblBoleto.destroy();
	}
});
const dtUpdate = (async (number) => {
	await boleServices.fetchBoletoxFactID(number);
	ListBoletoFactura = await boleServices.getboletosxFactID()
	
	tblBoleto.clear().rows.add(ListBoletoFactura.value).draw();
	debugger
	console.log(ListBoletoFactura.value)
})

defineExpose({ dtUpdate });
</script>