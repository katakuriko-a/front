<template>
  <div>
    <div class="side_menu">
      <div class="side_wrapper">
        <NuxtLink to="/students">
          <div class="img_logo">
            <img src="~/static/img/logo.png" alt="ロゴ画像" />
          </div>
        </NuxtLink>
        <NuxtLink to="/students/create">
          <div class="btn_new btn_option">
            <fa class="fas fa-home" :icon="['fas', 'plus']" /><span>新規登録画面</span>
          </div>
        </NuxtLink>
        <nav>
          <ul>
            <NuxtLink to="/students">
              <li><fa class="fas fa-home" :icon="['fas', 'home']" />トップページ</li>
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
