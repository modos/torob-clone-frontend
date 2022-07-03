/* eslint-disable @typescript-eslint/no-unused-vars */
<script setup lang="ts">
import NavbarComponent from "@/components/commons/NavbarComponent.vue";
import axios from "axios";
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const role = ref<string>("");

const successBadge = ref(false);
const errorBadge = ref(false);

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
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value,
  };

  try {
    (await axios.post("http://localhost:8080/users/create", user)).data;
    errorBadge.value = false;
    successBadge.value = true;
  } catch (error) {
    errorBadge.value = true;
    successBadge.value = false;
  }
}
</script>
<template>
  <NavbarComponent :buttons="true"></NavbarComponent>
  <main
    style="background-color: #f2f3f5; height: 95vh"
    class="container-fluid justify-content-center d-flex align-items-center flex-column"
  >
    <form class="w-50">
      <div class="form-group mt-2">
        <label for="usernameInput">نام کاربری</label>
        <input
          type="username"
          class="form-control shadow-none"
          id="usernameInput"
          placeholder="حداقل 3 کارکتر"
          v-model="username"
        />
        <label for="emailInput" class="mt-3">ایمیل</label>
        <input
          type="email"
          class="form-control shadow-none"
          id="emailInput"
          v-model="email"
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
            placeholder="حداقل 8 کارکتر"
            v-model="password"
          />
        </div>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="role"
          id="adminRadio"
          value="admin"
          v-model="role"
        />
        <label class="form-check-label" for="adminRadio"> ادمین </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="role"
          id="sellerRadio"
          value="seller"
          v-model="role"
        />
        <label class="form-check-label" for="sellerRadio"> فروشنده </label>
      </div>
      <div class="form-check form-check-inline mt-4">
        <input
          class="form-check-input"
          type="radio"
          name="role"
          id="userRadio"
          value="user"
          v-model="role"
        />
        <label class="form-check-label" for="userRadio"> کاربر عادی </label>
      </div>
      <button
        type="submit"
        class="btn btn-primary d-block mt-4"
        @click.prevent="submit"
      >
        ثبت اطلاعات
      </button>
    </form>
    <div v-if="errorBadge" class="alert alert-danger mt-3" role="alert">
      اطلاعات تکراری یا اشتباه است، دوباره امتحان کنید!
    </div>
    <div v-if="successBadge" class="alert alert-success mt-3" role="alert">
      ثبت نام به درستی انجام شد، از قسمت ورود میتوانید به داشبورد دسترسی پیدا
      کنید!
    </div>
  </main>
</template>
