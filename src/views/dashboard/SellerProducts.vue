<script setup lang="ts">
import { onBeforeMount } from "vue";
import NavbarComponent from "../../components/commons/NavbarComponent.vue";
import { ref } from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";

const sub = jwt_decode(localStorage.getItem("token")).sub;

const products = ref();
const errorBadge = ref(false);
const successBadge = ref(false);

onBeforeMount(async () => {
  const result = (
    await axios.get("http://localhost:8080/products/seller?id=" + sub)
  ).data;
  products.value = result;
});

async function removeProduct(product: object) {
  try {
    await axios.post("http://localhost:8080/products/seller/remove", {id: product.id});
    successBadge.value = true;
    errorBadge.value = false;
  } catch (error) {
    errorBadge.value = true;
    successBadge.value = false;
  }
}
</script>
<template>
  <NavbarComponent :buttons="false"></NavbarComponent>
  <main style="background-color: #f2f3f5; height: 95vh" class="container-fluid">
    <RouterLink to="/dashboard/seller"
      ><button type="button" class="btn btn-warning m-3">
        بازگشت
      </button></RouterLink
    >
    <div class="row p-3">
      <div v-for="(product, index) in products" :key="index" class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">دسته بندی: {{ product.category }}</p>
            <p class="card-text">قیمت: {{ product.price }}</p>
            <a
              href="#"
              class="btn btn-danger mx-2"
              @click="removeProduct(product)"
              >حذف</a
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorBadge" class="alert alert-danger mt-3 w-25" role="alert">
      مشکلی پیش آمده است!
    </div>
    <div v-if="successBadge" class="alert alert-success mt-3 w-25" role="alert">
      حذف کالا موفقیت آمیز بود!
    </div>
  </main>
</template>
