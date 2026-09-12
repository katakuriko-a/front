<template>
  <v-main>
    <v-card width="97%" :dark="isTheme" class="mt-12 mx-auto pa-8">
      <p class="sum_number">{{ students.length }}件</p>
      <v-simple-table  :dark="isTheme" fixed-header >
        <thead>
          <tr>
            <th width="24px">roles</th>
            <th>名前</th>
            <th>年齢</th>
            <th>生年月日</th>
            <th>e-mail</th>
            <th>TEL</th>
            <th>月数</th>
            <th>スキル</th>
            <th>プラン名</th>
            <th>料金</th>
            <th>その他オプション</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td v-if="student.roles_id == 1">
              <v-sheet dark class="text-center" rounded="pill" color="red">
                生徒</v-sheet
              >
            </td>
            <td v-if="student.roles_id == 2">
              <v-sheet dark class="text-center" rounded="pill" color="cyan">
                先生</v-sheet
              >
            </td>
            <td v-if="student.roles_id == 99">
              <v-sheet dark class="text-center" rounded="pill" color="green">
                管理人</v-sheet
              >
            </td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.birth }}</td>
            <td>{{ student.mail }}</td>
            <td>{{ student.tel }}</td>
            <td>{{ student.experience_month }}</td>
            <td>{{ student.skill }}</td>
            <td>{{ student.plan || "------" }}</td>
            <td>{{ student.fee || "------" }}</td>
            <td>
              <div class="btn_group">
                <v-btn class="btn" nuxt :to="`/admin/${student.id}/edit`">
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
                <v-btn class="btn" nuxt :to="`admin/${student.id}/progress`">
                  <v-icon> mdi-comment-edit-outline</v-icon>
                </v-btn>

                <v-btn class="btn" @click="deleteUsers(student.id)">
                  <v-icon> mdi-delete-outline </v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-alert text dense type="warning" v-if="isStudents">
        データが見つかりませんでした
      </v-alert>
    </v-card>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="4"
        :dark="isTheme"
        color="#7ac8e4"
      ></v-pagination>
    </div>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      page: 1,
    };
  },

  mounted() {
    this.getUsers();
    console.log(this.students);
    this.close();
  },
  computed: {
    ...mapState(["students", "isStudents", "isTheme"]),
  },

  methods: {
    ...mapActions(["getUsers", "deleteUsers", "close"]),
  },
};
</script>
<style scoped>
td:nth-of-type(1){
  min-width: 100px;
}
td:nth-of-type(2){
  min-width: 160px;
}
td:nth-of-type(3){
  min-width: 100px;
}
td:nth-of-type(5){
  min-width: 200px;
}
td:nth-of-type(6){
  min-width: 200px;
}
td:nth-of-type(7){
  min-width: 100px;
}
td:nth-of-type(8){
  min-width: 160px;
}
td:nth-of-type(9){
  min-width: 120px;
}
td:nth-of-type(10){
  min-width: 120px;
}
</style>
