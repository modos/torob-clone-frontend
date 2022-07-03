<script setup lang="ts">
import NavbarComponent from "../../components/commons/NavbarComponent.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";

const products = ref();
let temp = products.value;

const categories = ref();

const filtered = {
  cheapest: "ارزان ترین",
  expensive: "گران ترین",
  newest: "جدیدترین",
};

onBeforeMount(async () => {
  const result = (await axios.get("http://localhost:8080/products/all")).data;
  products.value = result;
  temp = products.value;

  await getCategories();
});

async function productsByCategory(category: string) {
  try {
    products.value = (
      await axios.get("http://localhost:8080/products/all?cat=" + category)
    ).data;
  } catch (error) {
    console.log(error);
  }
}

async function getCategories() {
  try {
    categories.value = (
      await axios.get("http://localhost:8080/products/categories")
    ).data;
  } catch (error) {
    console.log(error);
  }
}

function filter(f: string) {
  if (f === filtered.cheapest) {
    products.value.sort((a, b) => (a.price > b.price ? 1 : -1));
  } else if (f === filtered.expensive) {
    products.value.sort((a, b) => (a.price > b.price ? -1 : 1));
  } else if (f === filtered.newest) {
    products.value = temp;
  }
}

function likeProduct(product: object) {
  const user_id: string = jwt_decode(localStorage.getItem("token")).sub;

  const ob = {
    product: product.id,
    category: product.category,
    name: product.name,
    price: product.price,
    seller: product.seller,
    user: user_id,
  };
  try {
    const result = axios.post("http://localhost:8080/products/like", ob);
  } catch (error) {}
}
</script>
<template>
  <NavbarComponent :SignoutButton="true"></NavbarComponent>
  <main style="background-color: #f2f3f5" class="row vh-100 pd-0 m-0">
    <div class="col-md-2 col-sm-3 bg-dark">
      <RouterLink to="/dashboard/user/profile"
        ><button type="button" class="btn btn-primary mt-2 w-100">
          پروفایل
        </button></RouterLink
      >
      <h3 class="text-white text-center mt-2">زیردسته ها</h3>
      <hr class="bg-white" />
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="form-check text-white"
      >
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault1"
          id="flexRadioDefault1"
          @change="productsByCategory(category.name)"
        />
        <label class="form-check-label" for="flexRadioDefault1">
          {{ category.name }}
        </label>
      </div>
      <h3 class="text-white text-center mt-2">فیلتر ها</h3>
      <hr class="bg-white" />
      <div class="form-check text-white">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          @change="filter(filtered.cheapest)"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          ارزان ترین
        </label>
      </div>
      <div class="form-check text-white">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          @change="filter(filtered.expensive)"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          گران ترین
        </label>
      </div>
      <div class="form-check text-white">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked
          @change="filter(filtered.newest)"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          جدیدترین
        </label>
      </div>
    </div>
    <div class="col-md-10 col-sm-9">
      <div class="row mt-2">
        <div v-for="(product, index) in products" :key="index" class="col-4">
          <div class="card">
            <div class="card-body">
              <RouterLink
                :to="{ path: '/products/' + product.id }"
                style="text-decoration: none; color: inherit"
                ><h5 class="card-title">{{ product.name }}</h5>
              </RouterLink>
              <p class="card-text">دسته بندی: {{ product.category }}</p>
              <p class="card-text">قیمت: {{ product.price }}</p>
              <button
                type="button"
                class="btn btn-success mx-2"
                @click="likeProduct(product)"
              >
                افزودن به علاقه مندی ها
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
