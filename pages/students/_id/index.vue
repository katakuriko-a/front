<template>
  <v-app>
    <div class="main_wrapper">
      <div class="main_content signup_content">
        <h2>登録内容編集画面</h2>
        <v-form ref="form" @submit.prevent method="post" action="">
          <div class="form_group form_name">
            <label for="name">名前</label>
            <v-text-field
              class="form_parts"
              id="name"
              type="text"
              placeholder="阿部 隆"
              v-model="name"
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
              :rules="[rules.required]"
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
            <label for="plan">プラン名</label>
            <v-select
              class="form_parts"
              v-model="plan"
              :items="plans"
              :rules="[rules.required]"
              placeholder="---"
            >
            </v-select>
          </div>
          <button @click="update()" class="signup_btn btn_option">
            <i class="fas fa-plus big_plus"></i>内容を変更する
          </button>
        </v-form>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: "登録内容編集画面",
    };
  },
  data() {
    return {
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
    };
  },
  computed: {
    ...mapState(["student"]),
  },
  mounted() {
    this.getStudent(this.$route.params.id).then(() => {
      this.name = this.student.name;
      this.age = this.student.age;
      this.birth = this.student.birth;
      this.mail = this.student.mail;
      this.tel = this.student.tel;
      this.plan = this.student.plan;
    });
  },

  methods: {
    ...mapActions(["getStudent", "updateStudent"]),
    update() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updateStudent", {
          id: this.$route.params.id,
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
