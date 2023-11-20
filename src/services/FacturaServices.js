import { ref } from 'vue'

class FacturaServices {
	facturas;
	facturaID;
	constructor() {
		this.factura = ref([])
		this.facturaID = ref()
	}
	getFacturas() {
		return this.facturas
	}
	getFacturaID() {
		return this.facturaID
	}
	async fetchAll() {
		try {
			const url = 'http://sistemacine.somee.com/api/Cliente/ListarClientes';
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
			const url = 'http://www.sistemacine.somee.com/api/Factura/GuardarFactura'
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
}
export default FacturaServices;
