<template>
  <v-app id="app">
    <Appbar />
    <Sidebar />
    <TeachersList />
  </v-app>
</template>

<script>
import Sidebar from "~/components/students/sidebar";
import Appbar from "~/components/students/appbar";
import TeachersList from "~/components/lists/teachers";

import { mapState } from "vuex";
export default {
  components: {
    Appbar,
    Sidebar,
    TeachersList,
  },
  computed: {
    ...mapState(["isTheme"]),
  },
};
</script>
