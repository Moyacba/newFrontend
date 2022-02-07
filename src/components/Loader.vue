<template>
    <div class="padre">
      <vLottiePlayer
        name="workoutMonkeyAnim"
        loop
        style="height: 70px"
        :animationData="require('../../public/data.json')"
      />
    </div>
</template>

<script>
import vLottiePlayer from "vue-lottie-player";

export default {
  name: "Loader",
  components: {
    vLottiePlayer,
  },
};
</script>

<style>
.padre {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>