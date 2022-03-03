<template>
  <v-app>
    <v-card dark width="500px" class="mx-auto mt-16">
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
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      snackbar: false,
      // isLogin: true,
      mail: "",
      password: "",
      isLogin: false,
      userId: null,
      showPassword: false,
      isError:false,
    };
  },
  methods: {
    ...mapActions([
      "authenticateUser",
      "nuxtServerInit",
      "onAuthStateChangedAction",
      "login",
    ]),

    onSubmit() {
      let that = this;
      if (!this.isLogin) {
        that.$fire.auth
          .signInWithEmailAndPassword(this.mail, this.password)
          .then(() => {
            const info = {
              email: this.mail,
              password: this.password,
            };
            this.login(info);
            $nuxt.$router.push("/students");
          })
          .catch(function (error) {
            that.isError= true;
          });
      } else {
        that.$fire.auth
          .createUserWithEmailAndPassword(this.mail, this.password)
          .then(() => {
            const info = {
              email: this.mail,
              password: this.password,
            };
            this.login(info);
            $nuxt.$router.push("/students");
          })
          .catch(function () {
            that.isError = true;
          });
      }
    },
  },
};
</script>
<style scoped>
.admin-auth-page {
  padding: 16px;
}
</style>
