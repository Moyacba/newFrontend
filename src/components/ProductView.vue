<template>
  <b-container fluid="sm" class="">
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-card>
          <b-row>
            <b-col cols="6">
              <div class="content">
                <div class="texto"><p class="mt-3">Código:</p></div>
                <b-form-input
                  class="mt-2"
                  type="number"
                  v-model="Producto.codigo"
                  placeholder="Código"
                >
                </b-form-input>
              </div>
              <div class="content">
                <div class="texto"><p class="mt-2">Producto:</p></div>
                <b-form-input
                  v-model="Producto.producto"
                  placeholder="Producto"
                >
                </b-form-input>
              </div>

              <div class="content">
                <div class="texto"><p class="mt-2">Categoría:</p></div>
                <b-form-input
                  v-model="Producto.categoria"
                  placeholder="Categoria"
                >
                </b-form-input>
              </div>

              <div class="content">
                <div class="texto"><p class="mt-2">Stock:</p></div>
                <b-form-input
                  type="number"
                  v-model="Producto.stock"
                  placeholder="Cantidad"
                >
                </b-form-input>
              </div>

              <div class="content">
                <div class="texto"><p class="mt-2">Compra:</p></div>
                <b-form-input
                  type="number"
                  v-model="Producto.precioCompra"
                  placeholder="Precio de compra"
                >
                </b-form-input>
              </div>

              <div class="content">
                <div class="texto"><p class="mt-2">Venta:</p></div>
                <b-form-input
                  type="number"
                  v-model="Producto.precioVenta"
                  placeholder="Precio de venta"
                >
                </b-form-input>
              </div>

              <div class="content">
                <div class="texto"><p class="mt-2">Proveedor:</p></div>
                <b-form-input
                  v-model="Producto.proveedor"
                  placeholder="Proveedor"
                >
                </b-form-input>
              </div>

              <div class="content">
                <div class="texto"><p class="mt-2">Detalles:</p></div>
                <b-form-textarea
                  class="mb-3"
                  v-model="Producto.detalles"
                  placeholder="Detalles"
                >
                </b-form-textarea>
              </div>
            </b-col>
            <b-col cols="6">
              <b-card class="mt-2" header="Imagen del prodcuto:">
                <b-row>
                  <b-col cols="1"></b-col>
                  <b-col cols="10">
                    <img :src="Producto.img" :alt="Producto.img" />
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3">
              <b-button @click="pedirPass()" variant="success" block>
                Actualizar
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <ImageUpload :producto_id="Producto._id"></ImageUpload>
            </b-col>
          </b-row>

          <b-modal
            v-model="passwordView"
            centered
            title="Seguridad"
            header-border-variant="success"
            footer-border-variant="success"
            hide-footer
            ok-only
            ok-variant="success"
          >
            <b-form-input type="password" v-model="passrefresh"></b-form-input>
            <b-button
              @click="comprobarPass(passrefresh)"
              block
              variant="success"
              class="mt-3"
            >
              Ok
            </b-button>
          </b-modal>

          <b-modal
            v-model="show"
            centered
            title="Actualización"
            header-border-variant="success"
            footer-border-variant="success"
            hide-footer
            ok-only
            ok-variant="success"
          >
            <h6>Producto actualizado con éxito!</h6>
            <b-button to="/" block variant="success" class="mt-3">
              Ok
            </b-button>
          </b-modal>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ImageUpload from "./ImageUpload.vue";

export default {
  name: "ProductView",

  components: { ImageUpload },

  props: ["Producto"],

  data() {
    return {
      imgPrev: "",
      imgProduct: "Hola",
      dismissSecs: 3,
      dismissCountDown: 0,
      ProductPut: {},
      show: false,
      passwordView: false,
      Movement: {},
      passrefresh: "",
    };
  },
  computed: {
    ...mapGetters({
      api: "api",
    }),
  },

  created() {
    console.log(this.Producto);
  },

  methods: {
    addPhoto: async function () {
      var Data = new FormData(document.forms.namedItem("fileinfo"));

      // var fd = new FormData();
      // fd.append('fieldname', qthis.imgProduct);
      // console.log(this.imgProduct)
      // console.log(fd)
      await axios.post(this.api + "/img/", Data).then((res) => {
        if (res.status == 200) {
          console.log("Imagen actualizada con exito");
        }
      });
    },

    hideModal: function () {
      this.$refs["show"].hide;
    },

    pedirPass() {
      this.passwordView = !this.passwordView;
    },

    comprobarPass: function (pass) {
      if (pass == "3368") {
        this.mostrar3();
      } else {
        this.makeToastError();
      }
    },

    mostrar3: function () {
      this.ProductPut._id = this.validar(this.Producto._id, "-");
      this.ProductPut.producto = this.validar(this.Producto.producto, "-");
      this.ProductPut.codigo = this.Producto.codigo;
      this.ProductPut.categoria = this.validar(this.Producto.categoria, "-");
      this.ProductPut.stock = this.validar(this.Producto.stock, "0");
      this.ProductPut.precioCompra = this.validar(
        this.Producto.precioCompra,
        "0"
      );
      this.ProductPut.precioVenta = this.validar(
        this.Producto.precioVenta,
        "0"
      );
      this.ProductPut.proveedor = this.validar(this.Producto.proveedor, "-");
      this.ProductPut.detalles = this.validar(this.Producto.detalles, "-");

      /* this.registrarMovimiento(this.ProductPut) */

      axios.put(this.api + "/api/producto", this.ProductPut).then((res) => {
        if (res.status == 200) {
          this.show = !this.show;
        } else {
          this.makeToastError();
        }
      });
      this.ProductoPut = {};
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    validar: function (validar, def) {
      if (validar == undefined) {
        return def;
      } else {
        return validar;
      }
    },

    registrarMovimiento(Producto) {
      this.Movement.usuario = "-";
      this.Movement.cliente = "-";
      this.Movement.movimiento = "Editar Producto";
      this.Movement.motivo = Producto.producto;

      axios.post(this.api + "/api/movement", this.Movement).then((res) => {
        console.log(res.data);
      });
    },

    makeToastError(append = false) {
      this.$bvToast.toast("Posiblemente la contraseña no es la correcta", {
        title: "Error al actualizar producto",
        autoHideDelay: 2000,
        variant: "warning",
        solid: true,
        appendToast: append,
      });
    },
  },
};
</script>

<style>
.texto {
  width: 130px;
}
.input {
  margin-top: 20px;
}
.divtotal {
  display: block;
}
.content {
  display: flex;
  align-content: space-between;
}
</style>