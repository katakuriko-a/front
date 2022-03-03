<template>
  <v-card width="12%" :dark="isTheme" absolute class="card">
    <v-row justify="center" class="row">
      <v-icon>mdi-weather-sunny</v-icon>
      <v-switch
        append-icon="mdi-weather-night"
        class="switch"
        color="cyan"
        @click="theme()"
      ></v-switch>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState(["isTheme"]),
  },

  methods: {
    ...mapActions(["theme"]),
  },
};
</script>
<style scoped>
.card {
  margin-left: auto;
  margin-right: 24px;
  margin-top: 24px;
}
.switch {
  margin-left: 16px;
}
.row {
  margin-left: -4px;
}
</style>
