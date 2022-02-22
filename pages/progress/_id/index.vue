<template>
  <v-app>
    <div>
      <NuxtLink :to="'/progress/' + this.$route.params.id + '/create'">
        <div class="new_posts btn_option">
          <i class="fas fa-plus"></i><span>新規投稿</span>
        </div>
      </NuxtLink>
      <div class="main_wrapper">
        <div class="main_content signup_content">
          <h2>進捗報告</h2>
          <table>
            <tbody>
              <tr>
                <th >投稿日時</th>
                <th>タイトル</th>
                <th>本文</th>
              </tr>

              <tr v-for="post in progress" :key="post.title">
                <td class="td_date">{{$dateFns.format(new Date(post.created_at), 'yyyy/MM/dd')}}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.content }}</td>
                <td>
                  <div class="btn_group">
                    <NuxtLink :to="'/progress/' + post.id + '/edit'">
                      <div class="edit_btn btn btn_option">編集</div>
                    </NuxtLink>
                    <form
                      @submit.prevent
                      @click="deleteProgress(post.id)"
                      class="destroy"
                      method="post"
                      action=""
                      id="destroy"
                    >
                      <button class="delete_btn btn btn_option">削除</button>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <v-alert text dense type="warning" v-if="isProgress">
            投稿がまだありません。
          </v-alert>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import {mapState, mapActions} from "vuex";

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
    ...mapState(["progress", "isProgress"]),
  },
  mounted() {
    this.getProgress(this.$route.params.id);
  },
  methods: {
        ...mapActions(["getProgress","deleteProgress"]),
  },
};
</script>
