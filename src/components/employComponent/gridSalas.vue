<template>
	<div>
		<h5>Reservar Asiento</h5>
		<div id="seating">
			<section id="middle">
				<div v-for="(seat, index) in seats" :key="index" :class="[seat.class, { 's': seat.selected }]"
					@click="seatSelectionProcess(seat)">
					{{ seat.label }}
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['asiento'])
let reservedSeats;
// const reservedSeats = {
// 	records1: {
// 		seat: "1",

// 	},
// 	records2: {
// 		seat: "4",
// 		owner: {
// 			fname: "Lise C",
// 			lname: "Dugue"
// 		}
// 	},
// 	records3: {
// 		seat: "25",
// 		owner: {
// 			fname: "Ashleyca C.",
// 			lname: "Dugue"
// 		}
// 	},
// 	records4: {
// 		seat: "5",
// 		owner: {
// 			fname: "Roselaine",
// 			lname: "André"
// 		}
// 	}
// };
const seats = ref([]);
const selectedSeats = ref([]);
const makeRows = (sectionLength, array) => {
	let newSeats = [];
	let counter = 1;
	for (let i = 0; i < sectionLength; i++) {
		newSeats.push({ id: counter, label: counter, class: 'a', selected: false });
		counter++;
	}
	seats.value = newSeats;
	reservedSeats = JSON.parse(array)
	reservedSeats.forEach(reservedSeat => {
		const seatIndex = seats.value.findIndex(seat => seat.id === reservedSeat);
		if (seatIndex !== -1) {
			seats.value[seatIndex].class = 'r';
			seats.value[seatIndex].label = 'R';
		}
	});
};


const seatSelectionProcess = (seat) => {
	emits('asiento', seat.id)
	// Desactivar la selección en otros asientos
	seats.value.forEach((otherSeat) => {
		if (otherSeat !== seat) {
			otherSeat.selected = false;
		}
	});
	seat.selected = !seat.selected;
};

const SeatingComponent = (number, reservedSeats) => makeRows(number, reservedSeats);

defineExpose({ SeatingComponent });
</script>

<style scoped>
#seating {
	display: flex;
	justify-content: center;

	/* Esto asegura que el contenedor ocupe al menos el 100% del alto de la pantalla */
}

#seating section {
	display: flex;
	flex-wrap: wrap;
	width: 282px;
	/* Para que los elementos se envuelvan si no caben en una línea */
}

#seating section div {
	flex: 0 0 37px;
	/* Establece el ancho fijo de cada div */
	height: 37px;
	line-height: 32px;
	text-align: center;
	font-size: 10px;
	margin: 5px
}

.a:hover,
.s:hover {
	cursor: pointer;
}

.a {
	background: url(../../assets/icons/chair-a.svg) no-repeat;
	color: #ededed;
}

.a:hover {
	background: url(../../assets/icons/chair-h.svg) no-repeat;
	color: #000;
}

.s {
	background: url(../../assets/icons/chair-s.svg) no-repeat;
}

.r {
	background: url(../../assets/icons/chair-r.svg) no-repeat;
	color: #000;
}
</style>
