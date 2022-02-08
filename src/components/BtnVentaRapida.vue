<template>
  <div>
    <b-btn id="btnVentaRapida" size="lg" pill variant="success">
      <b-icon class="mr-1" icon="cart-4" font-scale="2"></b-icon>
    </b-btn>
  </div>
</template>

<script>
export default {
  name: "BtnVentaRapida",
};
</script>

<style>
@media (max-width: 720px) {
  #btnVentaRapida {
    height: 100px;
    width: 100px;
    bottom: 30px;
    left: 30px;
    position: fixed;
    z-index: 999;
  }
}
@media (min-width: 720px) {
  #btnVentaRapida {
    height: 100px;
    width: 100px;
    bottom: 30px;
    left: 30px;
    position: fixed;
    z-index: 999;
  }
}
</style>