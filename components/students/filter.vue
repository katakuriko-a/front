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
        <button @click="search()" class="filter_btn btn_option">検索</button>
      </form>
    </div>
    <div :class="{ popup: popup }" class="csv-downloader">
      <form method="get" action="">
        <div @click="backClick()" class="back btn_option">←</div>
        <div class="input_filename">
          <input type="text" name="filename" placeholder="ファイル名" /><span
            >.csv</span
          >
        </div>
        <input
          class="btn_option"
          type="submit"
          value="csv形式でファイルをダウンロード"
        />
      </form>
    </div>
  </div>
</template>
<script>
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
    csv() {
      this.popup = !this.popup;
      this.show = !this.show;
    },
    search() {
      this.$emit("searchClick");
    },
  },
};
</script>
