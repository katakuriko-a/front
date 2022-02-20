<template>
  <div class="new_wrapper">
    <div class="main_content signup_content">
      <h2>新規投稿を作成</h2>
      <!-- {{-- ここからフォーム --}} -->
      <form @submit.prevent method="get" action="">
        <div class="form_group form_title">
          <label for="title">タイトル</label>
          <input
            class="form_parts"
            id="title"
            type="text"
            v-model="title"
            placeholder="タイトルを入力してください"
            value=""
          />
        </div>
        <div class="form_group form_content">
          <label for="content">投稿内容</label>
          <textarea
            class="form_parts"
            v-model="content"
            id=""
            placeholder="投稿内容を入力してください"
          ></textarea>
        </div>
        <button @click="store()" class="signup_btn btn_option">
          <i class="fas fa-plus big_plus"></i>新規登録
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    };
  },
  methods: {
    store() {
      console.log("i'm in store methods");
      const request = {
        title: this.title,
        content: this.content,
      };
      axios
        .post(
          `http://localhost/api/progress/${this.$route.params.id}/store`,
          request
        )
        .then((res) => {
          this.$router.push(`/progress/${this.$route.params.id}`);
        })
        .catch((error) => {
          console.log(error);
          this.result = "ERROR";
        });
    },
  },
};
</script>
