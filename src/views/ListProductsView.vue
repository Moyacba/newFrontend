<template>
  <b-container class="mt-4">
    <b-card class="mb-4">
      <b-card-title>
        <b-row>
          <b-col cols="6">
            <h3>Productos</h3>
          </b-col>
          <b-col cols="6">
            <b-input-group>
              <b-form-input
                v-model="buscar"
                type="search"
                id="buscarEntrada"
                placeholder="Nombre del Producto"
              >
              </b-form-input>
              <b-input-group-append>
                <b-button @click="buscarEnTabla()">Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card-title>

      <!-- <div>
                <div>
                    <b-button size="sm" @click="gastototal()"> Calcular </b-button>
                    Total en productos: {{this.totalGastado}}
                </div>
            </div> -->

      <div id="tableProducts">
        <div>
          <b-table
            id="tablaProductos"
            :items="products"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hover
            striped
            sort-icon-left
          >
            <template v-slot:cell(fecha)="row">
              <div>
                {{ fechaProducto(row.item) }}
              </div>
            </template>
            <template v-slot:cell(Acciones)="row">
              <div class="actionsBut">
                <b-button
                  variant="primary"
                  size="sm"
                  @click="editShow(row.item)"
                >
                  Ver
                </b-button>
                <b-button
                  :disabled="estado"
                  class="ml-1"
                  variant="success"
                  size="sm"
                  @click="addProductToCart(row.item)"
                >
                  Agregar
                </b-button>
                <b-button
                  v-b-modal="'actualizarProducto'"
                  @click="antesActProducto(row.item)"
                >
                  UwU
                </b-button>
              </div>
            </template>
          </b-table>
        </div>

        <Loader v-if="onLoader"></Loader>

        <div id="pag">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="tablaProductos"
          >
          </b-pagination>
        </div>
      </div>
    </b-card>
    <b-modal
      v-model="itemShow"
      centered
      scrollable
      title="Datos del Producto"
      hide-footer
      size="xl"
    >
      <ProductView :Producto="productEdit"> </ProductView>
    </b-modal>
    <b-modal
      id="actualizarProducto"
      centered
      size="md"
      hide-footer
      title="Agregar codigo nuevo"
    >
      <b-form-input autofocus v-model="codigonuevo"></b-form-input>
      <b-button
        class="mt-4"
        variant="success"
        @click="actProducto(), $bvModal.hide('actualizarProducto')"
      >
        OK
      </b-button>
    </b-modal>
  </b-container>
</template>

<script>
import ProductView from "../components/ProductView";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Loader from "../components/Loader.vue";

