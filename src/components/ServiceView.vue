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
                    <p class="stlTitulos mt-1">Datos del cliente</p>
                    <p v-if="Servicio.estado != 'Entregado'">
                      <b-btn
                        variant="white"
                        pill
                        size="sm"
                        @click="editCliente = !editCliente"
                      >
                        <b-icon icon="pen" font-scale="1"></b-icon>
                      </b-btn>
                    </p>
                  </div>
                </b-card-title>
                <b-card-body>
                  <b-row class="mb-2">
                    <b-input-group prepend="Nombre ::::">
                      <b-form-input
                        v-model="Servicio.cliente"
                        :disabled="editCliente"
                      ></b-form-input>
                    </b-input-group>
                  </b-row>
                  <b-row class="mb-2">
                    <b-input-group prepend="Telefono 1:">
                      <b-form-input
                        v-model="Servicio.telefono1"
                        :disabled="editCliente"
                      ></b-form-input>
                    </b-input-group>
                  </b-row>
                  <b-row class="mb-2">
                    <b-input-group prepend="Telefono 2:">
                      <b-form-input
                        v-model="Servicio.telefono2"
                        :disabled="editCliente"
                      ></b-form-input>
                    </b-input-group>
                  </b-row>
                  <b-row class="mb-2">
                    <b-input-group prepend="Observaci.:">
                      <b-form-textarea
                        v-model="Servicio.obsCliente"
                        :disabled="editCliente"
                      ></b-form-textarea>
                    </b-input-group>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="8">
              <b-card>
                <b-card-title class="mb-0">
                  <div class="cardTitle">
                    <p class="stlTitulos mt-1">Datos del servicio</p>
                    <p v-if="Servicio.estado != 'Entregado'">
                      <b-btn
                        variant="white"
                        pill
                        size="sm"
                        @click="editServicio = !editServicio"
                      >
                        <b-icon icon="pen" font-scale="1"></b-icon>
                      </b-btn>
                    </p>
                  </div>
                </b-card-title>
                <b-card-body>
                  <b-row>
                    <b-col cols="6">
                      <b-row class="mb-2">
                        <b-input-group prepend="Ingreso :">
                          <b-form-input
                            v-model="Servicio.fechaIn"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2">
                        <b-input-group prepend="Modelo :">
                          <b-form-input
                            v-model="Servicio.marca"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2">
                        <b-input-group prepend="Motivo :">
                          <b-form-input
                            v-model="Servicio.motivo"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2">
                        <b-input-group prepend="Presupuesto :">
                          <b-form-input
                            v-model="Servicio.total"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2">
                        <b-input-group prepend="Tarjeta SIM :">
                          <b-form-input
                            v-model="Servicio.sim"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2">
                        <b-input-group prepend="Memoria SD :">
                          <b-form-input
                            v-model="Servicio.sd"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2">
                        <b-button
                          id="btnObsTecn"
                          variant="dark"
                          block
                          v-b-modal="'modalObsTecn'"
                        >
                          Observaciones técnicas
                        </b-button>
                      </b-row>
                      <b-row class="mb-2">
                        <b-button
                          id="btnObsTecn"
                          variant="primary"
                          block
                          @click="
                            (modalPagos = !modalPagos),
                              mostrarPagos(Servicio.pagos)
                          "
                        >
                          Pagos
                        </b-button>
                      </b-row>
                      <b-row>
                        <b-button
                          variant="info"
                          v-b-modal="'cambiarEstado'"
                        >
                          Cambiar estado
                        </b-button>
                      </b-row>
                    </b-col>
                    <b-col v-if="Servicio.categoria == 'Celular'" cols="6">
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Categoría :">
                          <b-form-input
                            v-model="Servicio.categoria"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Acc :">
                          <b-form-input
                            v-model="Servicio.acc"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <div id="col2">
                        <b-col cols="12">
                          <b-row
                            class="mt-4 ml-4"
                            v-if="Servicio.contrasenia.length > 1"
                          >
                            <Patron
                              :PatronActual="Servicio.contrasenia"
                            ></Patron>
                          </b-row>
                          <b-row
                            class="mb-2"
                            v-if="Servicio.contrasenia.length < 2"
                          >
                            <b-input-group prepend="Contrasenia">
                              <b-form-input
                                :disabled="editServicio"
                                v-model="Servicio.contrasenia[0]"
                              >
                              </b-form-input>
                            </b-input-group>
                          </b-row>
                          <b-row v-if="Servicio.contrasenia.length < 2">
                            <b-input-group prepend="Observación :">
                              <b-form-textarea
                                :disabled="editServicio"
                                v-model="Servicio.obsProducto"
                              >
                              </b-form-textarea>
                            </b-input-group>
                          </b-row>
                        </b-col>
                      </div>
                    </b-col>
                    <b-col v-if="Servicio.categoria == 'Tablet'" cols="6">
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Categoría :">
                          <b-form-input
                            v-model="Servicio.categoria"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Acc :">
                          <b-form-input
                            v-model="Servicio.acc"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <div id="col2">
                        <b-col cols="12">
                          <b-row
                            class="mt-4 ml-4"
                            v-if="Servicio.contrasenia.length > 1"
                          >
                            <Patron
                              :PatronActual="Servicio.contrasenia"
                            ></Patron>
                          </b-row>
                          <b-row
                            class="mb-2"
                            v-if="Servicio.contrasenia.length < 2"
                          >
                            <b-input-group prepend="Contrasenia">
                              <b-form-input
                                :disabled="editServicio"
                                v-model="Servicio.contrasenia[0]"
                              >
                              </b-form-input>
                            </b-input-group>
                          </b-row>
                          <b-row v-if="Servicio.contrasenia.length < 2">
                            <b-input-group prepend="Observación :">
                              <b-form-textarea
                                :disabled="editServicio"
                                v-model="Servicio.obsProducto"
                              >
                              </b-form-textarea>
                            </b-input-group>
                          </b-row>
                        </b-col>
                      </div>
                    </b-col>
                    <b-col v-if="Servicio.categoria == 'Notebook'" cols="6">
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Categoría :">
                          <b-form-input
                            v-model="Servicio.categoria"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Acc :">
                          <b-form-input
                            v-model="Servicio.acc"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <div id="col2">
                        <b-col cols="12">
                          <b-row
                            class="mt-2 ml-4"
                            v-if="Servicio.contrasenia.length > 1"
                          >
                            <Patron
                              :PatronActual="Servicio.contrasenia"
                            ></Patron>
                          </b-row>
                          <b-row
                            class="mb-2"
                            v-if="Servicio.contrasenia.length < 2"
                          >
                            <b-input-group prepend="Contrasenia">
                              <b-form-input
                                :disabled="editServicio"
                                v-model="Servicio.contrasenia[0]"
                              >
                              </b-form-input>
                            </b-input-group>
                          </b-row>
                          <b-row v-if="Servicio.contrasenia.length < 2">
                            <b-input-group prepend="Observación :">
                              <b-form-textarea
                                :disabled="editServicio"
                                v-model="Servicio.obsProducto"
                              >
                              </b-form-textarea>
                            </b-input-group>
                          </b-row>
                        </b-col>
                      </div>
                    </b-col>
                    <b-col v-if="Servicio.categoria == 'Computadora'" cols="6">
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Categoría :">
                          <b-form-input
                            v-model="Servicio.categoria"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <b-row class="mb-2 ml-0">
                        <b-input-group prepend="Acc :">
                          <b-form-input
                            v-model="Servicio.acc"
                            :disabled="editServicio"
                          ></b-form-input>
                        </b-input-group>
                      </b-row>
                      <div id="col2">
                        <b-col cols="12">
                          <b-row
                            class="mt-2 ml-4"
                            v-if="Servicio.contrasenia.length > 1"
                          >
                            <Patron
                              :PatronActual="Servicio.contrasenia"
                            ></Patron>
                          </b-row>
                          <b-row
                            class="mb-2"
                            v-if="Servicio.contrasenia.length < 2"
                          >
                            <b-input-group prepend="Contrasenia">
                              <b-form-input
                                :disabled="editServicio"
                                v-model="Servicio.contrasenia[0]"
                              >
                              </b-form-input>
                            </b-input-group>
                          </b-row>
                          <b-row v-if="Servicio.contrasenia.length < 2">
                            <b-input-group prepend="Observación :">
                              <b-form-textarea
                                :disabled="editServicio"
                                v-model="Servicio.obsProducto"
                              >
                              </b-form-textarea>
                            </b-input-group>
                          </b-row>
                        </b-col>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row v-if="!(Servicio.contrasenia.length < 2)">
                    <b-input-group prepend="Observación :">
                      <b-form-textarea
                        :disabled="editServicio"
                        v-model="Servicio.obsProducto"
                      >
                      </b-form-textarea>
                    </b-input-group>
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

          <!-- Guardar cambios -->
          <b-button
            v-if="!editCliente || !editServicio"
            v-b-modal="'confirmarEdicion'"
            class="mt-3"
            block
            variant="info"
          >
            Guardar cambios
          </b-button>

          <!-- Entregar -->
          <b-button
            v-if="Servicio.estado != 'Entregado'"
            v-b-modal="'finalEntrega'"
            @click="mostrarPagos(Servicio.pagos)"
            class="mt-3"
            block
            variant="success"
            >Entregar</b-button
          >
          
          <b-modal
            v-model="cambiarEstado"
            title="Cambiar estado"
            size="lg"
            centered
            hide-footer
            static
          >
          </b-modal>

          <!-- Pagos -->
          <b-modal
            v-model="modalPagos"
            title="Pagos"
            size="lg"
            centered
            hide-footer
            static
          >
            <b-card>
              <b-table
                id="tablaService"
                :fields="fieldsPagos"
                :items="itemsPagos"
                hover
                striped
                sort-icon-left
              >
              </b-table>

              <b-card-footer class="mt-5">
                <div id="footerPagos">
                  <h5>Total a pagar : ${{ Servicio.total }}</h5>
                  <div id="footerPagos" v-if="Servicio.estado != 'Entregado'">
                    <h5>Faltante: $</h5>
                    <h5 v-if="!(this.faltantePago > 0)">0</h5>
                    <h5 v-if="this.faltantePago > 0">
                      {{ this.faltantePago }}
                    </h5>
                  </div>
                </div>
              </b-card-footer>
            </b-card>

            <b-row v-if="Servicio.estado != 'Entregado'">
              <b-col cols="12">
                <b-button
                  block
                  variant="success"
                  @click="modalAddPago = !modalAddPago"
                  >Agregar Pago</b-button
                >
              </b-col>
            </b-row>
          </b-modal>

          <!-- Agregar Pago -->
          <b-modal
            v-model="modalAddPago"
            title="Agregar pago"
            centered
            hide-footer
            static
          >
            <b-card class="mb-3">
              <div class="mb-3">
                <h6>Metodo de pago:</h6>
                <b-form-select
                  size="lg"
                  v-model="selectedPago"
                  :options="optionsPago"
                  placeholder="Metodo"
                ></b-form-select>
              </div>
              <div class="mb-3">
                <h6>Paga:</h6>
                <b-form-input
                  :disabled="!selectedPago"
                  size="lg"
                  v-model="Seña.pago"
                  placeholder="0"
                >
                </b-form-input>
              </div>
            </b-card>

            <b-row class="mt-4">
              <b-col cols="12">
                <b-button
                  @click="
                    agregarPago(Servicio.pagos, Servicio),
                      (modalAddPago = !modalAddPago)
                  "
                  :disabled="!Seña.pago"
                  block
                  variant="success"
                >
                  Confirmar
                </b-button>
              </b-col>
            </b-row>
          </b-modal>

          <!-- Ultimo Detalle -->
          <b-modal
            id="finalEntrega"
            title="Ultimos detalles"
            centered
            hide-title
            hide-footer
            button-size="block"
          >
            <div>
              <b-card class="mb-3">
                <div class="mb-3">
                  <h6>Total a liquidar:</h6>
                  <b-form-input size="lg" disabled v-model="faltantePago">
                  </b-form-input>
                </div>
                <div class="mb-3">
                  <h6>Metodo de pago:</h6>
                  <b-form-select
                    size="lg"
                    v-model="selectedPago"
                    :options="optionsPago"
                    placeholder="Metodo"
                  ></b-form-select>
                </div>
                <div class="mb-3">
                  <h6>Paga:</h6>
                  <b-form-input
                    :disabled="!selectedPago"
                    size="lg"
                    v-model="paga"
                    placeholder="0"
                  >
                  </b-form-input>
                </div>
              </b-card>
              <div>
                <b-button
                  :disabled="aprobarEntrega()"
                  v-b-modal="'vuelto'"
                  variant="success"
                  block
                >
                  OK
                </b-button>
              </div>
            </div>
          </b-modal>

          <!-- Vuelto -->
          <b-modal
            id="vuelto"
            title="Vuelto"
            centered
            hide-title
            hide-footer
            button-size="block"
          >
            <div>
              <div class="mb-3">
                <h6>Debe darle al cliente:</h6>
                <b-form-input disabled size="lg" :value="vuelto()">
                </b-form-input>
              </div>
              <b-button @click="entregar()" variant="success" block to="/">
                OK
              </b-button>
            </div>
          </b-modal>

          <!-- Seguridad -->
          <b-modal
            id="confirmarEdicion"
            title="Seguridad"
            centered
            hide-title
            hide-footer
          >
            <b-form-input type="password" v-model="passEdicion"></b-form-input>
            <b-button @click="edicion()" class="mt-3" block variant="success"
              >Confirmar</b-button
            >
          </b-modal>

          <!-- Observaciones tecnicas -->
          <b-modal
            id="modalObsTecn"
            title="Observaciones técnicas"
            size="lg"
            centered
            hide-title
            hide-footer
          >
            <b-card
              v-if="
                Servicio.categoria == 'Computadora' ||
                Servicio.categoria == 'Notebook'
              "
            >
              <b-card class="mt-1">
                <h6>Windows:</h6>
                <b-row>
                  <b-col cols="6">
                    <b-input-group prepend="Entra con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6">
                    <b-input-group prepend="Sale con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="mt-1">
                <h6>Disco:</h6>
                <b-row>
                  <b-col cols="6">
                    <b-input-group prepend="Entra con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6">
                    <b-input-group prepend="Sale con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="mt-1">
                <h6>Memoria RAM:</h6>
                <b-row>
                  <b-col cols="6">
                    <b-input-group prepend="Entra con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6">
                    <b-input-group prepend="Sale con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-card>

            <b-card
              v-if="
                Servicio.categoria == 'Celular' ||
                Servicio.categoria == 'Tablet'
              "
            >
              <b-card class="mt-1">
                <h6>Version de Android/IOS:</h6>
                <b-row>
                  <b-col cols="6">
                    <b-input-group prepend="Entra con: ">
                      <b-form-input v-model="Servicio.dato1"></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6">
                    <b-input-group prepend="Sale con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="mt-1">
                <h6>Version de banda base:</h6>
                <b-row>
                  <b-col cols="6">
                    <b-input-group prepend="Entra con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6">
                    <b-input-group prepend="Sale con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="mt-1">
                <h6>IMEI:</h6>
                <b-row>
                  <b-col cols="6">
                    <b-input-group prepend="Entra con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6">
                    <b-input-group prepend="Sale con: ">
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-card>
          </b-modal>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Patron from "../components/Patron.vue";
