class url_global {
  urlDesarrollo;
  urlProduccion;
  constructor() {
    this.urlDesarrollo = "asd";
    this.urlProduccion = "http://www.sistemacine.somee.com";
  }
  geturlDesarrollo() {
    return this.urlDesarrollo;
  }
  geturlProduccion() {
    return this.urlProduccion;
  }
}
export default url_global;
