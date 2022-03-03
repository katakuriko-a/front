<template>
  <v-app>
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer()"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="new_wrapper">
      <v-card dark class="main_content">
        <h2>投稿内容を編集</h2>
        <!-- {{-- ここからフォーム --}} -->
        <v-list-item>
          <v-form ref="form" @submit.prevent method="post" action="">
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="title"
                  filled
                  rounded
                  dense
                  label="タイトル"
                  placeholder="タイトルを入力してください"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="content"
                  filled
                  rounded
                  dense
                  label="投稿内容"
                  placeholder="本文を入力してください"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="5"></v-col>
              <v-col cols="4">
                <v-btn
                  dark
                  color="cyan"
                  rounded
                  type="submit"
                  @click="update()"
                >
                  <v-icon>mdi-autorenew</v-icon>内容を変更する
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-list-item>
      </v-card>
    </v-main>
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
    ...mapState(["post", "isShow"]),
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
    ...mapActions(["getPost", "updatePost", "close", "drawer"]),
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
