<script setup lang="ts">
import NavbarComponent from '@/components/commons/NavbarComponent.vue';
</script>

<template>
  <NavbarComponent :buttons="true"></NavbarComponent>
  <main
    style="background-color: #f2f3f5; height: 95vh"
    class="container-fluid justify-content-center d-flex align-items-center flex-column"
  >
    <div class="d-flex justify-content-center">
      <div class="mx-2">
        <img src="https://torob.com/static/images/torob_logo.svg" alt="ترب" />
      </div>
      <div>
        <h1 style="color: #d73948; font-weight: bold">
          ترب
          <span
            class="d-block"
            style="font-size: 14px; color: #808080; font-weight: normal"
            >موتور جستوجوی هوشمند خرید</span
          >
        </h1>
      </div>
    </div>

    <div class="row w-100 justify-content-center mt-4">
      <div class="col-md-4 col-sm-10">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"
              ><img
                src="https://torob.com/static/images/search.svg"
                width="25px"
                height="25px"
                alt="جستجو در ترب"
                style="cursor: pointer"
            /></span>
          </div>
          <input
            type="text"
            class="form-control shadow-none"
            placeholder="نام کالا را وارد کنید"
            aria-label="Product"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
