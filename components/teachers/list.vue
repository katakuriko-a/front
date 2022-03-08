<template>
  <v-main >
    <div class="main_wrapper">
      <p class="sum_number">{{teachers.length}}件</p>
      <v-card :dark="isTheme" class="main_content" >
        <v-simple-table :dark="isTheme" class="teachers_table">
          <thead>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>メンター歴</th>
              <th>料金</th>
              <th>使用言語</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachers" :key="teacher.id">
              <td>{{ teacher.name }}</td>
              <td>{{ teacher.age }}</td>
              <td>{{ teacher.career }}年</td>
              <td>{{ teacher.fee }}円/h</td>
              <td>{{ teacher.language }}</td>
              <td>
                <div class="btn_group">
                  <NuxtLink :to="'/teachers/' + teacher.id">
                    <v-btn color="primary">
                      予約ページへ
                    </v-btn>
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-alert text dense type="warning" v-if="isTeachers">
          データが見つかりませんでした
        </v-alert>
      </v-card>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
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
    this.getTeachers();
  },
  computed: {
    ...mapState(["teachers", "isTeachers", "isTheme"]),
  },

  methods: {
    ...mapActions(["getTeachers"]),
  },
};
</script>