import moment from "moment";

export default {
  name: "ServiceView",

  components: {
    Patron,
  },

  props: [
    "Servicio",
    // "idServicio",
    // "dateService",
    // "dateModifi",
    // "cliente",
    // "telefono",
    // "presupuesto",
    // "producto",
    // "motivo",
    // "estado",
    // "detalles",
    // "pago",
    // "btnCambiar",
  ],
  data() {
    return {
      modalObsTecn: false,
      passEdicion: "",
      paga: "",
      modalEntregar: false,
      modalAddPago: false,
      Seña: { fecha: "", pago: "", metodo: "" },
      modalPagos: false,
      seleccion: "Sin",
      prePresupuesto: 0,
      opcionesEstado: [
        "Sin revisar",
        "Revisando",
        "Revisado",
        "Listo",
        "Sin solucion",
      ],
      opcionesPago: [
        { value: "Efectivo", text: "Efectivo" },
        { value: "Débito", text: "Débito" },
        { value: "Crédito", text: "Crédito" },
      ],
      flavours: ["SIM", "Funda", "Memoria.", "Caja", "Batería", "Cargador"],
      selected: [],
      Service: { idService: "", estado: "" },
      ServicePre: { idService: "", presupuesto: "" },
      Movement: {},
      Dinero: { prev: 0, descuento: 0, total: 0, pagaCon: 0, vuelto: 0 },
      Box: {},
      metodoPago: "Efectivo",
      estadoVenta: true,
      editCliente: true,
      editServicio: true,
      itemsPagos: [],
      fieldsPagos: [
        { key: "pago", sortable: true },
        { key: "metodo", sortable: true },
        { key: "fecha", sortable: true },
      ],
      selectedPago: null,
      optionsPago: [
        { value: null, text: "Seleccionar Metodo" },
        { value: "Efectivo", text: "Efectivo" },
        { value: "Debito", text: "Debito" },
        { value: "Credito", text: "Credito" },
      ],
      faltantePago: 0,
    };
  },

  computed: {
    actualizar: () => {
      this.metodoPago = this.pago;
      return this.metodoPago;
    },

    ...mapGetters({
      api: "api",
      idBox: "idBox",
      disVenta: "disVenta",
    }),
  },

  mounted() {
    this.estadoVenta = this.disVenta;
  },

  methods: {
    cambiar: function (estado) {
      this.seleccion = estado;
    },

    cambiarEstado: function (id, estado) {
      // if (this.Dinero.vuelto != 0) {
      //     this.Service.presupuesto = this.Dinero.total
      // }
      this.Service.idService = id;
      this.Service.estado = estado;
      this.Service.pago = this.metodoPago;
      axios.put(this.api + "/api/service", this.Service).then((res) => {
        console.log(res.status);
      });
      this.registrarMovimiento(
        estado,
        this.producto,
        this.cliente,
        this.idServicio
      );

      axios.get(this.api + "/api/box/" + this.idBox).then((res) => {
        console.log("----------SERVICIO------------");
        this.Box = res.data;
        let total = this.Dinero.pagaCon;
        total -= 1;
        total += 1;
        if (this.Service.pago == "Efectivo") {
          this.Box.efectivoS += total;
        } else if (this.Service.pago == "Débito") {
          this.Box.debitoS += total;
        } else if (this.Service.pago == "Crédito") {
          this.Box.creditoS += total;
        }
        console.log(this.Box);
        axios.put(this.api + "/api/box", this.Box).then((res) => {
          console.log("Caja actualizada con exito");
          console.log(res.status);
          console.log("==================");
        });
      });
    },

    registrarMovimiento(seleccion, producto, cliente, idServicio) {
      this.Movement.usuario = "-";
      this.Movement.cliente = cliente;
      this.Movement.motivo = producto;
      this.Movement.idMotivo = idServicio;
      this.Movement.movimiento = "Servicio: " + seleccion;

      console.log(this.Movement);

      axios.post(this.api + "/api/movement", this.Movement).then((res) => {
        console.log(res.data);
      });
    },

    igualarTotal: function (subtotal) {
      this.Dinero.total = subtotal - this.Dinero.descuento;
      this.Dinero.pagaCon = subtotal;
    },

    aplicarDescuento: function (prev, subtotal) {
      this.Dinero.descuento = prev;
      this.Dinero.total = subtotal - this.Dinero.descuento;
    },

    mostrar(id, estado) {
      if (this.Dinero.vuelto != 0) {
        console.log("Cambiamos el total");
      } else {
        console.log("No cambiamos el total");
      }
      console.log(id, estado);
    },

    edicion: function () {
      if (this.passEdicion == "2244") {
        axios.put(this.api + "/api/servicio", this.Servicio).then((res) => {
          if (res.status == 200) {
            this.makeToastPago();
          } else {
            this.makeToastnt();
          }
        });
      }
    },

    mostrarPagos(obj) {
      this.itemsPagos = obj;
      let acumulado = 0;
      for (const i of this.Servicio.pagos) {
        acumulado += parseInt(i.pago);
      }
      this.faltantePago = this.Servicio.total - acumulado;
    },

    agregarPago: function (pagos, servicio) {
      let pagosLet = pagos;
      let ServicioFinal = servicio;

      this.Seña.metodo = this.selectedPago;
      this.Seña.fecha = moment().format("YYYY-MM-DD HH:mm:ss");

      pagosLet.push(this.Seña);
      ServicioFinal.pagos = pagosLet;

      console.log("antes");
      axios.put(this.api + "/api/servicio/", ServicioFinal).then((res) => {
        if (res.status == 200) {
          this.makeToastPago();
          this.modalPagos = !this.modalPagos;
          this.Seña = { fecha: "", pago: "", metodo: "" };
        }
      });
    },

    cambiarPresupuesto(id, presupuesto) {
      (this.ServicePre.idService = id),
        (this.ServicePre.presupuesto = parseInt(presupuesto)),
        console.log(this.ServicePre);
      axios.put(this.api + "/api/service", this.ServicePre).then((res) => {
        console.log(res.status);
      });
      this.registrarMovimiento(
        presupuesto,
        this.producto,
        this.cliente,
        this.idServicio
      );
    },

    entregar() {
      let ultPago = {};
      ultPago.pago = this.paga;
      ultPago.metodo = this.selectedPago;
      ultPago.fecha = moment().format("YYYY-MM-DD HH:mm:ss");

      this.Servicio.pagos.push(ultPago);
      this.Servicio.estado = "Entregado";

      axios.get(this.api + "/api/caja/open").then((res) => {
        console.log("----------VENTA------------");
        console.log(res.data);
        this.Box = res.data;
        this.Servicio.total += 1;
        this.Servicio.total -= 1;
        if (this.Servicio.pago == "Efectivo") {
          this.Box.efectivoS += this.Servicio.total;
        } else if (this.Venta.pago == "Débito") {
          this.Box.debitoS += this.Servicio.total;
        } else if (this.Venta.pago == "Crédito") {
          this.Box.creditoS += this.Servicio.total;
        }
        axios.put(this.api + "/api/caja", this.Box).then((res) => {
          console.log("Servicio actualizado con exito");
          console.log(res.status);
          console.log("==================");
        });
      });

      axios.put(this.api + "/api/servicio", this.Servicio).then((res) => {
        if (res.status == 200) {
          this.makeToastPago();
        } else {
          this.makeToastnt();
        }
      });
    },

    aprobarEntrega() {
      if (this.faltantePago - this.paga <= 0) {
        return false;
      } else {
        return true;
      }
    },

    vuelto() {
      return this.paga - this.faltantePago;
    },

    makeToastPago(append = false) {
      this.$bvToast.toast("Se registró con éxito", {
        title: "Registrado!",
        autoHideDelay: 1000,
        variant: "success",
        solid: true,
        appendToast: append,
      });
    },
    makeToastnt(append = false) {
      this.$bvToast.toast("Problemas en registro", {
        title: "Error!",
        autoHideDelay: 1000,
        variant: "danger",
        solid: true,
        appendToast: append,
      });
    },
  },
};
</script>

<style>
.btnCart {
  width: 120px;
}
#containerCart {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.center {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
}
.end {
  height: 20px;
  display: flex;
  justify-content: flex-end;
}
#close {
  margin: 0;
  height: 20px;
}
.contenedorBtnModal {
  display: flex;
  justify-content: space-between;
}
.seleccion {
  display: flex;
  align-items: center;
}
.content {
  display: flex;
  align-content: space-between;
}
#cardCheck {
  height: 100px;
  text-align: center;
}
#flavors {
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
}
#col2 {
  display: flex;
  justify-content: center;
  width: 300px;
}
#footerPagos {
  display: flex;
  justify-content: space-between;
}
</style>