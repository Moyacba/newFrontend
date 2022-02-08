<template>
  <div id="app">
    <Navbar class="nav"></Navbar>
    <div class="separador">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "./components/Navbar";
import axios from "axios";

export default {
  components: { Navbar },
  methods: {
    ...mapActions([
      "changebox",
      "changeOpenOrClose",
      "changeidBox",
      "changeDisVenta",
    ]),
  },

  created() {
    axios.get("http://localhost:5000/api/caja/open")
      .then((res) => {
      if (res.data != null) {
        console.log(res.data)
        this.changebox('Caja: Abierta')
        this.changeOpenOrClose('/Closebox')
        this.changeDisVenta(false)}
    });
  },
};
</script>

<style>
.separador {
  margin-top: 80px;
}
</style>