<template>
  <v-row>
      <v-card :dark="isTheme" class="main_content">
        <h2>登録内容編集画面</h2>
        <v-list-item>
          <v-form ref="form" @submit.prevent>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="name"

                  dense
                  label="名前"
                  placeholder="阿部 隆"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="age"

                  dense
                  label="年齢"
                  placeholder="21"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="birth"

                  dense
                  label="生年月日"
                  placeholder="2000/6/21"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="mail"

                  dense
                  label="メールアドレス"
                  placeholder="abe-takashi0622@email.com"
                  :rules="[rules.required, rules.email]"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="tel"

                  dense
                  label="電話番号"
                  placeholder="080-1234-5678"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="plans"

                  label="プラン"
                  dense
                  v-model="plan"
                  :rules="[rules.required]"
                  placeholder="---"
                ></v-select>
              </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="experience_month"
              label="経験月数"
              placeholder="12"
              :rules="[rules.required]"
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
            </v-row>
            <v-btn
              color="cyan"
              rounded
              type="submit"
              @click="update()"
              class="signup_btn"
            >
              <v-icon>mdi-autorenew</v-icon>登録内容を変更
            </v-btn>
          </v-form>
        </v-list-item>
      </v-card>
  </v-row>
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
      level: "",
      plans: ["PREMIUM", "STANDARD"],
      selectLevel: [],
      rules: {
        required: (value) => !!value || "必須項目です。",
        email: (value) =>
          /.+@.+/.test(value) || "メールアドレスの形式が正しくありません",
      },
    };
  },
  computed: {
    ...mapState(["student", "isShow", "levels", "isTheme"]),
  },
  mounted() {
    this.getUser(this.$route.params.id).then(() => {
      this.levels.forEach((level) => {
        this.selectLevel.push(level.name);
      });
      this.name = this.student.name;
      this.age = this.student.age;
      this.birth = this.student.birth;
      this.mail = this.student.mail;
      this.tel = this.student.tel;
      this.plan = this.student.plan;
      this.level = this.selectLevel[this.student.level_id - 1];
    });
  },

  methods: {
    ...mapActions(["getUser", "updateStudent", "close", "drawer"]),
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
          level: this.level,
        });
      }
    },
  },
};
</script>
<style scoped>
.signup_btn {
  margin-bottom: 24px;
}
</style>
