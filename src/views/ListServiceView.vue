<template>
  <b-container>
    <b-card>
      <b-card-title>
        <b-row>
          <b-col cols="4">
            <h3>Servicios Técnicos</h3>
          </b-col>
          <b-col cols="2">
            <b-button-group>
              <b-button
                size="sm"
                :variant="varianteSE"
                @click="filtrarSE('name'), cambiarVariante(varianteSE)"
              >
                S/E
              </b-button>
              <b-button
                size="sm"
                :variant="varianteTodos"
                @click="llenarTabla(''), cambiarVariante(varianteTodos)"
              >
                Todos
              </b-button>
            </b-button-group>
          </b-col>
          <b-col cols="6">
            <b-input-group>
              <b-form-input
                v-model="buscar"
                type="search"
                id="buscarEntrada"
                placeholder="Nombre del Cliente"
              >
              </b-form-input>
              <b-input-group-append>
                <b-button @click="buscarEnTabla()">Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card-title>
      <div class="tableService">
        <div>
          <b-table
            id="tablaService"
            :fields="fields"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hover
            striped
            sort-icon-left
          >
            <template v-slot:cell(fechaIn)="row">
              <div>
                {{fechaServicio(row.item)}}
              </div>
            </template>
            <template v-slot:cell(acciones)="row">
              <b-button
                id="btnEstado"
                :variant="color(row.item.estado)"
                @click="editService(row.item), (editarShow = !editarShow)"
                size="sm"
              >
                {{ row.item.estado }}
              </b-button>
            </template>
          </b-table>
        </div>
        <Loader v-if="onLoader"></Loader>
        <div id="pag">
          <b-pagination
            aria-controls="tablaService"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          >
          </b-pagination>
        </div>
      </div>
    </b-card>
    <b-modal
      v-model="editarShow"
      centered
      hide-header
      hide-footer
      size="xl"
      static
    >
      <ServiceView
        :Servicio="SERVICIO"
      >
      </ServiceView>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ServiceView from "../components/ServiceView";
import Loader from "../components/Loader.vue";

export default {
  name: "ListServiceView",

  data() {
    return {
      fields: [
        { key: "fechaIn", label: 'Fecha', sortable: true, class: "text-center" },
        { key: "cliente", sortable: true },
        { key: "total", label: "Monto", sortable: true },
        { key: "marca", label: 'Producto', sortable: true },
        { key: "motivo", sortable: true },
        { key: "acciones", class: "text-center" },
      ],
      onLoader: true,
      items: [],
      buscar: "",
      itemsRecord: [],
      editarShow: false,
      entregarShow: false,
      perPage: 10,
      currentPage: 1,
      sortBy: "fechaIn",
      sortDesc: true,

      conection: true,

      idServicio: 0,
      dateService: "",
      dateModifi: "",
      cliente: "",
      telefono: "",
      presupuesto: "",
      producto: "",
      motivo: "",
      estado: "",
      detalles: "",
      pago: "",
      btnCambiar: false,
      varianteSE: "outline-primary",
      varianteTodos: "primary",

      SERVICIO: {},

      arrayprueba: [
        { name: "jose", age: 23 },
        { name: "Manuel", age: 10 },
        { name: "juan", age: 30 },
      ],
    };
  },

  components: { ServiceView, Loader },

  computed: {
    ...mapGetters(["api"]),
    rows() {
      return this.items.length;
    },
  },

  mounted() {
    this.$forceUpdate();
    axios.get(this.api + "/api/servicio").then((res) => {
      this.items = res.data;
      this.itemsRecord = res.data;
      this.onLoader = false;
    });
  },

  methods: {
    fechaServicio(item){
      if(item.fechaIn){
        let dateServicio = new Date(item.fechaIn).toLocaleString().split(',', 1)[0]
        return dateServicio
      }
    },

    color(item) {
      let color = "";
      switch (item) {
        case "Sin revisar":
          color = "danger";
          break;
        case "Revisando":
          color = "info";
          break;
        case "Revisado":
          color = "info";
          break;
        case "Sin solucion":
          color = "secondary";
          break;
        case "Listo":
          color = "warning";
          break;
        case "Entregado":
          color = "success";
          break;
      }
      return color;
    },
    editService: function (Service) {
      this.SERVICIO = Service
      // this.idServicio = Service.idServicio;
      // this.dateService = Service.createdAt;
      // this.dateModifi = Service.updatedAt;
      // this.cliente = Service.cliente;
      // this.telefono = Service.telefono;
      // this.presupuesto = Service.presupuesto;
      // this.producto = Service.producto;
      // this.motivo = Service.motivo;
      // this.estado = Service.estado;
      // this.detalles = Service.detalles;
      // this.pago = Service.pago;
      if (this.estado == "Entregado") {
        this.btnCambiar = true;
      } else {
        this.btnCambiar = false;
      }
    },
    cambiarVariante: function (valor) {
      if (valor !== "primary") {
        var suplente = this.varianteSE;
        this.varianteSE = this.varianteTodos;
        this.varianteTodos = suplente;
      }
    },
    ////////////////////////////////////////////
    ////////////BUSQUEDA EN TABLA///////////////
    buscarEnTabla: function () {
      let dato = "";
      if (this.buscar != "") {
        dato = this.compararBusqueda(this.buscar, this.itemsRecord);
      }
      this.llenarTabla(dato);
    },
    compararBusqueda: function (valor, items) {
      var Coincidencias = [];

      for (let i = 0; i < items.length; i++) {
        var name = items[i].producto.toLowerCase();
        var cliente = items[i].cliente.toLowerCase();

        if (name.includes(valor)) {
          Coincidencias.push(items[i]);
        } else if (cliente.includes(valor)) {
          Coincidencias.push(items[i]);
        }
      }

      return Coincidencias;
    },
    llenarTabla: function (data) {
      if (data === "") {
        this.items = this.itemsRecord;
      } else {
        this.items = data;
      }
    },

    filtrarSE: function () {
      this.items = this.items.filter((item) => item.estado !== "Entregado");
    },
    ////////////BUSQUEDA EN TABLA///////////////
    ////////////////////////////////////////////
  },
};
</script>

<style>
.tableService {
  display: flex;
  flex-direction: column;
  align-content: center;
}
#pag {
  height: 40px;
  display: flex;
  align-self: center;
}
#btnEstado {
  width: 100px;
}
</style>