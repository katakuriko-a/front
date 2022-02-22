<template>
  <div class="main_wrapper">
    <div class="main_content signup_content">
      <h2>登録内容編集画面</h2>
      <form @submit.prevent method="post" action="">
        <div class="form_group form_name">
          <label for="name">名前</label>
          <input
            class="form_parts"
            id="name"
            type="text"
            placeholder="阿部 隆"
            v-model="name"
          />
        </div>
        <div class="form_group form_age">
          <label for="age">年齢</label>
          <input
            class="form_parts"
            id="age"
            v-model="age"
            type="text"
            placeholder="21"
            value=""
          />
        </div>
        <div class="form_group form_birth">
          <label for="birth">生年月日</label>
          <input
            class="form_parts"
            id="birth"
            v-model="birth"
            type="text"
            placeholder="2000/6/21"
            value=""
          />
        </div>
        <div class="form_group form_mail">
          <label for="mail">e-mail</label>
          <input
            class="form_parts"
            id="mail"
            v-model="mail"
            type="email"
            placeholder="abe-takashi0622@email.com"
            value=""
          />
        </div>
        <div class="form_group form_tel">
          <label for="tel">TEL</label>
          <input
            class="form_parts"
            id="tel"
            v-model="tel"
            type="tel"
            placeholder="080-1234-5678"
            value=""
          />
        </div>
        <div class="form_group form_plan">
          <label for="plan">プラン名</label>
          <select class="form_parts" id="plan" v-model="plan">
            <option value="">---</option>
            <option>PREMIUM</option>
            <option>STANDARD</option>
          </select>
        </div>
        <button @click="update()" class="signup_btn btn_option">
          <i class="fas fa-plus big_plus"></i>内容を変更する
        </button>
      </form>
    </div>
  </div>
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
      this.$store.dispatch("updateStudent", {
        id: this.$route.params.id,
        name: this.name,
        age: this.age,
        birth: this.birth,
        mail: this.mail,
        tel: this.tel,
        plan: this.plan,
      });
    },
  },
};
</script>
