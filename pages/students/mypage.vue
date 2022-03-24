<template>
  <v-app>
    <!-- <div @click="close()" class="cover" :class="{ show: isShow }"></div> -->
    <Appbar />

    <Sidebar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <!-- <Reserve v-if="page == 'reserve'" /> -->
        <ProgressEdit v-if="page == 'progress_edit'" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Reserve from "~/components/reserves/reserve";
import Sidebar from "~/components/students/sidebar";
import Appbar from "~/components/students/appbar";

export default {
  components: {
    Reserve,
    Sidebar,
    Appbar,
  },
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
    plan: "",
    level: "",
    selectLevel: [],
    teachers: [],
    cards: ["本日のレッスン", "明日以降のレッスン"],
  }),
  computed: {
    ...mapState([
      "student",
      "isShow",
      "levels",
      "isTheme",
      "reserved_teachers",
      "page",
      "current_student_id",
      "roles_id"
    ]),
  },
  mounted() {
    this.getUser(this.current_student_id).then(() => {
      this.name = this.student.name;
      this.age = this.student.age;
      this.birth = this.student.birth;
      this.mail = this.student.mail;
      this.tel = this.student.tel;
      this.plan = this.student.plan;
      this.fee = this.student.fee;
      this.setRolesId(this.student.roles_id);
    });
    // this.getReservedTeachers(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getUser", "close", "drawer"]),
    ...mapMutations(["setPage", "setRolesId"]),
  },
};
</script>
