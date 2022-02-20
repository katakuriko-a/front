<template>
  <div>
    <div @click="coverClick()" class="cover" :class="{ show: show }"></div>
    <div class="filter_list" :class="{ open: open }">
      <div @click="backClick()" class="back btn_option">←</div>
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
        <button @click="searchClick()" class="filter_btn btn_option">
          検索
        </button>
      </form>
    </div>
    <div :class="{ popup: popup }" class="csv-downloader">
      <form @submit.prevent method="get" action="">
        <div @click="backClick()" class="back btn_option">←</div>
        <div class="input_filename">
          <input type="text" v-model="filename" placeholder="ファイル名" /><span
            >.csv</span
          >
        </div>
        <input
          @click="csv()"
          class="btn_option"
          type="submit"
          value="csv形式でファイルをダウンロード"
        />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      open: false,
      show: false,
      popup: false,
      name: "",
      age: "",
      birth: "",
      mail: "",
      tel: "",
      plan: "",
      filename: "",
    };
  },
  methods: {
    showFilter() {
      this.open = !this.open;

      this.show = !this.show;
    },
    backClick() {
      this.open = false;
      this.show = false;
      this.popup = false;
    },
    coverClick() {
      this.open = false;
      this.show = false;
      this.popup = false;
    },
    csvOpen() {
      this.popup = !this.popup;
      this.show = !this.show;
    },
    csv() {
      axios
        .get("http://localhost/api/csv", {
          responseType: "blob",
        })
        .then((res) => {
          const url = URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${this.filename}.csv`); //ここらへんは適当に設定する
          document.body.appendChild(link);
          link.click();

          this.popup = !this.popup;
          this.show = !this.show;
        })
        .catch((error) => {
          console.log(error);
          this.result = "ERROR";
        });
    },

    searchClick() {
      axios
        .get("http://localhost/api", {
          params: {
            name: this.name,
            age: this.age,
            birth: this.birth,
            mail: this.mail,
            tel: this.tel,
            plan: this.plan,
          },
        })
        .then((res) => {
          this.students = res.data;
          console.log(this.students);
          this.$emit("filtered-students", this.students);
          this.open = false;
          this.show = false;
          this.popup = false;
        })
        .catch((error) => {
          console.log(error);
          this.result = "ERROR";
        });
    },
  },
};
</script>
