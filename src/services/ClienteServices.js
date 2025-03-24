import { ref } from 'vue'
import urlDesarrollo from '/src/services/url_global.js'; // Importa la constante urlDesarrollo
class ClienteServices {
	cliente;
	constructor() {
		this.cliente = ref([])
	}
	getpeliculas() {
		return this.cliente
	}
	async fetchAll() {
		try {
			const url = `${urlDesarrollo}/api/Cliente/ListarClientes`;
			const result = await fetch(url)
			const json = await result.json();
			this.cliente.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}
}
export default ClienteServices;