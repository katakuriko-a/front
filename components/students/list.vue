<template>
  <v-main >
    <div class="main_wrapper" >
      <p class="sum_number">{{students.length}}件</p>
      <v-card :dark="isTheme" class="main_content" >
        <v-simple-table :dark="isTheme" class="students_table">
          <thead>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>生年月日</th>
              <th>e-mail</th>
              <th>TEL</th>
              <th>プラン名</th>
              <th>レベル</th>
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
              <td v-if="student.level_id == 1">
                <v-sheet dark class="px-2" align="center" rounded color="green lighten-1">
                初級
                </v-sheet>
              </td>
              <td v-if="student.level_id == 2">
                <v-sheet dark class="px-2" align="center" rounded color="green darken-1">
                初中級
                </v-sheet>
              </td>
              <td v-if="student.level_id == 3">
                <v-sheet dark class="px-2" align="center" rounded color="green darken-2">
                中級
                </v-sheet>
              </td>
              <td v-if="student.level_id == 4">
                <v-sheet dark class="px-2" align="center" rounded color="green darken-3">
                中上級
                </v-sheet>
              </td>
              <td v-if="student.level_id == 5">
                <v-sheet dark class="px-2" align="center" rounded color="green darken-4">
                上級
                </v-sheet>
              </td>
              <td>
                <div class="btn_group">
                  <NuxtLink :to="'/progress/' + student.id">
                    <v-btn>
                      <v-icon>mdi-comment-outline</v-icon>
                    </v-btn>
                  </NuxtLink>
                  <NuxtLink :to="'/students/' + student.id">
                    <v-btn class="btn">
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </NuxtLink>
                  <v-btn class="btn" @click="deleteStudents(student.id)">
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
