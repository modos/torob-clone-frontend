<script setup lang="ts">
import NavbarComponent from "../../../components/commons/NavbarComponent.vue";

import { ref } from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";
const username = ref();
const password = ref();
const email = ref();
const mobile = ref();

const errorBadge = ref(false);
const successBadge = ref(false);

function togglePassword(event: any) {
  const passwordInput = document.getElementById("passwordInput");
  let type =
    passwordInput?.getAttribute("type") === "password" ? "text" : "password";
  passwordInput?.setAttribute("type", type);

  const icon = type === "password" ? "bi bi-eye-fill" : "bi bi-eye-slash-fill";

  event.target.setAttribute("class", icon);
}
async function submit() {
  const user = {
    id: jwt_decode(localStorage.getItem("token")).sub,
    username: username.value,
    password: password.value,
    mobile: mobile.value,
    email: email.value,
  };

  try {
    const result = (await axios.post("http://localhost:8080/users/edit", user))
      .data;
    errorBadge.value = false;
    successBadge.value = true;
    localStorage.setItem("token", result.access_token);
  } catch (error) {
    errorBadge.value = true;
    successBadge.value = false;
  }
}
</script>
<template>
  <NavbarComponent :buttons="false"></NavbarComponent>
  <main
    style="background-color: #f2f3f5; height: 95vh"
    class="container-fluid justify-content-center d-flex align-items-center flex-column"
  >
    <RouterLink to="/dashboard/seller"
      ><button type="button" class="btn btn-danger">بازگشت</button></RouterLink
    >
    <form class="w-50">
      <div class="form-group mt-2">
        <label for="usernameInput">نام کاربری</label>
        <input
          type="username"
          class="form-control shadow-none"
          id="usernameInput"
          placeholder="نام کاربری جدید خود را وارد کنید"
          v-model="username"
        />

        <label for="passwordInput" class="mt-3">رمز عبور</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"
              ><i class="bi bi-eye-fill" @click="togglePassword"></i
            ></span>
          </div>
          <input
            type="password"
            class="form-control shadow-none"
            id="passwordInput"
            placeholder="رمز عبور جدید خود را وارد کنید"
            v-model="password"
          />
        </div>
        <label for="emaiInput" class="mt-3">ایمیل</label>
        <input
          type="username"
          class="form-control shadow-none"
          id="emailInput"
          placeholder="ایمیل جدید خود را وارد کنید"
          v-model="email"
        />
        <label for="mobileInput" class="mt-3">موبایل</label>
        <input
          type="username"
          class="form-control shadow-none"
          id="mobileInput"
          placeholder="موبایل خود را وارد کنید"
          v-model="mobile"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary d-block mt-4"
        @click.prevent="submit"
      >
        اعمال تغییرات
      </button>
    </form>
    <div v-if="errorBadge" class="alert alert-danger mt-3" role="alert">
      اطلاعات نادرست است، دوباره تلاش کنید!
    </div>
    <div v-if="successBadge" class="alert alert-success mt-3" role="alert">
      تغییرات به درستی اعمال شد!
    </div>
  </main>
</template>
