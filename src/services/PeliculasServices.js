import { ref } from 'vue'

class PeliculasServices {
	peliculas;
	constructor() {
		this.peliculas = ref([])
	}
	getpeliculas() {
		return this.peliculas
	}
	async fetchAll() {
		try {
			const url = 'http://www.sistemacine.somee.com/api/Pelicula/ListarPeliculas';
			const result = await fetch(url)
			const json = await result.json();
			debugger
			this.peliculas.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}
}

export default PeliculasServices;