export default {
  name: "ListProductsView",

  components: { ProductView, Loader },

  data() {
    return {
      fields: [
        // { key: "codigo", label: "Código", sortable: true },
        // { key: "articulo[0].categoria", label:"Categoría", sortable: true },
        // { key: "articulo[0].producto", label:"Producto", sortable: true },
        // {
        //   key: "articulo[0].precioVenta",
        //   label: "Precio",
        //   sortable: true,
        //   class: "text-center",
        // },
        // { key: "articulo[0].stock", label:"Stock", sortable: true, class: "text-center" },
        // { key: "Acciones", class: "text-center" },

        ////////////////////////////////////////////////////////////////////////

        { key: "codigo", label: "Código", sortable: true },
        { key: "categoria", label:"Categoría", sortable: true },
        { key: "producto", label:"Producto", sortable: true },
        {
          key: "precioVenta",
          label: "Precio",
          sortable: true,
          class: "text-center",
        },
        { key: "stock", label:"Stock", sortable: true, class: "text-center" },
        { key: "Acciones", class: "text-center" },
      ],
      onLoader: true,
      perPage: 10,
      currentPage: 1,
      sortBy: "",
      sortDesc: true,
      itemsRecord: [],
      products: [],
      buscar: "",
      itemShow: false,
      productEdit: {},
      totalGastado: 0,
      estado: true,
      productonuevo: {},
      codigonuevo: "",
    };
  },
  computed: {
    ...mapGetters({
      cart: "cart",
      api: "api",
      disVenta: "disVenta",
    }),
    rows() {
      return this.products.length;
    },
  },

  mounted() {
    this.$forceUpdate();
    axios.get(this.api + '/' + this.$suc.value + "/api/producto").then((res) => {
      this.products = res.data;
      this.itemsRecord = res.data;
      this.onLoader = false;
    });
    this.estado = this.aprovVenta();
  },

  methods: {
    antesActProducto(prod) {
      this.productonuevo = prod;
      console.log(this.productonuevo);
    },

    async actProducto() {
      delete this.productonuevo.codigo;
      this.productonuevo.fecha = new Date();
      let obj = {
        codigo: this.codigonuevo,
        articulo: this.productonuevo,
      };

      await axios.post(this.api + '/' + this.$suc.value + "/api/producto/", obj).then((res) => {
        console.log(res.status);
        // if (res.status == 200) {
        //   this.makeToast();
        //   /* this.registrarMovimiento(this.Producto); */
        // } else {
        //   this.makeToastError();
        // }
      });

      this.codigonuevo = ''
    },

    fechaProducto(item) {
      if (item.fecha) {
        let dateProducto = new Date(item.fecha)
          .toLocaleString()
          .split(",", 1)[0];
        return dateProducto;
      }
    },
    ...mapActions(["addToCart"]),

    editShow: function (item) {
      this.productEdit = item;
      this.itemShow = !this.itemShow;
    },
    ///////////////////////////////////////////
    ////////////AGREGAR VENTA//////////////////

    addProductToCart: function (product) {
      if (product.stock > 0) {
        product.stock = product.stock - 1;
        this.addToCart(product);
      }
    },
    ////////////AGREGAR VENTA//////////////////
    ////////////////////////////////////////////

    ////////////////////////////////////////////
    ////////////BUSQUEDA EN TABLA///////////////
    buscarEnTabla: function () {
      let dato = "";
      let busqueda = parseInt(this.buscar);
      if (this.buscar != "") {
        if (busqueda) {
          dato = this.compararBusqueda(busqueda, this.itemsRecord, "number");
        } else {
          dato = this.compararBusqueda(this.buscar, this.itemsRecord, "text");
        }
      }
      /* if (this.buscar != "") {
        dato = this.compararBusqueda(this.buscar, this.itemsRecord);
      } */
      this.llenarTabla(dato);
    },

    compararBusqueda: function (valorUp, tabla, opcion) {
      let valor = valorUp.toLowerCase()
      var Coincidencias = [];
      if (opcion == "number") {
        for (let i = 0; i < tabla.length; i++) {
          var number = tabla[i].codigo;
          if (number === valor) {
            Coincidencias.push(tabla[i]);
          }
        }
      } else {
        for (let i = 0; i < tabla.length; i++) {
          if (tabla[i].articulo == undefined) {
            var name = tabla[i].producto;
            if (name.toLowerCase().includes(valor)) {
              Coincidencias.push(tabla[i]);
            }
          }
        }
      }
      /* 
        var name = tabla[i].variabel;
        if (name === parseInt(valor)) {
          Coincidencias.push(tabla[i]);
        }
      } */

      return Coincidencias;
    },
    llenarTabla: function (data) {
      if (data === "") {
        this.products = this.itemsRecord;
      } else {
        this.products = data;
      }
    },
    ////////////BUSQUEDA EN TABLA///////////////
    ////////////////////////////////////////////
    gastototal() {
      let total = 0;
      for (const item of this.products) {
        if (item.stock < 300) {
          if (item.stock > 0) {
            total = total + item.precioVenta * item.stock;
          }
        }
      }
      this.totalGastado = total;
    },

    aprovVenta: function () {
      return this.disVenta;
    },
  },
};
</script>

<style>
.actionsBut {
  display: flex;
}
#tableProducts {
  display: flex;
  flex-direction: column;
  align-content: center;
}
#pag {
  height: 40px;
  display: flex;
  align-self: center;
}
</style>