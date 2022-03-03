<template>
  <v-app>
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <v-app-bar :dark="isTheme">
      <v-app-bar-nav-icon @click="drawer()"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <NuxtLink :to="'/progress/' + this.$route.params.id + '/create'">
        <v-btn color="cyan">
          <v-icon>mdi-plus</v-icon><span>新規投稿</span>
        </v-btn>
      </NuxtLink>
    </v-app-bar>
    <Theme/>
    <v-main>
      <v-card :dark="isTheme" iv class="main_wrapper">
        <div class="main_content signup_content">
          <h2>進捗報告</h2>
          <v-simple-table :dark="isTheme" style="margin-top:12px">
            <thead>
              <tr>
                <th>投稿日</th>
                <th class="th_title">タイトル</th>
                <th>本文</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="post in progress" :key="post.title">
                <td class="td_date">
                  {{ $dateFns.format(new Date(post.created_at), "yyyy/MM/dd") }}
                </td>
                <td>{{ post.title }}</td>
                <td>{{ post.content }}</td>
                <td>
                  <div class="btn_group">
                    <NuxtLink :to="'/progress/' + post.id + '/edit'">
                      <v-btn class="btn">
                        <v-icon>mdi-pencil-outline</v-icon>
                      </v-btn>
                    </NuxtLink>
                    <v-btn class="btn" @click="deleteProgress(post.id)">
                      <v-icon> mdi-delete-outline </v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-alert block :dark="isTheme" dense type="warning" v-if="isProgress">
            投稿がまだありません。
          </v-alert>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Theme from "~/components/students/theme";

export default {
  head() {
    return {
      // nuxt.config.jsの%sに反映される内容
      title: "進捗報告",
    };
  },
  data() {
    return {
      posts: [],
      isPosts: false,
    };
  },
  computed: {
    ...mapState(["progress", "isProgress", "isShow", "isTheme"]),
  },
  mounted() {
    this.getProgress(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getProgress", "deleteProgress", "close", "drawer"]),
  },
    components: {
    Theme,

  },
};


</script>





