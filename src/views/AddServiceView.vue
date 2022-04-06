<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col cols="12">
        <b-card>
          <b-card-title class="">
            <div class="cardTitle">
              <h4>Nueva orden de servicio</h4>
            </div>
          </b-card-title>
          <b-row>
            <b-col cols="4">
              <b-card>
                <b-card-title class="mb-0">
                  <div class="cardTitle">
                    <p class="stlTitulos">Datos del cliente</p>
                  </div>
                </b-card-title>
                <b-card-body>
                  <b-row class="mb-2">
                    <b-form-input
                      v-model="Servicio.cliente"
                      placeholder="Nombre/Apellido"
                    ></b-form-input>
                  </b-row>
                  <b-row class="mb-2">
                    <b-form-input
                      v-model="Servicio.telefono1"
                      placeholder="Telefono 1"
                    ></b-form-input>
                  </b-row>
                  <b-row class="mb-2">
                    <b-form-input
                      v-model="Servicio.telefono2"
                      placeholder="telefono 2"
                    ></b-form-input>
                  </b-row>
                  <b-row class="mb-2">
                    <b-form-input
                      v-model="Servicio.obsCliente"
                      placeholder="Observaciones acerca del cliente"
                    ></b-form-input>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="8">
              <b-card>
                <b-card-title class="mb-0">
                  <div class="cardTitle">
                    <p class="stlTitulos">Datos del servicio</p>
                  </div>
                </b-card-title>
                <b-card-body>
                  <b-row class="mb-2">
                    <b-form-select
                      v-model="selectedCat"
                      :options="optionsCat"
                    ></b-form-select>
                  </b-row>
                  <b-row v-if="selectedCat != null">
                    <b-col cols="6">
                      <b-row class="mb-2">
                        <b-form-input
                          v-model="Servicio.marca"
                          placeholder="Marca/Modelo"
                        ></b-form-input>
                      </b-row>
                      <b-row class="mb-2">
                        <b-form-input
                          v-model="Servicio.motivo"
                          placeholder="Defecto/Motivo"
                        ></b-form-input>
                      </b-row>
                      <b-row class="mb-2">
                        <b-form-input
                          v-model="Servicio.total"
                          placeholder="Presupuesto"
                        ></b-form-input>
                      </b-row>
                      <b-row v-if="selectedCat != null" class="mb-2">
                        <b-col cols="12" class="p-0">
                          <b-form-textarea
                            v-model="Servicio.obsProducto"
                            placeholder="Observaciones acerca del servicio"
                          ></b-form-textarea>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col v-if="selectedCat == 'Celular'" cols="6">
                      <div class="ml-2">
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedSIM"
                            :options="optionsSIM"
                          ></b-form-select>
                        </b-row>
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedSD"
                            :options="optionsSD"
                          ></b-form-select>
                        </b-row>
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedPass"
                            :options="optionsPass"
                          ></b-form-select>
                        </b-row>
                        <b-row>
                          <div id="divAcc">
                            <b-form-checkbox-group
                              v-model="selectedAcc"
                              :options="optionsAccCel"
                            ></b-form-checkbox-group>
                            <div v-if="selectedPass == 'patron'">
                              <Patron></Patron>
                            </div>
                            <div v-if="selectedPass == 'pass'">
                              <b-card>
                                <b-card-header class="pt-0">
                                  Ingrese contraseña:
                                </b-card-header>
                                <b-form-input v-model="servicePass">
                                </b-form-input>
                              </b-card>
                            </div>
                          </div>
                        </b-row>
                      </div>
                    </b-col>
                    <b-col v-if="selectedCat == 'Tablet'" cols="6">
                      <div class="ml-2">
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedSIM"
                            :options="optionsSIM"
                          ></b-form-select>
                        </b-row>
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedSD"
                            :options="optionsSD"
                          ></b-form-select>
                        </b-row>
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedPass"
                            :options="optionsPass"
                          ></b-form-select>
                        </b-row>
                        <b-row>
                          <div id="divAcc">
                            <b-form-checkbox-group
                              v-model="selectedAcc"
                              :options="optionsAccCel"
                            ></b-form-checkbox-group>
                            <div v-if="selectedPass == 'patron'">
                              <Patron></Patron>
                            </div>
                            <div v-if="selectedPass == 'pass'">
                              <b-card>
                                <b-card-header class="pt-0">
                                  Ingrese contraseña:
                                </b-card-header>
                                <b-form-input v-model="servicePass">
                                </b-form-input>
                              </b-card>
                            </div>
                          </div>
                        </b-row>
                      </div>
                    </b-col>
                    <b-col v-if="selectedCat == 'Notebook'" cols="6">
                      <div class="ml-2">
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedPass"
                            :options="optionsPass"
                          ></b-form-select>
                        </b-row>
                        <b-row id="divAccNot" class="mt-2">
                          <div>
                            <b-form-checkbox-group
                              id="divNot"
                              class="mr-5"
                              v-model="selectedAcc"
                              :options="optionsAccNot"
                              stacked
                            ></b-form-checkbox-group>
                            <div v-if="selectedPass == 'pass'">
                              <b-card>
                                <b-card-header class="pt-0 pb-1">
                                  Ingrese contraseña:
                                </b-card-header>
                                <b-form-input v-model="servicePass">
                                </b-form-input>
                              </b-card>
                            </div>
                          </div>
                        </b-row>
                      </div>
                    </b-col>
                    <b-col v-if="selectedCat == 'Computadora'" cols="6">
                      <div class="ml-2">
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedPass"
                            :options="optionsPass"
                          ></b-form-select>
                        </b-row>
                        <b-row id="divAccNot" class="mt-2">
                          <div>
                            <b-form-checkbox-group
                              id="divNot"
                              class="ml-2"
                              v-model="selectedAcc"
                              :options="optionsAccCom"
                              stacked
                            ></b-form-checkbox-group>
                            <div v-if="selectedPass == 'pass'">
                              <b-card>
                                <b-card-header class="pt-0 pb-1">
                                  Ingrese contraseña:
                                </b-card-header>
                                <b-form-input v-model="servicePass">
                                </b-form-input>
                              </b-card>
                            </div>
                          </div>
                        </b-row>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-button
                      id="btnObsTecn"
                      variant="info"
                      block
                      @click="modalPagos = !modalPagos"
                    >
                      - Seña - {{ Seña.pago }} {{ Seña.metodo }}
                    </b-button>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
          <!-- <b-card>
            <b-card-title class="ml-2 mb-3">
              <h6>Datos del Cliente</h6>
            </b-card-title>
            <b-row>
              <b-col cols="6">
                <b-form-input
                  v-model="Servicio.cliente"
                  placeholder="Nombre"
                ></b-form-input>
              </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="Servicio.telefono"
                  placeholder="Teléfono"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-card>
          <b-card class="mt-3">
            <b-card-title class="ml-2">
              <h6>Datos del Producto</h6>
            </b-card-title>
            <b-row class="mt-4">
              <b-col cols="6">
                <b-form-input
                  v-model="Servicio.producto"
                  placeholder="Producto (Marca y Modelo)"
                ></b-form-input>
              </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="Servicio.categoria"
                  placeholder="Categoría del producto"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="6">
                <b-form-input
                  v-model="Servicio.motivo"
                  placeholder="Ingresa por"
                ></b-form-input>
              </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="Servicio.presupuesto"
                  placeholder="Presupuesto"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="12">
                <b-form-input
                  type="number"
                  v-model="seña"
                  placeholder="Seña"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="12">
                <b-form-input
                  v-model="Servicio.detalles"
                  placeholder="Detalles"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-card> -->

          <!-- :disabled="estadoVenta" -->

          <b-modal
            v-model="modalPagos"
            title="Seña"
            centered
            hide-footer
            static
          >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  v-model="Seña.pago"
                  placeholder="Seña"
                ></b-form-input>
              </b-col>
              <b-col cols="6">
                <b-form-select
                  v-model="selectedSeña"
                  :options="optionsSeña"
                  placeholder="Metodo"
                ></b-form-select>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="12">
                <b-button
                  @click="agregarSeña(), (modalPagos = !modalPagos)"
                  block
                  variant="success"
                >
                  Confirmar
                </b-button>
              </b-col>
            </b-row>
          </b-modal>

          <b-button
            to="/"
            @click="addService()"
            class="mt-3"
            block
            variant="success"
            >Confirmar</b-button
          >
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Patron from "../components/Patron.vue";

