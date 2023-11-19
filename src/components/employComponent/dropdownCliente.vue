<template>
	<div class="dropdown">
		<button class="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown"
			aria-expanded="false">
			{{ selectedItem || 'Tipo de Cliente' }}
		</button>
		<ul class="dropdown-menu w-100">
			<li v-for="item in dropdownItems" :key="item.id">
				<a class="dropdown-item" @click="selectItem(item)">{{ item.label }}</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const dropdownItems = ref([
	{ id: 1, label: 'Adulto' },
	{ id: 2, label: 'Niño' },
	{ id: 3, label: 'Estudiante' },
	{ id: 4, label: 'Adulto Mayor' },
]);

const selectedItem = ref(null);

const selectItem = (item) => {
	selectedItem.value = item.label;
	console.log(`Item seleccionado: ${item.label} con ID: ${item.id}`);
};
</script>

<style scoped></style>
 