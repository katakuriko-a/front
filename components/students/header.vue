<template>
  <header>
    <div @click="popupOpen()" id="csv" class="btn_option">csvダウンロード</div>
    <div class="search_wrapper">
      <form @submit.prevent class="search" method="get" action="">
        <input v-model="search" type="text" placeholder="名前検索" />
        <button @click="searchStudents(search)">
          <i class="fas fa-search btn_option"></i>
          <fa class="fas fa-search btn_option" :icon="['fas', 'search']" />
        </button>
      </form>
    </div>
    <div href="" class="filter btn_option" @click="toggleFilter()">
      <i class="fas fa-search-plus"></i> 詳細検索
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    csv() {
      this.$emit("csvClick");
    },
    ...mapActions(["searchStudents","toggleFilter","popupOpen"]),
  },
};
</script>
