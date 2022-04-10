<template>
  <b-container fluid="sm" class="">
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-card>
          <div>
            {{ fechaProducto }}
          </div>
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

              <div class="content"></div>
            </b-col>
            <b-col cols="6" class="mt-2">
              <b-row>
                <b-col cols="2" class="mr-4">
                  <div class="texto mt-4"><p>Imagen:</p></div>
                </b-col>
                <b-col cols="9">
                  <b-card>
                    <div v-if="!Producto.img">Sin Foto</div>
                    <img :src="Producto.img" :alt="Producto.img" />
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mt-2">
                <b-col cols="12">
                  <div class="content">
                    <div class="texto"><p class="mt-2">Cod. Alt.:</p></div>
                    <b-form-input
                      type="text"
                      v-model="Producto.codAlt"
                      placeholder="Codigo Alternativo"
                    >
                    </b-form-input>
                  </div>
                </b-col>
              </b-row>

              <b-row class="">
                <b-col cols="12">
                  <div class="content">
                    <div class="texto"><p class="">Ult. Camb.:</p></div>
                    <b-form-input
                      disabled
                      type="text"
                      v-model="ultimaFecha"
                      placeholder="Codigo Alternativo"
                    >
                    </b-form-input>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="mt-3">
              <b-button @click="mostrar3()" variant="success" block>
                Actualizar
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <ImageUpload :producto_id="Producto._id" v-on:imgView="imgfunc">
              </ImageUpload>
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
      ProductPut: { _id: this.Producto._id, fechaPrecioVenta: new Date()},
      show: false,
      passwordView: false,
      Movement: {},
      passrefresh: "",
      fechaProducto: "",
      pVenta: "",
      ultimaFecha: new Date(this.Producto.fechaPrecioVenta)
        .toLocaleString()
        .split(",")[0],
    };
  },
  computed: {
    ...mapGetters({
      api: "api",
    }),
  },

  created() {
    this.pVenta = this.Producto.precioVenta;

    console.log(this.Producto.fechaPrecioVenta)

    if(!this.Producto.fechaPrecioVenta){
      this.ProductPut.fechaPrecioVenta = new Date()
    }

    if (this.Producto.fecha) {
      let fecha = this.Producto.fecha;
      this.fechaProducto = new Date(fecha).toLocaleString().split(",", 1)[0];
    }
  },

  methods: {
    imgfunc: function (a) {
      this.Producto.img = a;
    },

    actualizarProducto() {
      axios.get(this.api + "/api/producto/" + this.Producto._id).then((res) => {
        if (res.status == 200) {
          this.Producto.img = res.data.img;
          console.log("Este producto: ", this.Producto);
        }
      });
    },

    addPhoto: async function () {
      var Data = new FormData(document.forms.namedItem("fileinfo"));

      // var fd = new FormData();
      // fd.append('fieldname', qthis.imgProduct);
      // console.log(this.imgProduct)
      // console.log(fd)
      await axios.post(this.api + "/img/", Data).then((res) => {
        if (res.status == 200) {
          this.actualizarProducto();
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
      console.log("OK");

      // this.ProductoPut._id = this.Producto._id
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

      if (this.Producto.precioVenta != this.pVenta) {
        this.ProductPut.fechaPrecioVenta = new Date()
      }

      this.ProductPut.codAlt = this.Producto.codAlt;
      this.ProductPut.atributos = this.Producto.atributos;
      /* this.registrarMovimiento(this.ProductPut) */

      // if (!this.pVenta) {
      //   this.ProductPut.fechaVenta = new Date();
      // } else if (this.Producto.fechaVenta) {
      //   if (this.pVenta != this.Producto.precioVenta) {
      //     this.ProductoPut.fechaVenta = new Date();
      //   }
      // }

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