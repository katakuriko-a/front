<template>
  <v-app>
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <v-app-bar  dark>
      <v-app-bar-nav-icon  @click="drawer()"></v-app-bar-nav-icon>
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
              <v-col cols="5">
                <v-text-field
                  v-model="birth"
                  filled
                  rounded
                  dense
                  label="生年月日"
                  placeholder="2000/6/21"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="mail"
                  filled
                  rounded
                  dense
                  label="メールアドレス"
                  placeholder="abe-takashi0622@email.com"
                  :rules="[rules.required, rules.email]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="tel"
                  filled
                  rounded
                  dense
                  label="電話番号"
                  placeholder="080-1234-5678"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="plans"
                  filled
                  label="プラン"
                  dense
                  rounded
                  v-model="plan"
                  :rules="[rules.required]"
                  placeholder="---"
                ></v-select>
              </v-col>
            </v-row>
            <v-btn
              color="cyan"
              rounded
              type="submit"
              @click="store()"
              class="signup_btn"
            >
              <v-icon>mdi-plus</v-icon>新規登録
            </v-btn>
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
    birth: "",
    mail: "",
    tel: "",
    plan: "",
    plans: ["PREMIUM", "STANDARD"],
    rules: {
      required: (value) => !!value || "必須項目です。",
      email: (value) =>
        /.+@.+/.test(value) || "メールアドレスの形式が正しくありません",
    },
  }),
  computed: {
    ...mapState(["isShow"]),
  },
  mounted(){
    this.close();
  },
  methods: {
    ...mapActions(["addStudent", "drawer", "close"]),
    store() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addStudent", {
          name: this.name,
          age: this.age,
          birth: this.birth,
          mail: this.mail,
          tel: this.tel,
          plan: this.plan,
        });
      }
    },
  },
};
</script>

<style>
.v-app-bar{
  padding: 0;
}
.signup_btn{
  margin-bottom: 24px;
}
</style>
