<template>
   <div class="main_wrapper">
      <div class="main_content signup_content">
        <h2>登録内容編集画面</h2>
        <form method="post" action="">

          <div class="form_group form_name">
            <label for="name">名前</label>
            <input
              class="form_parts"
              id="name"
              type="text"
              name="name"
              placeholder="阿部 隆"
              value=""
            />
          </div>
          <div class="form_group form_age">
            <label for="age">年齢</label>
            <input class="form_parts" id="age" name="age" type="text" placeholder="21"
            value="" />
          </div>
          <div class="form_group form_birth">
            <label for="birth">生年月日</label>
            <input
              class="form_parts"
              id="birth"
              name="birth"
              type="text"
              placeholder="2000/6/21"
              value=""
            />
          </div>
          <div class="form_group form_mail">
            <label for="mail">e-mail</label>
            <input
              class="form_parts"
              id="mail"
              name="mail"
              type="email"
              placeholder="abe-takashi0622@email.com"
              value=""
            />
          </div>
          <div class="form_group form_tel">
            <label for="tel">TEL</label>
            <input
              class="form_parts"
              id="tel"
              name="tel"
              type="tel"
              placeholder="080-1234-5678"
              value=""
            />
          </div>
          <div class="form_group form_plan">
            <label for="plan">プラン名</label>
            <select class="form_parts" id="plan" name="plan" onchange="changeColor(this)">
              <option value="">---</option>
              <option>PREMIUM</option>
              <option>STANDARD</option>
            </select>
          </div>
          <button class="signup_btn btn_option">
            <i class="fas fa-plus big_plus"></i>内容を変更する
          </button>
        </form>
      </div>
    </div>
</template>
