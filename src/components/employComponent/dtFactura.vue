<template>
	<div class="table-responsive">
		<table id="dtFacturas" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import $ from 'jquery';

let tblfactura;
let carteleras;
let facturas;
let salas;
const emit = defineEmits(['update', 'cartelera', 'resAsientos']);

import FacturaServices from '../../services/FacturaServices.js'
const FactServices = new FacturaServices();
onMounted(async () => {
	await FactServices.fetchAll();
	tblfactura = await FactServices.getFacturas()

	$(() => {
		tblCartelera = $('#dtFacturas').DataTable({
			data: facturas.value,
			columns: [
				{ data: 'facturaID', title: 'Factura ID' },
				{ data: 'fecha', title: 'Fecha' },
				{ data: 'total', title: 'Total' },
				{ data: 'usuarioID', title: 'Usuario ID' },
				{ data: 'clienteID', title: 'Cliente ID' },
			],
			lengthChange: false,
			info: false,
			pageLength: 5,
			ordering: true,
			order: [[0, 'desc']],
			autoWidth: false,
			select: true,
			select: 'single'
		});
		// Configura el evento de clic en la fila
		$('#tblCartelera').on('click', 'tr', async function () {
			let data = tblCartelera.row($(this).closest('tr')).data();
			let rowSelect = tblCartelera.row({ selected: true }).index() === tblCartelera.row($(this).closest('tr')).index();
			debugger
			if (rowSelect == false) {
				await Saervices.fetchSalaID(data.salaID);
				salas = await Saervices.getsalas();
				emit('resAsientos', data.asientosReservados)
				emit('update', salas.value.capacidadAsientos, data.asientosReservados);
				emit('cartelera', data.carteleraID);
				debugger
			} else {
				console.log('La fila a sido deseleccionada')
				emit('update', 0);
			}
		});

	})
});

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblfactura) {
		tblfactura.destroy();
	}
});


</script>