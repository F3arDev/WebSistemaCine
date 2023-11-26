<template>
	<div class="table-responsive">
		<table id="tblBoleto" class="table table-striped">
		</table>
	</div>

	<div>
		<h4>Total: {{ totalBoletos }}</h4>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import $ from 'jquery';

import BoletoServices from '../../services/BoletoServices';
const boleServices = new BoletoServices();

let tblBoleto;
let ListBoletoFactura = ref([]);
let totalBoletos = ref();

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
	calcularSumaPrecios();
	console.log(ListBoletoFactura.value)
})

function calcularSumaPrecios() {
	totalBoletos.value = tblBoleto.column(6).data().reduce(function (a, b) {
		return a + b;
	}, 0);

	console.log('La suma total de precios es: ' + totalBoletos);
}
defineExpose({ dtUpdate });
</script>