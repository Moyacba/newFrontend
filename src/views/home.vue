<template>
  <b-container class="mt-4">
    <b-card>
      <b-card-title>
        <b-row>
          <b-col cols="5">
            <h3>Anotador</h3>
          </b-col>
          <b-col>
            <b-form-input
              id="inputNota"
              v-model="Nota.nota"
              placeholder="Agregar nota"
            ></b-form-input>
          </b-col>
          <b-col cols="1" class="p-0">
            <b-button id="btnAgregar" @click="agregarNota()" variant="info">+</b-button>
          </b-col>
        </b-row>
      </b-card-title>
      <b-card-body>
        <b-table id="tableNotes" :fields="Fields" :items="Notes" hover striped>
          <template v-slot:cell(Acciones)="row">
            <div>
              <b-button
                variant="danger"
                size="sm"
                @click="eliminarNota(row.item)"
              >
                Eliminar
              </b-button>
            </div>
          </template>
        </b-table>
        <loader v-if="onLoader"></loader>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader.vue";

export default {
  name: "home",

  components: {
    Loader
  },

  data() {
    return {
      noww: {},
      onLoader: true,
      Notes: [],
      arraySumplente: [],
      Fields: [
        { key: "nota", label: "Notas", sortable: false },
        { key: "Acciones", class: "text-center" },
      ],
      Nota: { nota: "" },
      Movement: { usuario: "", cliente: "", movimiento: "", motivo: "" },
    };
  },

  computed: {
    ...mapGetters(["api"]),
  },

  mounted() {
    this.$forceUpdate();
    axios.get(this.api + "/api/notas").then((res) => {
      this.Notes = res.data;
      this.onLoader = false;
    });
  },

  methods: {
    now: () => {
      moment.locale("es");
      var day = moment().format("HH:mm:ss");
      console.log(day);
    },

    login() {
      this.$gAuth
        .signIn()
        .then((googleUser) => {
          console.log("entra");
          console.log("User:", googleUser);
        })
        .catch((error) => {
          console.log("esto:", error);
        });
    },

    agregarNota: function () {
      axios.post(this.api + "/api/notas", this.Nota).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          let prevNota = this.Nota;
          this.Notes.push(prevNota);
          /* this.agregarMovimiento("Agregar Nota", this.Nota.text); */
          this.Nota = {};
        }
      });
    },

    eliminarNota: function (row) {
      console.log(row);
      axios.patch(this.api + "/api/notas", row).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          this.arraySumplente = [];
          for (let i = 0; i < this.Notes.length; i++) {
            if (this.Notes[i].nota != row.nota) {
              this.arraySumplente.push(this.Notes[i]);
            }
          }
          this.Notes = this.arraySumplente;
        }
      });
    },

    agregarMovimiento(movi, motivo) {
      this.Movement.usuario = "-";
      this.Movement.cliente = "Notas";
      this.Movement.movimiento = movi;
      this.Movement.motivo = motivo;

      axios.post(this.api + "/api/movement", this.Movement);
      // .then(res => {
      //     console.log(res.data)
      // })
    },
  },
};
</script>

<style>
@media (max-width: 720px) {
  #inputNota {
    display: none;
  }
}
</style>