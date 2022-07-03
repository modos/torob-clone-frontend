/* eslint-disable @typescript-eslint/no-unused-vars */
<script setup lang="ts">
import NavbarComponent from "@/components/commons/NavbarComponent.vue";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import jwt_decode from "jwt-decode";

const sub = jwt_decode(localStorage.getItem("token")).sub;

const reports = ref();

onBeforeMount(async () => {
  reports.value = (
    await axios.get("http://localhost:8080/products/report?id=" + sub)
  ).data;
});
</script>
<template>
  <NavbarComponent :buttons="false"></NavbarComponent>
  <main
    style="background-color: #f2f3f5; height: 95vh"
    class="container-fluid flex-column"
  >
    <RouterLink to="/dashboard/seller"
      ><button type="button" class="btn btn-warning my-2">
        بازگشت
      </button></RouterLink
    >

    <div v-for="(report, index) in reports" :key="index">
      <p>آی دی محصول: {{ report.product }}</p>
      <p>پیام: {{ report.message }}</p>
      <hr />
    </div>
  </main>
</template>
