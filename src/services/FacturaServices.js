import { ref } from 'vue'
import urlDesarrollo from '/src/services/url_global.js'; // Importa la constante urlDesarrollo

class FacturaServices {
	facturas;
	facturaID;
	facturasXID;
	constructor() {
		this.factura = ref([])
		this.facturaID = ref()
		this.facturasXID = ref([])
	}
	getFacturas() {
		return this.factura
	}
	getFacturaID() {
		return this.facturaID
	}
	getfacturasXID() {
		return this.facturasXID
	}
	async fetchAll() {
		try {
			const url = `${urlDesarrollo}/api/Factura/ListarFactura`;
			const result = await fetch(url)
			const json = await result.json();
			this.factura.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}

	async crearFactura() {
		const facturaData = {
			"usuarioID": '1',
			"clienteID": '1'
		}
		try {
			const url = `${urlDesarrollo}/api/Factura/GuardarFactura`
			const result = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// Puedes agregar más encabezados según sea necesario
				},
				body: JSON.stringify(facturaData)
			});
			const json = await result.json();
			if (!json.mensaje == 'ok') {
				throw new Error('Error en la solicitud');
			}
			this.facturaID.value = await json.facturaID;
			return json.facturaID
		} catch (error) {
			console.error('Error:', error.message);
		}
	}

	async fetchFacturaID(id) {
		try {
			const url = `${urlDesarrollo}/api/Factura/ObtenerFactura/${id}`;
			const result = await fetch(url)
			const json = await result.json();
			this.facturasXID.value = await json.response;
		} catch (error) {
			console.log(error)
		}
	}

}
export default FacturaServices;
