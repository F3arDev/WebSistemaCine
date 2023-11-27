<template>
	<div class="table-responsive">
		<table id="tblSalas" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import $ from 'jquery';
import { onMounted, onUnmounted } from 'vue';

import salasServices from '../../../services/SalasServices.js'

const salServices = new salasServices()

const emit = defineEmits(['upData']);

let tblSalas;
onMounted(async () => {
	await salServices.fetchAll();
	let listSalas = await salServices.getsalas();
	$(() => {
		tblSalas = $('#tblSalas').DataTable({
			data: listSalas.value,
			columns: [
				{ data: 'salaID', title: 'ID' },
				{ data: 'numeroSala', title: 'No.Sala' },
				{ data: 'capacidadAsientos', title: 'Capacidad de Asientos' },
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
			select: true,
			select: 'single'
		});
		tblSalas.on('click', 'tr', async function () {
			let data = tblSalas.row($(this).closest('tr')).data();
			debugger
			let rowSelect = tblSalas.row({ selected: true }).index() === tblSalas.row($(this).closest('tr')).index();
			if (rowSelect == false) {
				let item = data;
				emit('upData', item);
			}
		})
	})
});

onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblSalas) {
		tblSalas.destroy();
	}
});

const dtUpdate = (async () => {
	await salServices.fetchAll();
	let listSalas = await salServices.getsalas();
	tblSalas.clear().rows.add(listSalas.value).draw();
})

defineExpose({ dtUpdate });
</script>