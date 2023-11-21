<template>
	<div class="table-responsive">
		<table id="dtFacturas" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import $ from 'jquery';

let tblFactura;
let salas;
const emit = defineEmits(['update', 'cartelera', 'resAsientos']);
const dataEjemplo = [
	{
		facturaID: 1,
		fecha: "2023-11-18T20:53:45.737",
		total: 25,
		usuarioID: 1,
		clienteID: 1,
	},
	{
		facturaID: 2,
		fecha: "2023-11-19T15:30:00.000",
		total: 30,
		usuarioID: 2,
		clienteID: 2,
	},
	{
		facturaID: 3,
		fecha: "2023-11-20T12:45:30.500",
		total: 45,
		usuarioID: 1,
		clienteID: 3,
	},
	{
		facturaID: 4,
		fecha: "2023-11-21T08:20:15.200",
		total: 22,
		usuarioID: 3,
		clienteID: 4,
	},
	{
		facturaID: 5,
		fecha: "2023-11-22T18:10:00.800",
		total: 35,
		usuarioID: 2,
		clienteID: 5,
	},
];

onMounted(async () => {
	$(() => {
		tblFactura = $('#dtFacturas').DataTable({
			data: dataEjemplo,
			columns: [
				{ data: 'facturaID', title: 'Factura ID' },
				{ data: 'fecha', title: 'Fecha' },
				{ data: 'total', title: 'Total' },
				{ data: 'usuarioID', title: 'Usuario ID' },
				{ data: 'clienteID', title: 'Cliente ID' },
			],
			// columnDefs: [
			// 	{ className: "dt-left", targets: "_all" },
			// 	{ width: '70%', targets: 0 }, // Primera columna
			// 	{ width: '30%', targets: 1 }  // Segunda columna
			// ],
			lengthChange: false,
			info: false,
			pageLength: 5,
			ordering: false,
			autoWidth: false,
			select: true,
			select: 'single'
		});
		// Configura el evento de clic en la fila
		// $('#tblCartelera').on('click', 'tr', async function () {
		// 	let data = tblCartelera.row($(this).closest('tr')).data();
		// 	let rowSelect = tblCartelera.row({ selected: true }).index() === tblCartelera.row($(this).closest('tr')).index();
		// 	debugger
		// 	if (rowSelect == false) {
		// 		await Saervices.fetchSalaID(data.salaID);
		// 		salas = await Saervices.getsalas();
		// 		emit('resAsientos', data.asientosReservados)
		// 		emit('update', salas.value.capacidadAsientos, data.asientosReservados);
		// 		emit('cartelera', data.carteleraID);
		// 		debugger
		// 	} else {
		// 		console.log('La fila a sido deseleccionada')
		// 		emit('update', 0);
		// 	}
		// });

	})
});

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblFactura) {
		tblFactura.destroy();
	}
});


</script>