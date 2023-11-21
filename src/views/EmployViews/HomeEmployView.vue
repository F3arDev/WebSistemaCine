<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Inicio</h1>
  </div>

  <div class="row justify-content-center align-items-center g-2">
    <div class="d-grid gap-2">

    </div>
    <div class="col divCard">
      <h5>Facturas</h5>
      <button type="button" class="btn btn-primary m-2">Generar Reporte de Ingresos</button>
      <button type="button" class="btn btn-secondary m-2">Generar Reporte de transaccion</button>
      <button type="button" class="btn btn-info m-2">Generar Reporte de Estadisticas</button>
      <dtFactura />
    </div>
  </div>
</template>

<script setup>
import dtFactura from '../../components/employComponent/dtFactura.vue';
</script>

<style scoped></style>