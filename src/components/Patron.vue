<template>
  <div v-if="visible" class="padre">
    <div>
      <b-card class="carta">
        <b-card-header align="center" class="pt-0 pb-2 mb-3">
          Dibuje el patron
        </b-card-header>
        <b-row id="row1">
          <b-col id="col1" cols="4">
            <b-button
              id="btn-patron"
              v-for="(btn, idx) in btns1"
              :key="idx"
              pill
              variant="outline-dark"
              :pressed="btn.state"
              @click="btnAccion(btn)"
            >
              <div v-if="!btn.state" id="contentBtn">
                <b-icon icon="circle"></b-icon>
              </div>
              <b-btn
                v-if="btn.state"
                id="pruebaBtn"
                pill
                variant="outline-light"
              >
                {{ btn.value }}
              </b-btn>
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
              :pressed="btn.state"
              @click="btnAccion(btn)"
            >
              <div v-if="!btn.state" id="contentBtn">
                <b-icon icon="circle"></b-icon>
              </div>
              <b-btn
                v-if="btn.state"
                id="pruebaBtn"
                pill
                variant="outline-light"
              >
                {{ btn.value }}
              </b-btn>
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
              :pressed="btn.state"
              @click="btnAccion(btn)"
            >
              <div v-if="!btn.state" id="contentBtn">
                <b-icon icon="circle"></b-icon>
              </div>
              <b-btn
                v-if="btn.state"
                id="pruebaBtn"
                pill
                variant="outline-light"
              >
                {{ btn.value }}
              </b-btn>
            </b-button>
          </b-col>
        </b-row>
        <b-card-footer class="mt-4 px-1">
          <div class="contFooter">
            <b-btn size="sm" variant="success"
            @click="addPatron()"
            >Agregar</b-btn>
            <b-btn size="sm" variant="danger" @click="rstPatron()"
              >Reiniciar</b-btn
            >
          </div>
        </b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Patron",

  data() {
    return {
      visible: true,
      patron: [],
      contBtn: 0,
      btns1: [
        { btn: "1", state: false, value: "" },
        { btn: "2", state: false, value: "" },
        { btn: "3", state: false, value: "" },
      ],
      btns2: [
        { btn: "4", state: false, value: "" },
        { btn: "5", state: false, value: "" },
        { btn: "6", state: false, value: "" },
      ],
      btns3: [
        { btn: "7", state: false, value: "" },
        { btn: "8", state: false, value: "" },
        { btn: "9", state: false, value: "" },
      ],
    };
  },

  methods: {
    ...mapActions(["changePatron"]),

    btnAccion(btn) {
      if (btn.state != true) {
        btn.state = !btn.state;
        this.patron.push(btn.btn);
        btn.value = this.patron.length;
      }
    },

    rstPatron() {
      this.patron = [];
      for (let i = 0; i < this.btns1.length; i++) {
        this.btns1[i].state = false;
        this.btns2[i].state = false;
        this.btns3[i].state = false;
        this.btns1[i].value = "";
        this.btns2[i].value = "";
        this.btns3[i].value = "";
      }
    },

    addPatron() {
      this.changePatron(this.patron)
      this.visible = !this.visible
    }
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
}
#pruebaBtn {
  padding: 0px;
  padding-right: 6px;
  padding-left: 6px;
  font-size: 12px;
}
#contentBtn {
  display: flex;
  flex-direction: column;
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
  height: 100%;
  width: 200px;
}
.contFooter {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.padre {
  display: float;
  flex-direction: column;
  align-items: center;
}
</style>