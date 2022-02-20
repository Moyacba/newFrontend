<template>
  <div id="app">
    <Navbar class="nav"></Navbar>
    <BtnVentaRapida></BtnVentaRapida>
    <div class="separador">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "./components/Navbar";
import BtnVentaRapida from "./components/BtnVentaRapida.vue";
import axios from "axios";

export default {
  components: { Navbar, BtnVentaRapida },
  methods: {
    ...mapActions([
      "changebox",
      "changeOpenOrClose",
      "changeidBox",
      "changeDisVenta",
    ]),
  },

  created() {
    axios.get("http://localhost:4000/api/caja/open").then((res) => {
      if (res.data != null) {
        console.log(res.data);
        this.changebox("Caja: Abierta");
        this.changeOpenOrClose("/Closebox");
        this.changeDisVenta(false);
      }
    });
  },
};
</script>

<style>
@media (max-width: 720px) {
  .separador {
    margin-top: 120px;
  }
  #app {
    background: blue;
    height: 1000px;
  }
}

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