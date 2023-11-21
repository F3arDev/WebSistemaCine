<template>
	<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
		<h1 class="h2">Peliculas</h1>
	</div>

	<div class="row justify-content-center align-items-center g-2">
		<div class="col divCard">
			<div class="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
				<button type="button" class="btn btn-primary">Crear</button>
				<button type="button" class="btn btn-success">Actualizar</button>
				<button type="button" class="btn btn-warning">Desabilitar</button>
			</div>

			<DtPeliculas />
		</div>
	</div>
</template>

<script setup>
import DtPeliculas from '../../components/adminComponent/dtsAdmin/dtPeliculas.vue';
</script>

<style scoped></style>