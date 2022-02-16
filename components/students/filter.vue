<template>
  <div>
    <div @click="coverClick()" class="cover" :class="{ show: show }"></div>
    <div class="filter_list" :class="{ open: open }">
      <div @click="backClick()" class="back btn_option">←</div>
      <form method="get" action="" class="filter_form">
        <div class="filter_group">
          <label for="">名前</label>
          <input type="text" name="name" id="" />
        </div>
        <div class="filter_group">
          <label for="">年齢</label>
          <input type="number" name="age" id="" />
        </div>
        <div class="filter_group">
          <label for="">生年月日</label>
          <input type="text" name="birth" id="" />
        </div>
        <div class="filter_group">
          <label for="">e-mail</label>
          <input type="text" name="mail" id="" />
        </div>
        <div class="filter_group">
          <label for="">電話番号</label>
          <input type="text" name="tel" id="" />
        </div>
        <div class="filter_group">
          <label for="">プラン</label>
          <input type="radio" name="plan" id="" value="STANDARD" /><span
            >STANDARD</span
          >
          <input type="radio" name="plan" id="" value="PREMIUM" />PREMIUM
        </div>
        <input
          type="submit"
          name=""
          id=""
          value="検索"
          class="filter_btn btn_option"
        />
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
  },
};
</script>
