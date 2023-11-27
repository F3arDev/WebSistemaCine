<template>
	<div class="table-responsive">
		<table id="tblHorarios" class="table table-striped">
		</table>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

import $ from 'jquery'

let tblHorario;

import HorariossServices from '../../services/HorarioServices'

const horariServices = new HorariossServices()

const emit = defineEmits(['upData']);

onMounted(async () => {
	await horariServices.fetchAll();
	let listHorarios = await horariServices.getHoriarios();
	tblHorario = $('#tblHorarios').DataTable({
		data: listHorarios.value,
		columns: [
			{ data: 'horarioID', title: 'ID' },
			{ data: 'fecha', title: 'Fecha' },
			{ data: 'horaInicio', title: 'Hora Inicio' },
			{ data: 'horaFin', title: 'Hora Fin' }
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

	tblHorario.on('click', 'tr', async function () {
		let data = tblHorario.row($(this).closest('tr')).data();
		debugger
		let rowSelect = tblHorario.row({ selected: true }).index() === tblHorario.row($(this).closest('tr')).index();
		if (rowSelect == false) {
			let item = data
			emit('upData', item);
		}
	})
})


onUnmounted(() => {
	// Destruye la tabla cuando el componente se desmonta para evitar pérdidas de memoria
	if (tblHorario) {
		tblHorario.destroy();
	}
});

const dtUpdate = (async () => {
	await horariServices.fetchAll();
	let listHorarios = await horariServices.getHoriarios();
	tblHorario.clear().rows.add(listHorarios.value).draw();
})

defineExpose({ dtUpdate });
</script>

<style scoped></style>