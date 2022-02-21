<template>
  <v-app id="app">
    <Header />
    <Detail />
    <List />
  </v-app>
</template>

<script>
import Header from "~/components/students/header";
import List from "~/components/students/list";
import Detail from "~/components/students/filter";
export default {
  components: {
    Header,
    List,
    Detail,
  },
};
</script>
