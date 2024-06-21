<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>바스코리아</v-toolbar-title>
      <v-spacer />
      <v-menu
          v-model="profileMenu"
          offset-y
          :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <UserProfile @logout="logout" />
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app dark color="black" class="navigation-drawer">
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="@/assets/logo.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="white--text">BAS KOREA</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
            class="py-2"
            active-class="green lighten-2 white--text"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserProfile from "@/views/UserProfile.vue";

export default {
  name: 'App',
  components: {
    UserProfile
  },
  data: () => ({
    drawer: false,
    profileMenu: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Inquiry', icon: 'mdi-table', to: '/inquiry' },
      { title: 'EstimateManagement', icon: 'mdi-table', to: '/estimateManagement' },
      { title: '매출처 코드 목록', icon: 'mdi-invoice-arrow-right-outline', to: '/customer-code' },
      { title: '매입처 코드 목록', icon: 'mdi-invoice-arrow-left', to: '/supplier-code' },
      { title: '선박 코드 목록', icon: 'mdi-ferry', to: '/ship-code' },
      { title: 'User Profile', icon: 'mdi-account', to: '/profile' },
      { title: 'Forms', icon: 'mdi-account', to: '/forms' },
      { title: 'EstimateGrouped', icon: 'mdi-account', to: '/estimate-grouped' }
    ],
  }),
  methods: {
    logout() {
      // 로그아웃 처리 로직
      this.$router.push('/logout');
    }
  }
};
</script>

<style>
.navigation-drawer {
  background-color: #212121;
}
</style>
