<template>
  <div>
    <v-navigation-drawer
      :dark="isTheme"
      :value="isDrawer"
      absolute
      temporary
      hide-overlay
    >
      <v-list>
        <v-list-item-group>
          <NuxtLink to="/students">
            <div class="img_logo">
              <img src="~/static/img/logo.png" alt="ロゴ画像" />
            </div>
          </NuxtLink>

          <NuxtLink to="/students/create">
            <v-btn class="btn_new">
              <fa class="fas fa-home" :icon="['fas', 'plus']" /><span
                >新規登録画面</span
              >
            </v-btn>
          </NuxtLink>
          <NuxtLink to="/students">
            <v-btn class="btn_new">
              <v-icon>mdi-home</v-icon>トップページ
            </v-btn>
          </NuxtLink>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {

  data: () => ({
  }),
  computed:{
    ...mapState(["isDrawer", "isTheme"])
  }
};
</script>
