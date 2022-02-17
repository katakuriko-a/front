<template>
   <div class="main_wrapper">
        <div class="main_content signup_content">
            <h2>投稿内容を編集</h2>
            <!-- {{-- ここからフォーム --}} -->
            <form @submit.prevent method="post" action="">

                <div class="form_group form_title">
                    <label for="title">タイトル</label>
                    <input
                        class="form_parts"
                        id="title"
                        type="text"
                        v-model="title"
                        placeholder="タイトルを入力してください"
                    />
                </div>
                <div class="form_group form_content">
                    <label for="content">投稿内容</label>
                    <textarea
                        class="form_parts"
                        v-model="content"
                        id=""
                        placeholder="投稿内容を入力してください"
                        >本文</textarea
                    >
                </div>
                <button @click="update()" class="signup_btn btn_option">
                    <i class="fas fa-plus big_plus"></i>新規登録
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: "",
      student_id:"",
    };
  },
  mounted() {
    axios
      .get(`http://localhost/api/progress/${this.$route.params.id}/edit`)
      .then((res) => {
        console.log(res);
        this.title = res.data.title;
        this.content = res.data.content;
        this.student_id = res.data.student_id;
      })
      .catch((error) => {
        console.log(error);
        this.result = "ERROR";
      });
  },
  methods: {
    update() {
      const request = {
        title: this.title,
        content: this.content,
      };
      axios
        .post(`http://localhost/api/progress/${this.$route.params.id}/update`, request)
        .then((res) => {
          this.$router.push(`/progress/${this.student_id}`);
        })
        .catch((error) => {
          console.log(error);
          this.result = "ERROR";
        });
    },
  },
};
</script>
