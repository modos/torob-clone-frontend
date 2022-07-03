<script setup lang="ts">
import NavbarComponent from "@/components/commons/NavbarComponent.vue";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "axios";

import jwt_decode from "jwt-decode";

const productId = useRoute().params.id;
const product = ref();
const productSeller = ref();
const productStore = ref();

const errorBadge = ref(false);
const successBadge = ref(false);

const userId = jwt_decode(localStorage.getItem("token")).sub;

const report = ref();

onBeforeMount(async () => {
  product.value = (
    await axios.get("http://localhost:8080/products/single?id=" + productId)
  ).data;

  productSeller.value = product.value.seller;
  productStore.value = product.value.store;
});

async function submit() {
  try {
    await axios.post("http://localhost:8080/products/report", {
      product: productId,
      seller: productSeller.value,
      user: userId,
      message: report.value,
      store: productStore.value,
    });

    successBadge.value = true;
    errorBadge.value = false;
  } catch (error) {
    successBadge.value = false;
    errorBadge.value = true;
  }
}
</script>
<template>
  <NavbarComponent :buttons="false"></NavbarComponent>
  <main
    style="background-color: #f2f3f5; height: 95vh"
    class="container-fluid d-flex flex-column"
  >
    <div class="mt-2 mx-4">
      <RouterLink to="/dashboard/user"
        ><button type="button" class="btn btn-warning my-2">
          بازگشت
        </button></RouterLink
      >
      <p>نام محصول: {{ product.name }}</p>
      <p>قیمت: {{ product.price }}</p>
      <p>
        لینک:
        <a :href="'//' + product.link" target="_blank">{{ product.link }}</a>
      </p>
      <p>دسته بندی: {{ product.category }}</p>
    </div>

    <button
      type="button"
      class="btn btn-primary w-25"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      گزارش
    </button>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">نوشتن گزارش</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label for="usernameInput">متن پیام</label>
            <input
              type="username"
              class="form-control shadow-none mt-2"
              id="usernameInput"
              placeholder="گزارش خود را وارد کنید"
              v-model="report"
            />
            <div v-if="errorBadge" class="alert alert-danger mt-3" role="alert">
              مشکلی پیش آمده است!
            </div>
            <div
              v-if="successBadge"
              class="alert alert-success mt-3"
              role="alert"
            >
              گزارش ثبت شد!
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              بستن
            </button>
            <button @click="submit" type="button" class="btn btn-success">
              ثبت گزارش
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
