<template>
  <v-app id="app">
    <Header />
    <Theme />
    <Detail />
    <TeachersList />
  </v-app>
</template>

<script>
import Header from "~/components/students/header";
import Theme from "~/components/students/theme";
import TeachersList from "~/components/teachers/list";
import Detail from "~/components/students/filter";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Theme,
    TeachersList,
    Detail,
  },
  computed: {
    ...mapState(["isTheme"]),
  },
};
</script>
