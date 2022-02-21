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
                          v-model="Servicio.presupuesto"
                          placeholder="Presupuesto"
                        ></b-form-input>
                      </b-row>
                      <b-row class="mb-2">
                        <b-form-input
                          v-model="Servicio.senia"
                          placeholder="Seña"
                        ></b-form-input>
                      </b-row>
                    </b-col>
                    <b-col v-if="selectedCat == 'celular'" cols="6">
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
                    <b-col v-if="selectedCat == 'notebook'" cols="6">
                      <div class="ml-2">
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedPass"
                            :options="optionsPass"
                          ></b-form-select>
                        </b-row>
                        <b-row class="ml-1 mt-4">
                          <div id="divAccNot">
                            <b-form-checkbox-group
                              id="divNot"
                              v-model="selectedAcc"
                              :options="optionsAccNot"
                              stacked
                            ></b-form-checkbox-group>
                          </div>
                        </b-row>
                      </div>
                    </b-col>
                    <b-col v-if="selectedCat == 'computadora'" cols="6">
                      <div class="ml-2">
                        <b-row class="mb-2">
                          <b-form-select
                            v-model="selectedPass"
                            :options="optionsPass"
                          ></b-form-select>
                        </b-row>
                        <b-row class="ml-1 mt-4">
                          <div id="divAccNot">
                            <b-form-checkbox-group
                              id="divNot"
                              v-model="selectedAcc"
                              :options="optionsAccCom"
                              stacked
                            ></b-form-checkbox-group>
                          </div>
                        </b-row>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row v-if="selectedCat != null" class="mb-2">
                    <b-col cols="6" class="p-0">
                      <b-form-textarea
                        v-model="Servicio.obsProducto"
                        placeholder="Observaciones acerca del servicio"
                      ></b-form-textarea>
                    </b-col>
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
import { mapGetters } from "vuex";
import axios from "axios";
import Patron from "../components/Patron.vue";

export default {
  name: "AddServiceView",

  components: {
    Patron,
  },

  data() {
    return {
      Servicio: {},
      Movement: {},
      Box: {},
      seña: null,
      celular: true,
      estadoVenta: true,
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
      selectedAcc: ["bateria"],
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
        { value: "celular", text: "Celular" },
        { value: "notebook", text: "Notebook" },
        { value: "computadora", text: "Computadora" },
        { value: "parlante", text: "Parlante" },
        { value: "torno", text: "Torno" },
        { value: "monitor", text: "Monitor" },
        { value: "otro", text: "Otro" },
      ],
      selectedPass: null,
      optionsPass: [
        { value: null, text: "Contiene contraseña?" },
        { value: "No", text: "No" },
        { value: "pass", text: "Contraseña" },
        { value: "patron", text: "Patrón" },
      ],
      servicePass: ''
    };
  },

  computed: {
    ...mapGetters(["date", "api", "idBox", "disVenta"]),
  },

  mounted() {
    this.$forceUpdate();
    this.estadoVenta = this.disVenta;
  },

  methods: {
    addService: function () {
      /* this.Servicio.repuesto = 0; */

      this.Servicio.cliente = this.validar(this.Servicio.cliente, "-");
      this.Servicio.telefono1 = this.validar(this.Servicio.telefono1, "-");
      this.Servicio.telefono2 = this.validar(this.Servicio.telefono2, "-");
      this.Servicio.obsCliente = this.validar(this.Servicio.obsCliente, "-");

      this.Servicio.categoria = this.validar(this.Servicio.categoria, "-");
      this.Servicio.marca = this.validar(this.Servicio.marca, "-");
      this.Servicio.motivo = this.validar(this.Servicio.motivo, "-");
      this.Servicio.presupuesto = this.validar(this.Servicio.presupuesto, "0");
      this.Servicio.senia = [this.validar(this.Servicio.senia, "0")];
      this.Servicio.obsProducto = this.validar(this.Servicio.obsProducto, "-");
      this.Servicio.contrasenia = this.Servicio.selectedPass;

      this.Servicio.sim = this.validar(this.selectedSIM, "-");
      this.Servicio.sd = this.validar(this.selectedSD, "-");
      this.Servicio.acc = this.validar(this.selectedAcc, "-");

      this.Servicio.dato1 = [];
      this.Servicio.dato2 = [];
      this.Servicio.dato3 = [];

      this.Servicio.estado = "Sin revisar";
      this.Servicio.pago = "-";
      this.Servicio.obsTecnico = this.validar(this.Servicio.obsTecnico, "-");
      axios.post(this.api + "/api/servicio", this.Servicio).then((res) => {
        if (res.status == 200) {
          this.makeToast();
          console.log(this.Servicio);
          /* this.Movement.usuario = this.validar(
            this.Movement.usuario,
            "Sin definir"
          );
          this.Movement.cliente = this.Servicio.cliente;
          this.Movement.movimiento = this.Servicio.estado;
          this.Movement.motivo = this.Servicio.producto;

          this.seña -= 1;
          this.seña += 1;
          if (this.seña > 0) {
            axios.get(this.api + "/api/caja/" + this.idBox).then((res) => {
              this.Box = res.data;
              this.Box.efectivoS += this.seña;
              axios.put(this.api + "/api/caja", this.Box).then((res) => {
                console.log(res.status);
                console.log("Un exito");
              });
            });
          } */
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