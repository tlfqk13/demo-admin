<template>
  <v-card class="profile-card pa-6">
    <v-row align="center" class="mx-4">
      <v-avatar size="150" class="mr-4">
        <v-img src="@/assets/profile.jpeg" alt="Profile Picture"></v-img>
      </v-avatar>
      <v-col>
        <v-card-text class="user-name">{{ userName }}</v-card-text>
        <v-card-text class="user-position">{{ userPosition }}</v-card-text>
        <v-card-text class="text-left email-section">
          <v-icon class="mr-2">mdi-email</v-icon>
          {{ userEmail }}
        </v-card-text>
      </v-col>
    </v-row>
    <v-list dense class="mt-4">
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Profile</v-list-item-title>
          <v-list-item-subtitle>Account settings</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="blue">mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Inbox</v-list-item-title>
          <v-list-item-subtitle>Messages & Emails</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="purple">mdi-check-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Tasks</v-list-item-title>
          <v-list-item-subtitle>To-do and Daily tasks</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="my-4"></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="primary" class="ma-2" block>Upgrade</v-btn>
    </v-card-actions>
    <v-card-actions class="justify-center">
      <v-btn color="secondary" outlined block @click="$emit('logout')">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      userName: "춘식이",
      userPosition: "사원",
      userEmail: "info@modernize.com"
    };
  }
};
</script>

<style scoped>
.profile-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.user-name {
  padding-bottom: 4px; /* 간격 줄임 */
}
.user-position {
  padding-top: 0;
  padding-bottom: 2px; /* 간격 줄임 */
}
.email-section {
  display: flex;
  align-items: center;
  margin-top: 0; /* 간격 줄임 */
}
</style>
