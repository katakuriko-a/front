<template>
  <v-app-bar dark app>
    <v-spacer></v-spacer>
    <v-btn color="grey" class="logout" @click="logout()">ログアウト</v-btn>
  </v-app-bar>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  computed:{
    ...mapState(["isTheme"]),
  },
  methods:{
    ...mapActions(["logout"]),

  },
};
</script>
