<template>
  <div>
    <b-card>
      <b-card-header>Crear usuarios</b-card-header>
      <b-card-body>
        <div>
            <b-row>
              <b-col cols="12">
                <div>
                  <b-form-input
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
            <b-row class="mt-2">
              <b-col cols="12">
                <div>
                  <b-form-input
                    v-model="User.sucursal"
                    placeholder="Sucursal"
                  ></b-form-input>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-5">
              <b-col cols="2"></b-col>
              <b-col cols="8">
                <b-button @click="hola()" variant="info" block size="md">Ingresar</b-button>
              </b-col>
            </b-row>
          </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
  name: "AddUserView",

  data() {
    return {
      User: {usuario: '', passw: '', sucursal: ''},
    };
  },

  computed: {
    ...mapGetters(['api'])
  },

  methods: {
    hola(){
      console.log(this.$suc.value)
    },

    crearuser: function(){
      axios.post(this.api + '/' + this.$suc.value + '/api/usuario', this.User)
        .then(res => {
          if (res.status != 404) {
            this.User = {}
          }
        })
    }
  },
};


</script>

<style>
</style>