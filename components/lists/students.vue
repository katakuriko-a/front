<template>
  <v-main>
    <div>
      <v-card :dark="isTheme" class="main_content mx-auto mt-10" width="90%">
      <p class="sum_number">{{ students.length }}件</p>
        <v-simple-table :dark="isTheme" class="students_table">
          <thead>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>プラン名</th>
              <th>経験月数</th>
              <th>スキル</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.name }}</td>
              <td>{{ student.age }}</td>
              <td>{{ student.plan }}</td>
              <td>{{ student.experience_month }}</td>
              <td>{{ student.skill }}</td>

            </tr>
          </tbody>
        </v-simple-table>
        <v-alert text dense type="warning" v-if="isStudents">
          データが見つかりませんでした
        </v-alert>
      </v-card>
    </div>
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
    this.getStudents();
    this.close();
  },
  computed: {
    ...mapState(["students", "isStudents", "isTheme"]),
  },

  methods: {
    ...mapActions(["getStudents", "deleteStudents", "close"]),
  },
};
</script>
