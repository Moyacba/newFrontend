<template>
  <div class="padre">
    {{ this.patron }}
    <b-card class="carta">
      <b-row id="row1">
        <b-col id="col1" cols="4">
          <b-button
            id="btn-patron"
            v-for="(btn, idx) in btns1"
            :key="idx"
            pill
            variant="outline-dark"
            :pressed.sync="btn.state"
            @click="btnAccion(btn)"
          >
            <b-icon icon="circle"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2" id="row1">
        <b-col id="col1" cols="4">
          <b-button
            id="btn-patron"
            v-for="(btn, idx) in btns2"
            :key="idx"
            pill
            variant="outline-dark"
            :pressed.sync="btn.state"
            @click="btnAccion(btn)"
          >
            <b-icon icon="circle">1</b-icon>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2" id="row1">
        <b-col id="col1" cols="4">
          <b-button
            id="btn-patron"
            v-for="(btn, idx) in btns3"
            :key="idx"
            pill
            variant="outline-dark"
            :pressed.sync="btn.state"
            @click="btnAccion(btn)"
          >
            <b-icon icon="circle"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <b-card-footer class="mt-4 px-1">
        <div class="contFooter">
          <b-btn size="sm" variant="success">Agregar</b-btn>
          <b-btn size="sm" variant="danger" @click="rstPatron()"
            >Reiniciar</b-btn
          >
        </div>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Patron",

  data() {
    return {
      patron: [],
      contBtn: 0,
      btns1: [
        { btn: "1", state: false, value: '' },
        { btn: "2", state: false, value: '' },
        { btn: "3", state: false, value: '' },
      ],
      btns2: [
        { btn: "4", state: false, value: '' },
        { btn: "5", state: false, value: '' },
        { btn: "6", state: false, value: '' },
      ],
      btns3: [
        { btn: "7", state: false, value: '' },
        { btn: "8", state: false, value: '' },
        { btn: "9", state: false, value: '' },
      ],
    };
  },

  methods: {
    btnAccion(btn) {
      console.log(btn.btn);
      this.patron.push(btn.btn);
      console.log(this.patron);
    },

    rstPatron() {
      this.patron = [];
      for (let i = 0; i < this.btns1.length; i++) {
        this.btns1[i].state = false
        this.btns2[i].state = false
        this.btns3[i].state = false
      }
    },
  },
};
</script>

<style>
#btn-patron {
  height: 46px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#row1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
#col1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.carta {
  height: 260px;
  width: 200px;
}
.contFooter {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.padre {
  display: inline-table;
}
</style>