<template>
  <div>
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <v-navigation-drawer
      :dark="isTheme"
      right
      :value="isOpen"
      absolute
      temporary
      hide-overlay
    >
      <v-icon @click="close()" class="back">mdi-backspace-outline</v-icon>
      <v-list-item>
        <v-form @submit.prevent>
          <v-text-field
            label="名前"
            filled
            rounded
            v-model="name"
            dense
          ></v-text-field>
          <v-text-field
            label="年齢"
            filled
            rounded
            v-model="age"
            dense
          ></v-text-field>
          <v-text-field
            label="生年月日"
            filled
            rounded
            v-model="birth"
            dense
          ></v-text-field>
          <v-text-field
            label="メールアドレス"
            filled
            rounded
            v-model="mail"
            dense
          ></v-text-field>
          <v-text-field
            label="電話番号"
            filled
            rounded
            v-model="tel"
            dense
          ></v-text-field>

          <v-checkbox
            v-model="plan"
            color="cyan"
            label="STANDARD"
            value="STANDARD"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="plan"
            color="cyan"
            label="PREMIUM"
            value="PREMIUM"
            hide-details
          ></v-checkbox>
          <v-btn class="search_btn" block type="submit" @click="filterClick()">
            検索
          </v-btn>
        </v-form>
      </v-list-item>
    </v-navigation-drawer>
    <!-- <div :class="{ popup: isPopup }" class="csv-downloader">
      <v-form ref="form" @submit.prevent>
        <div @click="close()" class="back btn_option">←</div>
      </v-form>
    </div> -->

    <v-dialog
      v-model="isPopup"
      persistent
      max-width="290"
      class="csv-downloader"
    >
      <v-card :dark="isTheme" elevation="2" outlined>
        <v-form class="csv_form" ref="form" @submit.prevent>
          <v-icon @click="close()" class="back">mdi-backspace-outline</v-icon>
          <div class="input_filename">
            <v-text-field
              type="text"
              v-model="filename"
              placeholder="ファイル名"
              :rules="[rules.required]"
            /><span class="extention">.csv</span>
          </div>
          <v-card-actions>
            <v-btn type="submit" @click="csvClick(filename)">
              csv形式でファイルをダウンロード
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      age: "",
      birth: "",
      mail: "",
      tel: "",
      plan: "",
      filename: "",
      rules: {
        required: (value) => !!value || "必須項目です。",
      },
    };
  },
  computed: {
    ...mapState(["isOpen", "isPopup", "isShow", "isTheme"]),
  },
  methods: {
    ...mapActions(["filterStudents", "close", "getCsv"]),

    filterClick() {
      this.$store.dispatch("filterStudents", {
        name: this.name,
        age: this.age,
        birth: this.birth,
        mail: this.mail,
        tel: this.tel,
        plan: this.plan,
      });
    },

    csvClick() {
      if (this.$refs.form.validate()) {
        this.getCsv(this.filename);
      }
    },
  },
};
</script>
<style scoped>
.v-navigation-drawer {
  z-index: 300;
}
.search_btn {
  margin-top: 24px;
}
.extention {
  margin-top: 24px;
}
.csv_form {
  margin-top: 0;
}
</style>
