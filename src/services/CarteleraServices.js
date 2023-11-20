import { ref } from 'vue'

class carteleraServices {
	cartelera;
	constructor() {
		this.cartelera = ref([])
	}
	getCarteleras() {
		return this.cartelera
	}
	async fetchAll() {
		try {
			const url = 'http://www.sistemacine.somee.com/api/Cartelera/ListarCartelera';
			const result = await fetch(url)
			const json = await result.json();

			this.cartelera.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}
}
export default carteleraServices;