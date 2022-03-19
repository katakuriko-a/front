<template>
  <v-app>
    <v-app-bar dark app>
      <v-btn @click="isLogin = !isLogin">
        {{ isLogin ? "ログイン" : "新規登録" }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="isStudent = !isStudent" v-if="isLogin">
        {{ isStudent ? "先生として登録する" : "生徒として登録する" }}
      </v-btn>
    </v-app-bar>
    <v-card dark width="500px" class="mx-auto mt-16" v-if="!isLogin">
      <v-card-title>
        <h2 class="display-1">{{ isLogin ? "新規登録" : "ログイン" }}</h2>
      </v-card-title>
      <v-card-text>
        <v-alert type="error" v-if="isError">
          メールアドレスまたはパスワードが間違っています。
        </v-alert>

        <v-form @submit.prevent="onSubmit" class="mt-0">
          <v-text-field
            prepend-icon="mdi-account-circle"
            label="メールアドレス"
            type="email"
            v-model="mail"
          />
          <v-text-field
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            label="パスワード"
            v-model="password"
          />
          <v-card-actions>
            <v-btn dark class="info" type="submit">{{
              isLogin ? "新規登録" : "ログイン"
            }}</v-btn>
            <v-btn
              color="grey"
              type="button"
              btn-style="inverted"
              style="margin-left: 10px"
              @click="isLogin = !isLogin"
              >{{ isLogin ? "ログイン" : "新規登録" }}へ切り替える</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>

    <SignUpStudents v-if="isStudent && isLogin" />
    <SignUpTeachers v-if="!isStudent && isLogin" />
  </v-app>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import SignUpStudents from "~/components/signup/students";
import SignUpTeachers from "~/components/signup/teachers";
export default {
  components: {
    SignUpStudents,
    SignUpTeachers,
  },
  data() {
    return {
      snackbar: false,
      // isLogin: true,
      password: "",
      isLogin: true,
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
      isStudent: false,
      rules: {
        required: (value) => !!value || "必須項目です。",
        email: (value) =>
          /.+@.+/.test(value) || "メールアドレスの形式が正しくありません",
      },
    };
  },
  computed: {
    ...mapState(["current_student_id", "isShow", "student"]),
  },
  methods: {
    ...mapActions([
      "authenticateUser",
      "nuxtServerInit",
      "onAuthStateChangedAction",
      "login",
      "getCurrentStudentId",
      "getStudentWithEmail",
    ]),
    ...mapMutations(["setRolesId"]),

    onSubmit() {
      this.getStudentWithEmail(this.mail)
        .then(() => {
          this.$fire.auth.signInWithEmailAndPassword(this.mail, this.password);
        })
        .then(() => {
          const info = {
            email: this.mail,
            password: this.password,
          };
          this.login(info);
          this.getCurrentStudentId(this.mail);
        })
        .catch((error) => {
          this.isError = true;
        });
    },
  },
};
</script>
<style scoped>
.admin-auth-page {
  padding: 16px;
}
</style>
