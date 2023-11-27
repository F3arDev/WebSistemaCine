<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Administrador</h1>
	</div>
	<div class="divCard">
		<h5>Facturas</h5>

		<dtFactura />
	</div>
</template>

<script setup>
import dtFactura from '../../components/employComponent/dtFactura.vue';
</script>

<style scoped></style>