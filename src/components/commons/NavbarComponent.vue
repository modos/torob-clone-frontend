<script setup lang="ts">
import router from "@/router";

defineProps({
  buttons: Boolean,
});

function exit() {
  localStorage.removeItem("token");
  router.push("/");
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                موبایل و تبلت
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">گوشی اپل</a></li>
                <li><a class="dropdown-item" href="#">گوشی سامسونگ</a></li>
                <li>
                  <a class="dropdown-item" href="#">گوشی شیائومی</a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                لپتاپ
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">لپتاپ اپل</a></li>
                <li><a class="dropdown-item" href="#">لپتاپ ایسوس</a></li>
                <li>
                  <a class="dropdown-item" href="#">لپتاپ لنوو</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex" v-if="buttons">
            <RouterLink to="/login">
              <button class="btn btn-outline-primary mx-2" type="submit">
                ورود
              </button></RouterLink
            >

            <RouterLink to="/signup">
              <button class="btn btn-outline-success" type="submit">
                ثبت نام
              </button>
            </RouterLink>
          </div>
          <Button
            @click="exit"
            v-if="!buttons"
            class="btn btn-outline-danger mx-2"
            >خروج</Button
          >
        </div>
      </div>
    </nav>
  </header>
</template>
