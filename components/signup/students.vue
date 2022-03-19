<template>
  <v-card dark class="main_content mx-auto mt" width="90%">
    <h2>生徒版新規登録画面</h2>
    <v-alert type="error" v-if="isError" class="mt-10">
      メールアドレスまたはパスワードが間違っています。
    </v-alert>

    <v-list-item>
      <v-form lazy-validation ref="form" @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="name"
              label="名前"
              placeholder="阿部 隆"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="age"
              label="年齢"
              placeholder="21"
              type="number"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="birth"
              label="生年月日"
              placeholder="2000/6/21"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="mail"
              label="メールアドレス"
              placeholder="abe-takashi0622@email.com"
              :rules="[rules.required, rules.email]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              label="パスワード(6文字以上)"
              v-model="password"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="tel"
              label="電話番号"
              placeholder="080-1234-5678"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="experience_month"
              label="経験月数"
              placeholder="12"
              :rules="[rules.required]"
              type="number"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="skill"
              label="スキル"
              placeholder="PHP/Java"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              :items="plans"
              label="プラン"
              v-model="plan"
              :rules="[rules.required]"
              placeholder="---"
            ></v-select>
          </v-col>
          <v-col class="d-flex">
            <v-btn dark class="info my-8 signup_btn" type="submit"
              >新規登録</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      snackbar: false,
      // isLogin: true,
      password: "",
      isLogin: false,
      userId: null,
      showPassword: false,
      isError: false,
      name: "",
      age: "",
      mail: "",
      birth: "",
      tel: "",
      plan: "",
      plans: ["PREMIUM", "STANDARD"],
      experience_month: "",
      skill: "",
      roles_id: 1,
      rules: {
        required: (value) => !!value || "必須項目です。",
        email: (value) =>
          /.+@.+/.test(value) || "メールアドレスの形式が正しくありません",
      },
    };
  },
  computed: {
    ...mapState(["current_student_id", "isShow", "isTheme"]),
  },
  methods: {
    ...mapActions([
      "authenticateUser",
      "nuxtServerInit",
      "onAuthStateChangedAction",
      "login",
      "getCurrentStudentId",
      "addStudent",
    ]),

    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$fire.auth
          .createUserWithEmailAndPassword(this.mail, this.password)
          .then(() => {
            this.$store
              .dispatch("addStudent", {
                name: this.name,
                age: this.age,
                birth: this.birth,
                mail: this.mail,
                tel: this.tel,
                plan: this.plan,
                experience_month: this.experience_month,
                skill: this.skill,
                roles_id: this.roles_id,
              })
              .then(() => {
                this.getCurrentStudentId(this.mail);
                const info = {
                  email: this.mail,
                  password: this.password,
                };
                this.login(info);
              });
          })
          .catch(() => {
            this.isError = true;
          });
      }
    },
  },
};
</script>
<style scoped>
.mt {
  margin-top: 100px;
}
</style>
