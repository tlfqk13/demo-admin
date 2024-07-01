<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>바스코리아</v-toolbar-title>
      <v-spacer />
      <v-menu
        v-model="userMenu"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
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

        <!-- 견적관리 그룹 -->
        <v-list-group
          v-model="expanded"
          prepend-icon="mdi-folder"
          append-icon="mdi-menu-down"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="white--text">견적관리</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="'/inquiry'" class="sub-item">
            <v-list-item-icon>
              <v-icon class="white--text">mdi-table</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">견적 신규 생성</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/estimateManagement'" class="sub-item">
            <v-list-item-icon>
              <v-icon class="white--text">mdi-table</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">견적 관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- 나머지 메뉴 항목들 -->
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
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    expanded: true, // 견적관리 그룹의 확장 상태를 저장하는 데이터 속성
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: '매출처 코드 목록', icon: 'mdi-invoice-arrow-right-outline', to: '/customer-code' },
      { title: '매입처 코드 목록', icon: 'mdi-invoice-arrow-left', to: '/supplier-code' },
      { title: '선박 코드 목록', icon: 'mdi-ferry', to: '/ship-code' },
      { title: 'User Profile', icon: 'mdi-account', to: '/profile' },
      { title: 'Forms', icon: 'mdi-account', to: '/forms' },
      { title: 'Make Inquiry', icon: 'mdi-account', to: '/make-inquiry' }
    ],
    userMenu: false, // 사용자 메뉴의 열림/닫힘 상태를 저장하는 데이터 속성
  }),
};
</script>

<style scoped>
.navigation-drawer {
  background-color: #212121;
}
.sub-item {
  padding-left: 32px; /* 하위 메뉴 항목에 대한 들여쓰기 */
}
</style>
