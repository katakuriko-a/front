<template>
  <v-app>
    <div class="main_wrapper">
      <div class="main_content signup_content">
        <h2>投稿内容を編集</h2>
        <!-- {{-- ここからフォーム --}} -->
        <v-form ref="form" @submit.prevent method="post" action="">
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
            >
              本文
            </v-textarea>
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
      title: "進捗報告編集画面",
    };
  },
  computed: {
    ...mapState(["post"]),
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
  mounted() {
    this.getPost(this.$route.params.id).then(() => {
      this.title = this.post.title;
      this.content = this.post.content;
    });
  },
  methods: {
    ...mapActions(["getPost", "updatePost"]),
    update() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updatePost", {
          id: this.$route.params.id,
          student_id: this.post.student_id,
          title: this.title,
          content: this.content,
        });
      }
    },
  },
};
</script>
