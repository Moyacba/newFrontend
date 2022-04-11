<template>
  <b-container class="mt-4">
    <b-card class="mb-4">
      <b-card-title>
        <b-row>
          <b-col cols="6">
            <h3>Compras</h3>
          </b-col>
          <!-- <b-col cols="6">
                        <b-input-group>
                            <b-form-input 
                            v-model="buscar" 
                            type="search" 
                            id="buscarEntrada" 
                            placeholder="Nombre del Producto">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button @click="buscarEnTabla()">Buscar</b-button>
                        </b-input-group-append>
                        </b-input-group>
                    </b-col> -->
        </b-row>
      </b-card-title>

      <!-- <div>
                <div>
                    <b-button size="sm" @click="gastototal()"> Calcular </b-button>
                    Total Gastado: {{this.totalGastado}}
                </div>
            </div> -->
      <div id="tableProducts">
        <div>
          <b-table
            :items="purchases"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hover
            striped
            sort-icon-left
          >
            <template v-slot:cell(fecha)="row">
              <div>
                {{ fechaGasto(row.item) }}
              </div>
            </template>
          </b-table>
        </div>
        <Loader v-if="onLoader"></Loader>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Loader from "../components/Loader.vue";

export default {
  name: "ListPurchaseView",
  components: {
    Loader,
  },

  data() {
    return {
      fields: [
        {
          key: "fecha",
          label: "Fecha",
          sortable: true,
          class: "text-center",
        },
        { key: "categoria", sortable: true },
        { key: "producto", sortable: true },
        { key: "cantidad", sortable: true, class: "text-center" },
        { key: "precio", sortable: true, class: "text-center" },
      ],
      onLoader: true,
      purchases: {},
      totalGastado: 0,
      sortBy: "fecha",
      sortDesc: true,
    };
  },

  computed: {
    ...mapGetters(["api"]),
  },

  mounted() {
    axios.get(this.api + '/' + this.$suc.value + "/api/compra").then((res) => {
      this.purchases = res.data;
      this.onLoader = false;
    });
  },

  methods: {
    fechaGasto(item) {
      if (item.fecha) {
        let dateGasto = new Date(item.fecha).toLocaleString().split(",", 1)[0];
        return dateGasto;
      }
    },

    gastototal() {
      let total = 0;
      for (const item of this.purchases) {
        if (item.createdAt < "05") {
          console.log(item.createdAt);
        }
        total = total + item.precio;
      }
      this.totalGastado = total;
    },
  },
};
</script>

<style>
</style>