
<template>
  <v-main>
    <div class="new_wrapper">
      <p class="sum_number">{{ teachers.length }}件</p>
      <v-card :dark="isTheme" class="main_content">
        <v-simple-table :dark="isTheme" class="teachers_table">
          <thead>
            <tr>
              <th>名前</th>
              <th>年齢</th>
              <th>メンター歴</th>
              <th>料金/1時間</th>
              <th>スキル</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachers" :key="teacher.id">
              <td>{{ teacher.name }}</td>
              <td>{{ teacher.age }}</td>
              <td>{{ teacher.experience_month }}ヶ月</td>
              <td>{{ teacher.fee }}円</td>
              <td>{{ teacher.skill }}</td>
              <td>
                <div class="btn_group">
                  <NuxtLink :to="'/teachers/' + teacher.id">
                    <v-btn color="primary"> 予約ページへ </v-btn>
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
        :length="2"
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
