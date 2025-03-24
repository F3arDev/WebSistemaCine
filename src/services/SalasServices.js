import { ref } from 'vue'
import urlDesarrollo from '/src/services/url_global.js'; // Importa la constante urlDesarrollo
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
			const url = `${urlDesarrollo}/api/Sala/ListarSala`;

			const result = await fetch(url)

			const json = await result.json();
			this.salas.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}
	async fetchSalaID(id) {
		try {
			const url = `${urlDesarrollo}/api/Sala/ObtenerSala/${id}`;
			const result = await fetch(url)
			const json = await result.json();
			this.salas.value = await json.sala;
		} catch (error) {
			console.log(error)
		}
	}

	async crearSala(x, y) {
		const SalaData = {
			"numeroSala": x,
			"capacidadAsientos": y
		}
		
		try {
			const url = `${urlDesarrollo}/api/Sala/GuardarSala`;
			const result = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify(SalaData)
			});
			const json = await result.json();
			return true
		} catch (error) {
			console.log(error)
		}
	}

	async EliminarSala(x) {
		try {
			const url = `${urlDesarrollo}/api/Sala/EliminaSala/${x}`;
			const result = await fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				}
			});
			
			if (result.ok) {
				const json = await result.json();
				console.log('Eliminación exitosa:', json);
				return true;
			} else {
				console.log('Error en la eliminación. Código de estado:', result.status);
				// Puedes agregar más lógica según el código de estado, si es necesario
				return false;
			}
		} catch (error) {
			console.log(error)
		}
	}

	async ActualizarSala(x, y, z) {
		try {
			const url = `${urlDesarrollo}/api/Sala/ActualizarSala/${x}`;
			const result = await fetch(url, {
				method: 'PUT', // Cambiado a PUT
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify({
					"numeroSala": y,
					"capacidadAsientos": z
				}) // Ajusta según tus necesidades
			});
			// Verificar el código de estado
			if (result.ok) {
				const json = await result.json();
				console.log('Actualización exitosa:', json);
				return true;
			} else {
				console.log('Error en la actualización. Código de estado:', result.status);
				// Puedes agregar más lógica según el código de estado, si es necesario
				return false;
			}
		} catch (error) {
			console.error('Error en la función ActualizarCartelera:', error);
			return false;
		}
	}
}
export default SalasServices;