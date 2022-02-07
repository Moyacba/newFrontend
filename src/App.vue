<template>
  <div id="app">
    <Navbar class="nav"></Navbar>
    <div class="separador">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from './components/Navbar'
import axios from 'axios'




export default {
  components: {Navbar},
  methods: {
        ...mapActions(['changebox', 'changeOpenOrClose', 'changeidBox', 'changeDisVenta']),

        

      },

  created() {
    axios.get('https://modotecno-api.herokuapp.com/api/box')
      .then(res => {
        if (res.data[res.data.length-1] != undefined) {
          if (res.data[res.data.length-1].active) {
            console.log('000000000000')
            console.log(res.data[res.data.length-1].idBox)
            this.changebox('Caja: Abierta')
            this.changeOpenOrClose('/Closebox')
            this.changeidBox(res.data[res.data.length-1].idBox)
            this.changeDisVenta(false)
          }
        }
      })
  }
}

</script>

<style>
.separador{
  margin-top: 80px; 
}
</style>