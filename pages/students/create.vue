<template>
<v-app>
  <div class="new_wrapper">
    <div class="main_content signup_content">
      <h2>新規登録画面</h2>
      <v-form lazy-validation ref="form" @submit.prevent>
        <div class="form_group form_name">
          <label for="name">名前</label>
          <v-text-field
            class="form_parts"
            id="name"
            type="text"
            v-model="name"
            placeholder="阿部 隆"
            :rules="[rules.required]"
          />
        </div>
        <div class="form_group form_age">
          <label for="age">年齢</label>
          <v-text-field
            class="form_parts"
            id="age"
            v-model="age"
            type="text"
            placeholder="21"
            :rules="[rules.required]"
          />
        </div>
        <div class="form_group form_birth">
          <label for="birth">生年月日</label>
          <v-text-field
            class="form_parts"
            id="birth"
            v-model="birth"
            type="text"
            placeholder="2000/6/21"
            :rules="[rules.required]"
          />
        </div>
        <div class="form_group form_mail">
          <label for="mail">e-mail</label>
          <v-text-field
            class="form_parts"
            id="mail"
            v-model="mail"
            type="email"
            placeholder="abe-takashi0622@email.com"
            :rules="[rules.required, rules.email]"
            required
          />
        </div>
        <div class="form_group form_tel">
          <label for="tel">TEL</label>
          <v-text-field
            class="form_parts"
            id="tel"
            v-model="tel"
            type="tel"
            placeholder="080-1234-5678"
           :rules="[rules.required]"
          />
        </div>
        <div class="form_group form_plan">
          <label for="plan">プラン</label>
          <v-select
            class="form_parts"
            v-model="plan"
            :items="plans"
            :rules="[rules.required]"
            placeholder="---"
          >
          </v-select>
        </div>
        <button @click="store()" class="signup_btn btn_option">
          <i class="fas fa-plus big_plus"></i>新規登録
        </button>
      </v-form>
    </div>
  </div>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: "新規登録画面",
    };
  },
  data:() => ({
      name: "",
      age: "",
      birth: "",
      mail: "",
      tel: "",
      plan: "",
      plans:["PREMIUM","STANDARD"],
      rules: {
        required: (value) => !!value || "必須項目です。",
        email: (value) =>
          /.+@.+/.test(value) || "メールアドレスの形式が正しくありません",
      },
  }),
  methods: {
    ...mapActions(["addStudent"]),
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
