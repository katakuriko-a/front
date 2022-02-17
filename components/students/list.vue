<template>
  <div>
    <div class="main_wrapper">
      <p class="sum_number">15件</p>
      <div class="main_content">
        <table>
          <tbody>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>生年月日</th>
              <th>e-mail</th>
              <th>TEL</th>
              <th>プラン名</th>
            </tr>
            <tr v-for="student in students" :key="student.name">
              <td>{{ student.name }}</td>
              <td>{{ student.age }}</td>
              <td>{{ student.birth }}</td>
              <td>{{ student.mail }}</td>
              <td>{{ student.tel }}</td>
              <td>{{ student.plan }}</td>
              <td>
                <div class="btn_group">
                  <NuxtLink :to="'/progress/' + student.id">
                    <div class="progress_btn btn btn_option">進捗報告</div>
                  </NuxtLink>
                  <NuxtLink :to="'/students/' + student.id">
                    <div class="edit_btn btn btn_option">編集</div>
                  </NuxtLink>
                  <div
                    @click="destroy(student.id)"
                    class="delete_btn btn btn_option btn_option"
                  >
                    削除
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagers">
      <a href="#"><div class="pager active btn_option">1</div></a>
      <a href="#"><div class="pager btn_option">2</div></a>
      <a href="#" class="next"> <fa class="fas fa-home" :icon="['fas', 'angle-right']" /></a>
    </div>
    {{ doubleCount }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      students: [],
    };
  },
  computed:{
    doubleCount(){
      return this.$store.getters.doubleCount;
    }
  },
  mounted() {
    axios
      .get("http://localhost/api")
      .then((res) => {
        this.students = res.data;
      })
      .catch((error) => {
        console.log(error);
        this.result = "ERROR";
      });
  },
  methods: {
    destroy(id) {
      axios
        .delete(`http://localhost/api/destroy/${id}`)
        .then((res) => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      const request = {
        name: this.name,
        age: this.age,
        birth: this.birth,
        mail: this.mail,
        tel: this.tel,
        plan: this.plan,
      };
      axios
        .get("http://localhost/api", request)
        .then((res) => {
          console.log("search!!!!");
          this.students = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
