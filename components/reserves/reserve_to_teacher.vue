<template>
  <v-row>
    <!-- <v-col v-for="card in cards" :key="card" cols="12"> -->
    <v-card :dark="isTheme" class="pa-4 mx-auto" width="94%">
      <v-subheader>予約中のレッスン</v-subheader>
      <v-alert block :dark="isTheme" dense type="warning" v-if="reserved_teachers.length == 0">
        現在予約はありません。
      </v-alert>

      <v-list two-line>
        <template>
          <div
            v-for="reserved_teacher in reserved_teachers"
            :key="reserved_teacher.id"
          >
            <v-list-item>
              <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  >{{ reserved_teacher.student_name }}さん</v-list-item-title
                >

                <v-list-item-subtitle>
                  {{ reserved_teacher.start_time }} ~{{
                    reserved_teacher.end_time
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                class="btn"
                link
                :to="`/reserves/${reserved_teacher.id}/edit`"
              >
                <v-icon> mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                class="btn"
                @click="deleteReserve(reserved_teacher.id)"
              >
                <v-icon> mdi-delete-outline </v-icon>
              </v-btn>
            </v-list-item>

            <v-divider
              v-if="reserved_teachers"
              :key="reserved_teacher.created_at"
              inset
            ></v-divider>
          </div>
        </template>
      </v-list>
    </v-card>
    <!-- </v-col> -->
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Theme from "~/components/students/theme";

export default {
  components: {
    Theme,
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
      "current_student_id",
    ]),
  },
  mounted() {
    // this.getReserves(this.current_student_id);
    this.getReservedStudents(this.current_student_id);
  },
  methods: {
    ...mapActions([
      "getStudent",
      "close",
      "drawer",
      "getReservedStudents",
      "deleteReserve",
      "getReserve",
    ]),
    clickGetReserve(id) {
      this.$store.dispatch("getReserve", {
        id: id,
        student_id: this.current_student_id,
      });
    },
  },
};
</script>
