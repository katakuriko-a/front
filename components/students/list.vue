<template>
  <div>
    <div class="main_wrapper">
      <p class="sum_number">15件</p>
      <div class="main_content">
        <v-simple-table class="students_table" >
          <thead>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>生年月日</th>
              <th>e-mail</th>
              <th>TEL</th>
              <th>プラン名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
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
                    @click="deleteStudents(student.id)"
                    class="delete_btn btn btn_option btn_option"
                  >
                    削除
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-alert text dense type="warning" v-if="isStudents">
          データが見つかりませんでした
        </v-alert>
      </div>
    </div>
    <div class="pagers">
      <a href="#"><div class="pager active btn_option">1</div></a>
      <a href="#"><div class="pager btn_option">2</div></a>
      <a href="#" class="next">
        <fa class="fas fa-home" :icon="['fas', 'angle-right']"
      /></a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  mounted() {
    this.getStudents();
  },
  computed: {
    ...mapState(["students", "isStudents"]),
  },

  methods: {
    ...mapActions(["getStudents", "deleteStudents"]),
  },
};
</script>
