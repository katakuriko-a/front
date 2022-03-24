<template>
  <v-app id="app">
    <Header />
    <Theme />
    <Detail />
    <!-- <Appbar /> -->
    <Sidebar />
    <List />
  </v-app>
</template>

<script>
import Header from "~/components/students/header";
import Theme from "~/components/students/theme";
import List from "~/components/students/list";
import Detail from "~/components/students/filter";
import Sidebar from "~/components/students/sidebar";
import Appbar from "~/components/students/appbar";

import { mapState } from "vuex";
export default {
  components: {
    Header,
    Theme,
    List,
    Detail,
    Sidebar,
    Appbar,
  },
  computed: {
    ...mapState(["isTheme"]),
  },
};
</script>
