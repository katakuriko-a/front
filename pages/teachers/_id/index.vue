<template>
  <v-app>
    <Appbar />
    <Sidebar />
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <v-app-bar class="flex0" dark>
      <v-app-bar-nav-icon @click="drawer()"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="new_wrapper">
      <v-card dark class="main_content">
        <h2>新規登録画面</h2>
        <br />
        <h4>{{ name }}さんを予約します。</h4>
        <v-list-item>
          <v-form lazy-validation ref="form" @submit.prevent>
            <v-row>
              <v-col cols="4">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="400px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="授業日"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                    locale="ja-jp"
                    :day-format="(date) => new Date(date).getDate()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12"></v-col>
              <v-col cols="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="start_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="start_time"
                      label="開始時間"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="start_time"
                    full-width
                    @click:minute="$refs.menu2.save(start_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>

              <v-col cols="6">
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="end_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="end_time"
                      label="終了時間"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu3"
                    v-model="end_time"
                    full-width
                    @click:minute="$refs.menu3.save(end_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>

              <v-col class="d-flex">
                <v-btn
                  color="cyan"
                  rounded
                  type="submit"
                  @click="clickReserve()"
                  class="signup_btn"
                >
                  <v-icon>mdi-calendar</v-icon>予約を完了する
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-list-item>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Sidebar from "~/components/students/sidebar";
import Appbar from "~/components/students/appbar";

export default {
  components: {
    Sidebar,
    Appbar,
  },
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: "新規登録画面",
    };
  },
  data: (vm) => ({
    name: "",
    start_time: "",
    end_time: "",
    menu1: false,
    menu2: false,
    menu3: false,
    rules: {
      required: (value) => !!value || "必須項目です。",
    },
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu1: false,
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
  }),
  computed: {
    ...mapState(["isShow", "current_student_id", "teacher", "student"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  mounted() {
    this.close();
    this.getTeacher(this.$route.params.id).then(() => {
      this.name = this.teacher.name;
    });
  },
  methods: {
    ...mapActions(["drawer", "close", "reserve", "getTeacher"]),
    clickReserve() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("reserve", {
          current_student_id: this.current_student_id,
          teacher_id: this.$route.params.id,
          start_time: `${this.date} + ${this.start_time}`,
          end_time: `${this.date} + ${this.end_time}`,
          teacher_name:this.teacher.name,
          student_name:this.student.name,
        });
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style>
.v-app-bar {
  padding: 0;
}
.signup_btn {
  margin-bottom: 24px;
}

.v-toolbar {
  flex: 0;
}

.v-date-picker-table {
  height: auto;
}
</style>
