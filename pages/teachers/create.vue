<template>
  <v-app>
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <v-app-bar class="flex0" dark>
      <v-app-bar-nav-icon @click="drawer()"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="new_wrapper">
      <v-card dark class="main_content">
        <h2>新規登録画面</h2>
        <v-list-item>
          <v-form lazy-validation ref="form" @submit.prevent>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="name"
                  filled
                  rounded
                  dense
                  label="名前"
                  placeholder="阿部 隆"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="age"
                  filled
                  rounded
                  dense
                  label="年齢"
                  placeholder="21"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="career"
                  filled
                  rounded
                  dense
                  label="メンター歴"
                  placeholder="3年"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="fee"
                  filled
                  rounded
                  dense
                  label="料金/1時間"
                  placeholder="1000円"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="language"
                  filled
                  rounded
                  dense
                  label="使用言語"
                  placeholder="Java"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col class="d-flex">
                <v-btn
                  color="cyan"
                  rounded
                  type="submit"
                  @click="store()"
                  class="signup_btn"
                >
                  <v-icon>mdi-plus</v-icon>新規登録
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

export default {
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: "新規登録画面",
    };
  },
  data: () => ({
    name: "",
    age: "",
    career: "",
    fee: "",
    language: "",
    rules: {
      required: (value) => !!value || "必須項目です。",
    },
  }),
  computed: {
    ...mapState(["isShow"]),
  },
  mounted() {
    this.close();
  },
  methods: {
    ...mapActions(["addTeacher", "drawer", "close"]),
    store() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addTeacher", {
          name: this.name,
          age: this.age,
          career: this.career,
          fee: this.fee,
          language: this.language,
        });
      }
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
.v-main {
  height: 100vh;
}
.v-toolbar {
  flex: 0;
}
</style>
