<template>
  <div>
    <Header @detailClick="filterOpen()" @csvClick="csv()" />
    <Detail ref="detail" @searchClick="search()" />
    <List ref="list" />
  </div>
</template>

<script>
import axios from "axios";
import Header from "~/components/students/header";
import List from "~/components/students/list";
import Detail from "~/components/students/filter";
export default {
  components: {
    Header,
    List,
    Detail,
  },
  data() {
    return {
      open: false,
      students:[],
    };
  },
  methods: {
    detail() {
      this.open = !this.open;
    },
    filterOpen() {
      this.$refs.detail.showFilter();
    },
    csv() {
      this.$refs.detail.csv();
    },
    search(){
      this.$refs.list.search();
    }
  },
};
</script>
