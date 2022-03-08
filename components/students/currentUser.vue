<template>
  <v-card width="16%" :dark="!isTheme" absolute class="profile py-4">
    <v-row class="row">
      <v-avatar class="mr-4 ml-4" color="indigo" size="24px">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      ID:{{current_student_id}}
      名前:{{ current_student_name }}
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["current_student_id","current_student_name", "isTheme"]),
  },
  mounted() {
    this.getCurrentStudentName();
  },

  methods: {
    ...mapActions(["getCurrentStudentName"]),
  },
};
</script>
<style scoped>
.profile {
  margin-left: auto;
  margin-left: 24px;
  margin-top: 94px;
  position: fixed;
  z-index: 200;
  opacity: 0.8;
}
</style>
