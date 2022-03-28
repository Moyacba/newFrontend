<template>
  <div>
    <form class="mt-2" v-on:submit.prevent="upload">
      <input
      class="form-control"
        id="file-input"
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        @change="handleFileChange($event)"
      />
      <button class="mt-2 btn btn-info" type="submit">Actualizar foto</button>
    </form>

    <!-- <div class="mt-4" v-if="results && results.secure_url">
      <img :src="results.secure_url" :alt="results.public_id" />
    </div> -->
  </div>
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "ImageUpload",

  props: ["producto_id"],

  data() {
    return {
      url: "",
      publicId: "",

      cloudName: "dx35m1jp6",
      preset: "l0vzjgmm",
      filesSelected: "",
      file: "",
      fileContents: "",
      fileResize: "",
      formData: "",
      results: "",
      errors: [],
    };
  },

  computed: {
    ...mapGetters(["api"]),
  },

  methods: {
    // cloudname: dx35m1jp6
    // preset: l0vzjgmm

    handleFileChange: function (event) {
      console.log("handlefilechange: ", event.target.files);
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    upload: function () {
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        async function () {
          this.fileContents = reader.result;
          this.fileResize = await this.resizeImage(this.fileContents);
          this.prepareFormData();
          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: this.formData,
          };
          Axios(requestObj)
            .then((res) => {
              this.results = res.data;
              console.log("Results: ", this.results);
              console.log("public_id", this.results.public_id);

              axios
                .put(this.api + "/api/producto/img/" + this.producto_id, {data: this.results.secure_url})
                .then((res) => {
                  if (res.status == 200) {
                    console.log('Se guardo imagen')
                  }
                });
            })
            .catch((error) => {
              this.errors.push(error);
              console.log("Error: ", this.error);
            });
        }.bind(this),
        false
      );
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    },

    prepareFormData: function () {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("tags", "unsigned upload");
      console.log("this.fileResize: ", this.fileResize);
      this.formData.append("file", this.fileResize);
    },

    resizeImage: async function (base64Str, MAX_WIDTH = 300, MAX_HEIGHT = 300) {
      let resizeBase64 = await new Promise((resolve) => {
        let img = new Image();
        img.src = base64Str;
        img.onload = () => {
          let canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_HEIGHT / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
      });
      return resizeBase64;
    },
  },
};
</script>

<style>
.padre {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.btn{
  width: 100%;
}
</style>