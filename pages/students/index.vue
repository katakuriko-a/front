<template>
  <v-app  id="app">
    <Header />
    <Theme />
    <Detail />
    <List />
  </v-app>
</template>

<script>
import Header from "~/components/students/header";
import Theme from "~/components/students/theme";
import List from "~/components/students/list";
import Detail from "~/components/students/filter";
import {mapState} from "vuex";
export default {
  components: {
    Header,
    Theme,
    List,
    Detail,
  },
  computed:{
    ...mapState(["isTheme"])
  }
};

</script>
