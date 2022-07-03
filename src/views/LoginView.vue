<script setup lang="ts">
import NavbarComponent from "@/components/commons/NavbarComponent.vue";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import jwt_decode from "jwt-decode";

const username = ref("");
const password = ref("");
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
    username: username.value,
    password: password.value,
  };

  try {
    const result = (await axios.post("http://localhost:8080/auth/login", user))
      .data;
    errorBadge.value = false;
    successBadge.value = true;
    localStorage.setItem("token", result.access_token);
    setTimeout(() => {
      const role = jwt_decode(result.access_token).role;
      if (role === "user") {
        router.push({ name: "UserDashboard" });
      } else if (role === "admin") {
        router.push({ name: "AdminDashboard" });
      } else if (role === "seller") {
        router.push({ name: "SellerDashboard" });
      }
    }, 2000);
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
          placeholder="نام کاربری خود را وارد کنید"
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
            placeholder="رمز عبور خود را وارد کنید"
            v-model="password"
          />
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary d-block mt-4"
        @click.prevent="submit"
      >
        ورود به داشبورد
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
