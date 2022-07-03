<script setup lang="ts">
import NavbarComponent from "../../components/commons/NavbarComponent.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";

const sub = jwt_decode(localStorage.getItem("token")).sub;

const name = ref("");
const category = ref("نامشخص");
const link = ref("");
const price = ref("");
const store = ref("نامشخص");
const storeId = ref();
const stores = ref();

const errorBadge = ref(false);
const successBadge = ref(false);

const options = ref();

onBeforeMount(async () => {
  const result = (
    await axios.get("http://localhost:8080/products/store/all?id=" + sub)
  ).data;
  stores.value = result;

  await loadOptions();
});

function select(option: string) {
  category.value = option;
}

function selectStore(name: string, id: number) {
  store.value = name;
  storeId.value = id;
}

async function loadOptions() {
  try {
    options.value = (
      await axios.get("http://localhost:8080/products/categories")
    ).data;
  } catch (error) {
    console.log(error);
  }
}

async function submit() {
  const product = {
    name: name.value,
    category: category.value,
    price: price.value,
    link: link.value,
    store: storeId.value,
    seller: sub,
  };

  try {
    const result = (
      await axios.post("http://localhost:8080/products/create", product)
    ).data;
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
  <main style="background-color: #f2f3f5; height: 95vh" class="container-fluid">
    <RouterLink to="/dashboard/seller/profile"
      ><button type="button" class="btn btn-primary mt-2">
        حساب کاربر
      </button></RouterLink
    >
    <RouterLink to="/dashboard/seller/reports"
      ><button type="button" class="btn btn-success mt-2 mx-2">
        گزارش ها
      </button></RouterLink
    >

    <RouterLink to="/dashboard/seller/products"
      ><button type="button" class="btn btn-secondary mt-2">
        لیست محصولات
      </button></RouterLink
    >

    <div class="row justify-content-center mt-5">
      <form class="w-50">
        <div class="form-group mt-2">
          <label for="nameInput">نام محصول</label>
          <input
            type="text"
            class="form-control shadow-none"
            id="nameInput"
            placeholder="نام کاربری خود را وارد کنید"
            v-model="name"
          />
        </div>

        <div class="form-group mt-2">
          <label for="priceInput">قیمت</label>
          <input
            type="text"
            class="form-control shadow-none"
            id="nameInput"
            placeholder="قیمت محصول را وارد کنید"
            v-model="price"
          />
        </div>

        <div class="form-group mt-2">
          <label for="linkInput">لینک محصول</label>
          <input
            type="text"
            class="form-control shadow-none"
            id="linkInput"
            placeholder="لینک محصول را وارد کنید"
            v-model="link"
          />
        </div>
        <div class="btn-group my-2">
          <button
            type="button"
            class="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            دسته بندی
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="(opt, index) in options"
              :key="index"
              @click="select(opt.name)"
            >
              <a class="dropdown-item" href="#">{{ opt.name }}</a>
            </li>
          </ul>
        </div>

        <p>
          دسته بندی:<span class="mx-2">{{ category }}</span>
        </p>

        <div class="btn-group my-2">
          <button
            type="button"
            class="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            فروشگاه
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="(store, index) in stores"
              :key="index"
              @click="selectStore(store.name, store.id)"
            >
              <a class="dropdown-item" href="#">{{ store.name }}</a>
            </li>
          </ul>
        </div>

        <p>
          فروشگاه:<span class="mx-2">{{ store }}</span>
        </p>

        <button
          type="submit"
          class="btn btn-primary d-block mt-4"
          @click.prevent="submit"
        >
          ثبت محصول
        </button>
        <div v-if="errorBadge" class="alert alert-danger mt-3" role="alert">
          اطلاعات نادرست است، دوباره تلاش کنید!
        </div>
        <div v-if="successBadge" class="alert alert-success mt-3" role="alert">
          ثبت کالا موفقیت آمیز بود!
        </div>
      </form>
    </div>
  </main>
</template>
