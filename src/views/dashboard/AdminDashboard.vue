<script setup lang="ts">
import NavbarComponent from "../../components/commons/NavbarComponent.vue";
import { ref } from "vue";
import axios from "axios";

const errorBadge = ref(false);
const successBadge = ref(false);

const name = ref();

async function submit() {
  try {
    await axios.post("http://localhost:8080/products/categories/create", {
      name: name.value,
    });

    errorBadge.value = false;
    successBadge.value = true;
  } catch (error) {
    errorBadge.value = true;
    successBadge.value = false;
  }
}
</script>
<template>
  <NavbarComponent></NavbarComponent>
  <main
    style="background-color: #f2f3f5; height: 95vh"
    class="container-fluid justify-content-center d-flex align-items-center flex-column"
  >
    <form class="w-50">
      <div class="form-group mt-2">
        <label for="nameInput">نام دسته</label>
        <input
          type="name"
          class="form-control shadow-none"
          id="usernameInput"
          placeholder="نام دسته بندی را وارد کنید"
          v-model="name"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary d-block mt-4"
        @click.prevent="submit"
      >
        ثبت دسته بندی جدید
      </button>
    </form>
    <div v-if="errorBadge" class="alert alert-danger mt-3" role="alert">
      اطلاعات نادرست است، دوباره تلاش کنید!
    </div>
    <div v-if="successBadge" class="alert alert-success mt-3" role="alert">
      ورود موفقیت آمیز بود!
    </div>
  </main>
</template>
