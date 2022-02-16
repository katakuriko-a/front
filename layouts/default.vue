<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ESA ACADEMY 生徒管理システム</title>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous"
      />
      <link href="https://unpkg.com/sanitize.css" rel="stylesheet" />
      <link rel="stylesheet" href="css/style.css" />
    </head>
    <div class="side_menu">
      <div class="side_wrapper">
        <NuxtLink to="/students">
          <div class="img_logo">
            <img src="~/static/img/logo.png" alt="ロゴ画像" />
          </div>
        </NuxtLink>
        <NuxtLink to="/students/create">
          <div class="btn_new btn_option">
            <i class="fas fa-plus"></i><span>新規登録画面</span>
          </div>
        </NuxtLink>
        <nav>
          <ul>
            <NuxtLink to="/students">
              <li><i class="fas fa-home"></i>トップページ</li>
            </NuxtLink>
          </ul>
        </nav>
      </div>
      <img
        class="img_dec"
        src="~/static/img/dec-side.png"
        alt="ESA ACADEMY 生徒管理システム"
      />
    </div>
    <main>
      <Nuxt />
    </main>
    <!-- <script src="~/static/js/main.js"></script> -->
  </div>
</template>
