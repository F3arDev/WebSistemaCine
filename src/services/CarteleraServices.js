import { ref } from 'vue'
import urlDesarrollo from '/src/services/url_global.js'; // Importa la constante urlDesarrollo
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
			const url = `${urlDesarrollo}/api/Cartelera/ListarCartelera`;
			const result = await fetch(url)
			const json = await result.json();

			this.cartelera.value = await json.carteleras;
			console.log(this.cartelera.value)
		} catch (error) {
			console.log(error)
		}
	}

	async crearCartelera(x, y, z, w) {
		const carteleraData = {
			"descripcion": x,
			"peliculaID": y,
			"horarioID": z,
			"salaID": w
		}
		try {
			const url = `${urlDesarrollo}/api/Cartelera/GuardarCartelera`;
			const result = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify(carteleraData)
			});
			const json = await result.json();
			return true
		} catch (error) {
			console.log(error)
		}
	}

	async EliminarCartelera(x) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Cartelera/EliminaCartelera/${x}`;
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

	async ActualizarCartelera(x, y, z, w, j) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Cartelera/ActualizarCartelera/${x}`;
			const result = await fetch(url, {
				method: 'PUT', // Cambiado a PUT
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify({
					"descripcion": y,
					"peliculaID": z,
					"horarioID": w,
					"salaID": j
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

	async fetchCarterleraID(x) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Cartelera/ObtenerCartelera/${x}`;
			const result = await fetch(url)
			const json = await result.json();
			let data = await json.response;
			return data
		} catch (error) {
			console.log(error)
		}
	}
}
export default carteleraServices;