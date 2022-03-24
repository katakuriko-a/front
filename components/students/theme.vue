<template>
  <v-card width="12%" :dark="!isTheme" absolute class="card">
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
  position: fixed;
  z-index: 200;
  opacity: 0.8;
  right: 24px;
  top: 94px;
}
.switch {
  margin-left: 16px;
}
.row {
  margin-left: -4px;
}
</style>
