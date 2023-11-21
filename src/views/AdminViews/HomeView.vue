<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Administrador</h1>
	</div>
	<div class="divCard">
		<h5>Facturas</h5>
		<div class="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
			<button type="button" class="btn btn-primary">Ver</button>
			<button type="button" class="btn btn-danger">Desabilitar</button>
		</div>
		<dtFactura />
	</div>
</template>

<script setup>
import dtFactura from '../../components/adminComponent/dtsAdmin/dtFactura.vue';
</script>

<style scoped></style>