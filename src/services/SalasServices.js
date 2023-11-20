import { ref } from 'vue'

class SalasServices {
	salas;
	constructor() {
		this.salas = ref([])
	}
	getsalas() {
		return this.salas
	}
	async fetchAll() {
		try {
			const url = 'http://www.sistemacine.somee.com/api/Sala/ListarSala';
			const result = await fetch(url)
			const json = await result.json();

			this.salas.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}
	async fetchSalaID(id) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Sala/ObtenerSala/${id}`;
			const result = await fetch(url)
			const json = await result.json();
			this.salas.value = await json.sala;
		} catch (error) {
			console.log(error)
		}
	}
}
export default SalasServices;