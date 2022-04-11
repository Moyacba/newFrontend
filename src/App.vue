<template>
  <div id="app">
    <Navbar class="nav"></Navbar>
    <!-- <BtnVentaRapida></BtnVentaRapida> -->
    <div v-if="!userState" class="separador">
      <router-view />
    </div>

    <b-modal
      v-model="userState"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      size="md"
    >
      <b-row class="mb-5 mt-3">
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <div class="logoModotecno">
            <img id="logoIdModotecno" src="../public/Modotecno.png" alt="" />
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <div>
            <b-row>
              <b-col cols="12">
                <div>
                  <b-form-input
                    autofocus
                    v-model="User.usuario"
                    placeholder="Usuario"
                  ></b-form-input>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="12">
                <div>
                  <b-form-input
                    type="password"
                    v-model="User.passw"
                    placeholder="Constraseña"
                  ></b-form-input>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-5">
              <b-col cols="2"></b-col>
              <b-col cols="8">
                <b-button
                  @click="comprobarUser()"
                  variant="info"
                  block
                  size="md"
                  >Ingresar</b-button
                >
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navbar from "./components/Navbar";
// import BtnVentaRapida from "./components/BtnVentaRapida.vue";
import axios from "axios";

export default {
  components: { Navbar },

  data() {
    return {
      userState: true,
      User: { usuario: "", passw: "" },
      sucursal: "",
    };
  },

  computed: {
    ...mapGetters(["api"]),
  },

  methods: {
    ...mapActions([
      "changebox",
      "changeOpenOrClose",
      "changeidBox",
      "changeDisVenta",
    ]),

    comprobarUser() {
      axios.put(this.api + "/api/usuario/", this.User).then((res) => {
        if (res.status == 200) {
          this.$suc.value = res.data;

          axios.get(this.api + '/' + this.$suc.value + "/api/caja/open").then((res) => {
            if (res.data != null) {
              console.log(res.data);
              this.changebox("Caja: Abierta");
              this.changeOpenOrClose("/Closebox");
              this.changeDisVenta(false);
            }
          });

          this.accesoOk();
          this.userState = false;
        } else {
          this.accesoError();
        }
      });
    },

    accesoError(append = false) {
      this.$bvToast.toast("Usuario o contraseña incorrectos", {
        title: "Acceso denegado",
        autoHideDelay: 1200,
        variant: "danger",
        solid: true,
        appendToast: append,
      });
    },

    accesoOk(append = false) {
      this.$bvToast.toast("Bienvenido a la sucursal: " + this.$suc.value, {
        title: "Acceso exitoso",
        autoHideDelay: 2000,
        variant: "success",
        solid: true,
        appendToast: append,
      });
    },
  },

  created() {},
};
</script>

<style>
.logoModotecno {
  width: 100%;
}
/* @media (max-width: 720px) {
  .separador {
    margin-top: 120px;
  }
  #app {
    background: blue;
    height: 1000px;
  }
} */

@media (min-width: 720px) {
  .separador {
    margin-top: 80px;
  }
  #app {
    background: linear-gradient(
      148deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(198, 198, 198, 1) 50%,
      rgba(255, 255, 255, 1) 100%
    );
    height: 1000px;
  }
}
</style>