<template>
  <v-app>
    <Appbar />
    <Sidebar />
    <v-main class="new_wrapper">
      <v-card :dark="isTheme" class="main_content">
        <h2>新規投稿を作成</h2>
        <!-- {{-- ここからフォーム --}} -->
        <v-form ref="form" @submit.prevent>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="title"
                filled
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
                dense
                label="投稿内容"
                placeholder="本文を入力してください"
                :rules="[rules.required]"
              ></v-textarea>
            </v-col>
            <v-col cols="5"></v-col>
            <v-col cols="4">
              <v-btn color="cyan" type="submit" @click="store()">
                <v-icon>mdi-plus</v-icon>新規投稿
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Sidebar from "~/components/students/sidebar";
import Appbar from '../../../components/students/appbar.vue';

export default {
  components: {
    Sidebar,
    Appbar,
  },
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
  computed: {
    ...mapState(["isShow", "isTheme"]),
  },
  methods: {
    ...mapActions(["addProgress", "close", "drawer"]),
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
