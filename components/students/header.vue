<template>
  <header>
    <div @click="csv()" id="csv" class="btn_option">csvダウンロード</div>
    <div class="search_wrapper">
      <form class="search" method="get" action="">
        <input v-model="search" type="text" placeholder="名前検索" />
        <button>
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
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    open() {
      this.$emit("detailClick");
    },
    csv() {
      this.$emit("csvClick");
    },
  },
};
</script>
