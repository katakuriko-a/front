<template>
  <v-navigation-drawer dark v-model="drawer" app>
    <v-sheet class="pa-4 text-center">
      <v-avatar class="mb-4" size="64">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>

      <div class="mb-2">{{ student.name }}</div>
      <v-sheet width="50%" v-if="student.plan == 'PREMIUM'"  color="blue-grey lighten-1" class="text-caption mx-auto">{{ student.plan }}</v-sheet>
      <v-sheet width="50%" v-if="student.plan == 'STANDARD'"  color="green darken-1" class="text-caption mx-auto">{{ student.plan }}</v-sheet>
      <div class="text-caption mt-2">{{ student.mail }}</div>
      <div class="text-caption">{{ student.tel }}</div>
      <div class="text-caption mt-2">{{ student.skill }}</div>
      <div v-if="roles_id == 2" class="text-caption">時給{{ student.fee }}円</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        nuxt
        :to="`/mypage`"
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>予約情報の確認</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nuxt :to="`/students/${current_student_id}/edit`" exact>
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>登録情報の編集</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nuxt :to="`/progress/${current_student_id}`" v-if="roles_id == 1">
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>進捗報告</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nuxt :to="`/teachers`" v-if="roles_id == 1">
        <v-list-item-icon>
          <v-icon>mdi-human-male-board</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>先生一覧</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nuxt :to="`/teachers/students`" v-if="roles_id == 2" exact>
        <v-list-item-icon>
          <v-icon>mdi-human-male-board</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>生徒一覧</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: "マイページ",
    };
  },
  data: () => ({
    name: "",
    age: "",
    birth: "",
    mail: "",
    tel: "",
    fee: "",
    level: "",
    drawer: true,
    selectLevel: [],
  }),
  computed: {
    ...mapState([
      "student",
      "isShow",
      "levels",
      "isTheme",
      "page",
      "current_student_id",
      "roles_id",
    ]),
  },
  mounted() {
    console.log(this.roles_id);
    this.getStudent(this.current_student_id).then(() => {
      this.name = this.student.name;
      this.age = this.student.age;
      this.birth = this.student.birth;
      this.mail = this.student.mail;
      this.tel = this.student.tel;
      this.fee = this.student.fee;
      this.setRolesId(this.student.roles_id);
    });
  },
  methods: {
    ...mapActions(["getStudent"]),
    ...mapMutations(["setPage", "setRolesId"]),
  },
};
</script>
