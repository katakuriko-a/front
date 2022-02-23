<template>
  <div>
    <div @click="close()" class="cover" :class="{ show: isShow }"></div>
    <div class="filter_list" :class="{ open: isOpen }">
      <div @click="close()" class="back btn_option">←</div>
      <form @submit.prevent method="get" action="" class="filter_form">
        <div class="filter_group">
          <label for="">名前</label>
          <input type="text" v-model="name" />
        </div>
        <div class="filter_group">
          <label for="">年齢</label>
          <input type="number" v-model="age" />
        </div>
        <div class="filter_group">
          <label for="">生年月日</label>
          <input type="text" v-model="birth" />
        </div>
        <div class="filter_group">
          <label for="">e-mail</label>
          <input type="text" v-model="mail" />
        </div>
        <div class="filter_group">
          <label for="">電話番号</label>
          <input type="text" v-model="tel" />
        </div>
        <div class="filter_group">
          <label for="">プラン</label>
          <input type="radio" v-model="plan" value="STANDARD" /><span
            >STANDARD</span
          >
          <input type="radio" v-model="plan" value="PREMIUM" />PREMIUM
        </div>
        <button @click="filterClick()" class="filter_btn btn_option">
          検索
        </button>
      </form>
    </div>
    <div :class="{ popup: isPopup }" class="csv-downloader">
      <v-form ref="form" @submit.prevent>
        <div @click="close()" class="back btn_option">←</div>
        <div class="input_filename">
          <v-text-field
            type="text"
            v-model="filename"
            placeholder="ファイル名"
            :rules="[rules.required]"
          /><span>.csv</span>
        </div>
        <input
          @click="csvClick(filename)"
          class="btn_option"
          type="submit"
          value="csv形式でファイルをダウンロード"
        />
      </v-form>
    </div>
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
    ...mapState(["isOpen", "isPopup", "isShow"]),
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
