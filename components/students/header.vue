<template>
  <div>
    <v-app-bar :dark="isTheme" class="header">
      <v-app-bar-nav-icon @click="drawer()"></v-app-bar-nav-icon>

      <v-btn
        @click="popupOpen()"
        elevation="2"
        rounded
        color="grey"
        class="csv_btn"
      >
        csvダウンロード
      </v-btn>

      <v-spacer></v-spacer>
      <v-form @submit.prevent class="search" @submit="searchStudents(search)">
        <v-text-field
          label="名前検索"
          filled
          dense
          v-model="search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-form>
      <v-icon :color="main_blue" @click.stop="toggleFilter()"
        >mdi-text-box-search-outline</v-icon
      >
      <v-btn class="logout" @click="logout()">ログアウト</v-btn>
    </v-app-bar>
    <CurrentUser/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CurrentUser from "~/components/students/currentUser";

export default {
  components: {
    CurrentUser,
  },

  data() {
    return {
      search: "",
      main_blue: "#7ac8e4",
    };
  },

  computed: {
    ...mapState(["isDrawer", "isTheme"]),
  },
  methods: {
    csv() {
      this.$emit("csvClick");
    },

    ...mapActions([
      "searchStudents",
      "toggleFilter",
      "popupOpen",
      "drawer",
      "logout",
    ]),
  },
};
</script>

<style>
.header{
  position: fixed;
  z-index: 200;
}
.csv_btn {
  margin-left: 36px;
}
.search {
  width: 30%;
  margin-bottom: 4px;
  margin-right: 16px;
}
.v-list-item-group {
  text-align: center;
}

.v-navigation-drawer {
  z-index: 300;
}
.logout {
  margin-left: 16px;
}
</style>
