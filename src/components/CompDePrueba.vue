<template>
  <div>
    <b-card>
      <p>Componente de prueba</p>

      <b-button @click="compararFecha()">Comparar</b-button>

      <p>{{fecha1}}</p>
      <p>{{fecha2}}</p>
      <p>{{comparador}}</p>
      <p>{{comparador2}}</p>
    </b-card>
  </div>
</template>

<script>

export default {
  name: "CompDePrueba",

  data() {
    return {
      fecha1: '',
      fecha2: '',
      comparador: '',
      comparador2: '',

    };
  },

  methods: {
    compararFecha: function(){
      let hora = new Date()
      let hora2 = new Date()
      this.fecha1 = hora
      this.fecha2 = hora2
      this.comparador = hora.toLocaleString().split(',', 1)
      this.comparador2 = hora2.valueOf()
    }
  },
};


</script>

<style>
</style>