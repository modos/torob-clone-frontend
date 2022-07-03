<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import NavbarComponent from "../../../components/commons/NavbarComponent.vue";
import axios from "axios";
import jwt_decode from "jwt-decode";
const products = ref();
const sub = jwt_decode(localStorage.getItem("token")).sub;

onBeforeMount(async () => {
  try {
    const result = (
      await axios.get("http://localhost:8080/products/liked?id=" + sub)
    ).data;
    products.value = result;
  } catch (error) {
    console.log(error);
  }
});

async function remove(id: number, index: number) {
  try {
    const result = (
      await axios.post("http://localhost:8080/products/liked/remove", {
        id: id,
      })
    ).data;
    products.value.splice(index, 1);
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <NavbarComponent></NavbarComponent>
  <h2 class="m-4">علاقه مندی های شما</h2>
  <hr class="mx-4" />
  <div class="row mx-4">
    <div v-for="(product, index) in products" :key="index" class="col-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">دسته بندی: {{ product.category }}</p>
          <p class="card-text">قیمت: {{ product.price }}</p>
          <a href="#" class="btn btn-primary">خرید</a>
          <a
            href="#"
            class="btn btn-danger mx-2"
            @click="remove(product.id, index)"
            >حذف از لیست</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
