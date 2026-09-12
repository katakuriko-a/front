<template>
  <v-card dark class="main_content mx-auto mt" width="90%">
    <h2>生徒版新規登録画面</h2>
    <v-alert type="error" v-if="isError" class="mt-10">
      {{ errorText }}
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
      errorText: "エラーが発生しました。しばらく時間をおいてお試しください",
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
      "getCurrentUserId",
      "addUser",
    ]),

    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$fire.auth
          .createUserWithEmailAndPassword(this.mail, this.password)
          .then(() => {
            this.$store
              .dispatch("addUser", {
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
                this.getCurrentUserId(this.mail);
                const info = {
                  email: this.mail,
                  password: this.password,
                };
                this.login(info);
              });
          })
          .catch((e) => {
            this.isError = true;
            console.log(e.code);
            if (e.code == "auth/email-already-in-use") {
              this.errorText = "このメールアドレスは使用されています";
            } else if (e.code == "auth/user-disabled") {
              this.errorText = "サービスの利用が停止されています";
            } else if (e.code == "auth/user-not-found") {
              this.errorText = "メールアドレスまたはパスワードが違います";
            } else if (e.code == "auth/email-already-in-use") {
              this.errorText = "このメールアドレスは使用されています";
            } else if (e.code == "auth/weak-password") {
              this.errorText = "パスワードは6文字以上にしてください";
            } else if (e.code == "auth/wrong-password") {
              this.errorText = "メールアドレスまたはパスワードが違います";
            } else if (e.code == "auth/popup-blocked") {
              this.errorText =
                "認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください";
            } else if (
              e.code == "auth/operation-not-supported-in-this-environment" ||
              "auth/auth-domain-config-required" ||
              "auth/operation-not-allowed" ||
              "auth/unauthorized-domain"
            ) {
              this.errorText = "現在この認証方法はご利用頂けません";
            } else if (e.code == "auth/wrong-password") {
              this.errorText = "メールアドレスまたはパスワードが違います";
            } else if (e.code == "auth/wrong-password") {
              this.errorText = "メールアドレスまたはパスワードが違います";
            } else if (e.code == "auth/wrong-password") {
              this.errorText = "メールアドレスまたはパスワードが違います";
            } else if (e.code == "auth/requires-recent-login") {
              this.errorText = "認証の有効期限が切れています";
            }
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
