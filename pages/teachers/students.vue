<template>
  <v-app id="app">
    <Appbar />
    <Sidebar />
    <StudentsList />
  </v-app>
</template>

<script>
import Sidebar from "~/components/students/sidebar";
import Appbar from "~/components/students/appbar";
import StudentsList from "~/components/lists/students";

import { mapState } from "vuex";
export default {
  components: {
    Appbar,
    Sidebar,
    StudentsList,
  },
  computed: {
    ...mapState(["isTheme"]),
  },
};
</script>
