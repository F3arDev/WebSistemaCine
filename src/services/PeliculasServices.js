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
			this.peliculas.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}

	async crearPelicula(x, y, z, w, i, j) {
		const PeliculaData = {
			"duracionMinutos": x,
			"sinopsis": y,
			"titulo": z,
			"genero": w,
			"clasificacion": i,
			"tipo": j
		}
		try {
			const url = 'http://www.sistemacine.somee.com/api/Pelicula/GuardarPelicula';
			const result = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify(PeliculaData)
			});
			const json = await result.json();
			return true
		} catch (error) {
			console.log(error)
		}
	}

	async ActualizarPelicula(x, y, z, w, i, j, k) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Pelicula/ActualizarPelicula/${x}`;
			const result = await fetch(url, {
				method: 'PUT', // Cambiado a PUT
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify({
					"duracionMinutos": y,
					"sinopsis": z,
					"titulo": w,
					"genero": i,
					"clasificacion": j,
					"tipo": k
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

	async EliminarPelicula(x) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Pelicula/EliminarPelicula/${x}`;
			const result = await fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				}
			});
			debugger
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
}

export default PeliculasServices;