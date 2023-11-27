import { ref } from "vue";

class HorarioServices {
	Horarios;

	constructor() {
		this.Horarios = ref([])
	}
	getHoriarios() {
		return this.Horarios
	}
	async fetchAll() {
		try {
			const url = 'http://www.sistemacine.somee.com/api/Horario/ListarHorario';
			const result = await fetch(url)
			const json = await result.json();
			debugger
			this.Horarios.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}
	async crearHorario(x, y, z) {
		const HorarioData = {
			"fecha": x,
			"horaInicio": y,
			"horaFin": z
		}
		try {
			const url = 'http://www.sistemacine.somee.com/api/Horario/GuardarHorario';
			const result = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify(HorarioData)
			});
			const json = await result.json();
			return true
		} catch (error) {
			console.log(error)
		}
	}
	async EliminarHorario(x) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Horario/EliminaHorario/${x}`;
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
	async ActualizarHorario(x, y, z, w) {
		try {
			const url = `http://www.sistemacine.somee.com/api/Horario/ActualizarHorario/${x}`;
			const result = await fetch(url, {
				method: 'PUT', // Cambiado a PUT
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify({
					"fecha": y,
					"horaInicio": z,
					"horaFin": w
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



export default HorarioServices;