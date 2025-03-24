import { ref } from "vue";
import urlDesarrollo from "/src/services/url_global.js"; // Importa la constante urlDesarrollo
class BoletoServices {
  boletos;
  boletosxFactID;
  constructor() {
    this.boletos = ref([]);
    this.boletosxFactID = ref([]);
  }
  getpeliculas() {
    return this.boletos;
  }
  getboletosxFactID() {
    return this.boletosxFactID;
  }
  async fetchAll() {
    try {
      const url = `${urlDesarrollo}/api/Cliente/ListarClientes`;
      const result = await fetch(url);
      const json = await result.json();
      this.boletos.value = await json.response;
    } catch (error) {
      console.log(error);
    }
  }
  async crearBoleto(x, y, z, w) {
    const BoletoData = {
      tipoClienteID: x,
      carteleraID: y,
      facturaID: z,
      numeroAsiento: w,
    };
    try {
      const url = `${urlDesarrollo}/api/Boleto/GuardarBoleto`;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Puedes agregar más encabezados según sea necesario
        },
        body: JSON.stringify(BoletoData),
      });
      const json = await result.json();
      debugger
      if (!json.mensaje == "ok") {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  async fetchBoletoxFactID(id) {
    try {
      const url = `${urlDesarrollo}/api/Boleto/ObtenerBoletoPorFactura/${id}`;
      const result = await fetch(url);
      const json = await result.json();
      if (json.mensaje !== "Ok") {
        this.boletosxFactID.value = [];
      }
      this.boletosxFactID.value = await json.response;
    } catch (error) {
      console.log(error);
    }
  }
}
export default BoletoServices;
