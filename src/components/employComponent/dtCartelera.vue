<template>
	<h5>Carteleras</h5>
	<div class="table-responsive">
		<table id="tblCartelera" class="table table-striped">
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
				<tr></tr>
					<td>Item55</td>
					<td>Item66</td>
					<td>Item77</td>
				</tr>
			</tbody> -->
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import $ from 'jquery';

import carteleraServices from '../../services/CarteleraServices';
const cartService = new carteleraServices();

import PeliculasServices from '../../services/PeliculasServices.js'
const peliService = new PeliculasServices();

import SalaServices from '../../services/SalasServices.js'
const Saervices = new SalaServices();


let tblCartelera;
let carteleras = ref([]);
let peliculas;
let salas;
const emit = defineEmits(['update', 'cartelera', 'resAsientos']);

onMounted(async () => {
	//init JqueryFuntion
	await cartService.fetchAll();
	carteleras = await cartService.getCarteleras();
	$(() => {
		tblCartelera = $('#tblCartelera').DataTable({
			data: carteleras.value,
			columns: [
				{ data: 'carteleraID', title: 'ID', },
				{ data: 'titulo_Pelicula', title: 'Titulo' },
				{ data: 'fecha', title: 'Fecha' },
				{ data: 'horaInicio', title: 'Hora Inicio' },
				{ data: 'horaFin', title: 'Hora Fin' },
				{ data: 'numeroSala', title: 'No.Sala' },
			],
			columnDefs: [
				{ className: "dt-left", targets: "_all" },
				// { width: '70%', targets: 0 }, // Primera columna
				// { width: '30%', targets: 1 }  // Segunda columna
			],
			lengthChange: false,
			info: false,
			pageLength: 5,
			ordering: false,
			autoWidth: false,
			select: true,
			select: 'single'
		});
		// Configura el evento de clic en la fila
		$('#tblCartelera').on('click', 'tr', async function () {
			let data = await tblCartelera.row($(this).closest('tr')).data();
			let rowSelect = tblCartelera.row({ selected: true }).index() === tblCartelera.row($(this).closest('tr')).index();
			debugger
			if (rowSelect == false) {
				await Saervices.fetchSalaID(data.iD_Sala);
				salas = await Saervices.getsalas();
				debugger
				console.log(data.asientosOcupados)
				let item = JSON.stringify(data.asientosOcupados)
				emit('resAsientos', item)
				emit('update', salas.value.capacidadAsientos, item);
				emit('cartelera', data.carteleraID);

			} else {
				console.log('La fila a sido deseleccionada')
				emit('update', 0);
			}
		});

	})
});

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblCartelera) {
		tblCartelera.destroy();
	}
});

const dtUpdate = (async () => {
	debugger
	await cartService.fetchAll();
	carteleras = await cartService.getCarteleras();
	tblCartelera.clear().rows.add(carteleras.value).draw();
})

defineExpose({ dtUpdate });


</script>