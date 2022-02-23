<template>
  <v-app>
    <div class="new_wrapper">
      <div class="main_content signup_content">
        <h2>新規投稿を作成</h2>
        <!-- {{-- ここからフォーム --}} -->
        <v-form ref="form" @submit.prevent>
          <div class="form_group form_title">
            <label for="title">タイトル</label>
            <v-text-field
              class="form_parts"
              id="title"
              type="text"
              v-model="title"
              placeholder="タイトルを入力してください"
              :rules="[rules.required]"
            />
          </div>
          <div class="form_group form_content">
            <label for="content">投稿内容</label>
            <v-textarea
              class="form_parts"
              v-model="content"
              placeholder="投稿内容を入力してください"
              :rules="[rules.required]"
            ></v-textarea>
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
      title: "進捗報告新規作成画面",
    };
  },
  data() {
    return {
      title: "",
      content: "",
      rules: {
        required: (value) => !!value || "必須項目です。",
      },
    };
  },
  methods: {
    ...mapActions(["addProgress"]),
    store() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addProgress", {
          id: this.$route.params.id,
          title: this.title,
          content: this.content,
        });
      }
    },
  },
};
</script>
