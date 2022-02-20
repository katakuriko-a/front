<template>
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
              <th>タイトル</th>
              <th>本文</th>
            </tr>

            <tr v-for="post in posts" :key="post.title">
              <td>{{ post.title }}</td>
              <td>{{ post.content }}</td>
              <td>
                <div class="btn_group">
                  <NuxtLink :to="'/progress/' + post.id + '/edit'">
                    <div class="edit_btn btn btn_option">編集</div>
                  </NuxtLink>
                  <form
                    @submit.prevent
                    @click="destroy(post.id)"
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
        <div v-if="isPosts" class="alert alert-danger" role="alert">
          データが見つかりませんでした。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  mounted() {
    axios
      .get(`http://localhost/api/progress/${this.$route.params.id}`)
      .then((res) => {
        this.posts = res.data;
        if (this.posts[0] == null) {
          this.isPosts = true;
        }
      })
      .catch((error) => {
        console.log(error);
        this.result = "ERROR";
      });
  },
  methods: {
    destroy(id) {
      axios
        .delete(`http://localhost/api/progress/${id}/destroy`)
        .then(() => {
          console.log("削除！");
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
