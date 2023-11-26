<template>
	<div class="table-responsive">
		<table id="dtFacturas" class="table table-striped">
		</table>
	</div>



	<div style="display: none;">
		<div class="table-responsive">
			<table id="dtBoletosFactura" class="table table-striped">

			</table>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import $ from 'jquery';

import alertify from 'alertifyjs'

let tblfactura;
let facturas;
const emit = defineEmits(['update', 'cartelera', 'resAsientos']);

import FacturaServices from '../../services/FacturaServices.js'
const FactServices = new FacturaServices();

import BoletoServices from '../../services/BoletoServices';
const boleServices = new BoletoServices();



onMounted(async () => {
	await FactServices.fetchAll();
	facturas = await FactServices.getFacturas()

	$(() => {
		tblfactura = $('#dtFacturas').DataTable({
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



		tblfactura.on('click', 'tr', async function () {
			let data = tblfactura.row($(this).closest('tr')).data();
			let rowSelect = tblfactura.row({ selected: true }).index() === tblfactura.row($(this).closest('tr')).index();
			debugger

			if (rowSelect == false) {
				await boleServices.fetchBoletoxFactID(data.facturaID);
				let ListBoletoFactura = await boleServices.getboletosxFactID()
				debugger

				debugger
				let tdBoletos = $('#dtBoletosFactura')[0];
				alertify.alert('')
					.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Boletos de la Factura</div>')
					.set('closable', false)
					.set('resizable', true)
					.resizeTo('70%', '55%')
					.setContent(tdBoletos)
					.set({ onclose: function () { tblfacturaBoleto.destroy() } });
				debugger

				let tblfacturaBoleto = $('#dtBoletosFactura').DataTable({
					data: ListBoletoFactura.value,
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