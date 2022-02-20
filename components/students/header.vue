<template>
  <header>
    <div @click="csv()" id="csv" class="btn_option">csvダウンロード</div>
    <div class="search_wrapper">
      <form @submit.prevent class="search" method="get" action="">
        <input v-model="search" type="text" placeholder="名前検索" />
        <button @click="searchClick()">
          <i class="fas fa-search btn_option"></i>
          <fa class="fas fa-search btn_option" :icon="['fas', 'search']" />
        </button>
      </form>
    </div>
    <div href="" class="filter btn_option" @click="open()">
      <i class="fas fa-search-plus"></i> 詳細検索
    </div>
  </header>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      students:[]
    };
  },
  methods: {
    open() {
      this.$emit("detailClick");
    },
    csv() {
      this.$emit("csvClick");
    },
    searchClick() {
      axios
        .get("http://localhost/api", {
          params: {
            search: this.search,
          },
        })
        .then((res) => {
          this.students = res.data;
          console.log(this.students);
          this.$emit('searched-students', (this.students));
        })
        .catch((error) => {
          console.log(error);
          this.result = "ERROR";
        });
    },
  },
};
</script>