export default {
  name: "AddServiceView",

  components: {
    Patron,
  },

  data() {
    return {
      passModal: true,
      modalPagos: false,
      time: "",
      Servicio: {},
      Movement: {},
      Box: {},
      seña: null,
      celular: true,
      estadoVenta: true,
      Seña: { fecha: "", pago: "", metodo: "" },
      selectedSeña: null,
      optionsSeña: [
        { value: null, text: "Seleccionar Metodo" },
        { value: "Efectivo", text: "Efectivo" },
        { value: "Debito", text: "Débito" },
        { value: "Credito", text: "Crédito" },
      ],
      selectedSIM: null,
      optionsSIM: [
        { value: null, text: "Contiene tarjeta SIM?" },
        { value: "No", text: "No" },
        { value: "Claro", text: "Claro" },
        { value: "Personal", text: "Personal" },
        { value: "Movistar", text: "Movistar" },
        { value: "Otro", text: "Otro" },
      ],
      selectedSD: null,
      optionsSD: [
        { value: null, text: "Contiene memoria SD?" },
        { value: "No", text: "No" },
        { value: "2GB", text: "2GB" },
        { value: "4GB", text: "4GB" },
        { value: "8GB", text: "8GB" },
        { value: "16GB", text: "16GB" },
        { value: "32GB", text: "32GB" },
        { value: "64GB", text: "64GB" },
        { value: "128GB", text: "128GB" },
      ],
      selectedAcc: [],
      optionsAccCel: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "funda" },
      ],
      optionsAccNot: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "Funda" },
        { text: "Cargador/Cable", value: "cable" },
      ],
      optionsAccCom: [{ text: "Cargador/Cable", value: "cable" }],
      optionsAccCon: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "Funda" },
      ],
      optionsAccJoy: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "Funda" },
      ],
      optionsAccPar: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "Funda" },
      ],
      optionsAccTor: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "Funda" },
      ],
      optionsAccMon: [
        { text: "Batería", value: "bateria" },
        { text: "Funda", value: "Funda" },
      ],

      selectedCat: null,
      optionsCat: [
        { value: null, text: "Categoría" },
        { value: "Celular", text: "Celular" },
        { value: "Tablet", text: "Tablet" },
        { value: "Notebook", text: "Notebook" },
        { value: "Computadora", text: "Computadora" },
        { value: "Parlante", text: "Parlante" },
        { value: "Torno", text: "Torno" },
        { value: "Monitor", text: "Monitor" },
        { value: "Otro", text: "Otro" },
      ],
      selectedPass: null,
      optionsPass: [
        { value: null, text: "Contiene contraseña?" },
        { value: "no", text: "No" },
        { value: "pass", text: "Contraseña" },
        { value: "patron", text: "Patrón" },
      ],
      servicePass: "",
    };
  },

  computed: {
    ...mapGetters(["date", "api", "idBox", "disVenta", "patron"]),
  },

  mounted() {
    this.$forceUpdate();
    this.estadoVenta = this.disVenta;
  },

  methods: {
    ...mapActions(["changePatron"]),

    addService: function () {
      /* this.Servicio.repuesto = 0; */

      this.Servicio.cliente = this.validar(this.Servicio.cliente, "-");
      this.Servicio.telefono1 = this.validar(this.Servicio.telefono1, "-");
      this.Servicio.telefono2 = this.validar(this.Servicio.telefono2, "-");
      this.Servicio.obsCliente = this.validar(this.Servicio.obsCliente, "-")

      this.Servicio.categoria = this.validar(this.selectedCat, "-");
      this.Servicio.marca = this.validar(this.Servicio.marca, "-");
      this.Servicio.motivo = this.validar(this.Servicio.motivo, "-");
      this.Servicio.total = this.validar(this.Servicio.total, "0");
      this.Servicio.obsProducto = this.validar(this.Servicio.obsProducto, "-");
      this.Servicio.contrasenia = this.validarPass(this.selectedPass);

      this.Servicio.pagos = [];
      if (this.Seña.pago != "") {
        this.Seña.fecha = new Date();
        this.Servicio.pagos = this.Seña;
      }

      this.Servicio.sim = this.validar(this.selectedSIM, "-");
      this.Servicio.sd = this.validar(this.selectedSD, "-");
      this.Servicio.acc = this.validar(this.selectedAcc, "-");

      this.Servicio.dato1 = [{ dato: "" }, { dato: "" }];
      this.Servicio.dato2 = [{ dato: "" }, { dato: "" }];
      this.Servicio.dato3 = [{ dato: "" }, { dato: "" }];

      this.Servicio.estado = "Sin revisar";
      this.Servicio.obsTecnico = this.validar(this.Servicio.obsTecnico, "-");

      this.Servicio.fechaIn = new Date();
      this.Servicio.fechaOut = new Date();

      axios.post(this.api + "/api/servicio", this.Servicio).then((res) => {
        if (res.status == 200) {
          this.makeToast();
          this.changePatron("");
          /* this.Movement.usuario = this.validar(
            this.Movement.usuario,
            "Sin definir"
          );
          this.Movement.cliente = this.Servicio.cliente;
          this.Movement.movimiento = this.Servicio.estado;
          this.Movement.motivo = this.Servicio.producto;

          } */
          this.Seña.pago -= 1;
          this.Seña.pago += 1;
          if (this.Seña.pago > 0) {
            axios.get(this.api + "/api/caja/open").then((res) => {
              this.Box = res.data;
              switch (this.Seña.metodo) {
                case 'Debito':
                  this.Box.debitoS += this.Seña.pago
                  break;
                case 'Credito':
                  this.Box.creditoS += this.Seña.pago
                  break;
                case 'Efectivo':
                  this.Box.efectivoS += this.Seña.pago
                  break;
              }
              console.log('Recibimos box y sumamos la seña: ', this.Box)
              axios.put(this.api + "/api/caja", this.Box).then((res) => {
                console.log(res.status);
                console.log("Un exito");
              });
            });
          }
        } else {
          this.makeToastError;
        }
      });

      /* axios.post(this.api + "/api/movement", this.Movement).then((res) => {
        console.log(res.data);
      }); */
    },

    validar: function (validar, def) {
      if (validar == undefined) {
        return def;
      } else {
        return validar;
      }
    },

    validarPass: function (pass) {
      if (pass == "patron") {
        return this.patron;
      } else if (pass == "pass") {
        return this.servicePass;
      } else if (pass == "no") {
        return "No registró contraseña";
      }
    },

    agregarSeña: function () {
      this.Seña.metodo = this.selectedSeña;
    },

    makeToast(append = false) {
      this.$bvToast.toast("El Servicio se registró con éxito", {
        title: "Servicio registrado!",
        autoHideDelay: 1500,
        variant: "success",
        solid: true,
        appendToast: append,
      });
    },
    makeToastError(append = false) {
      this.$bvToast.toast("Posiblemente uno de los datos está mal cargado", {
        title: "Error al registrar el Servicio",
        autoHideDelay: 2000,
        variant: "warning",
        solid: true,
        appendToast: append,
      });
    },
  },
};
</script>

<style>
#divAcc {
  display: block;
  align-items: center;
  justify-content: center;
  padding: 0px;
  height: 38px;
  width: 100%;
}
#divNot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  height: 38px;
  width: 100%;
}
#divAccNot {
  display: flex;
  flex-direction: column;
}
.cardTitle {
  display: flex;
  justify-content: center;
}
.stlTitulos {
  font-size: 20px;
}
.cardCategoria {
  display: flex;
  justify-items: center;
}
</style>