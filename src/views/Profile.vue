<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>회원 정보</v-card-title>
          <v-card-text>
            <div v-if="loading">로딩 중...</div>
            <div v-else-if="error">{{ error }}</div>
            <div v-else>
              <p><strong>ID:</strong> {{ member.id }}</p>
              <p><strong>이름:</strong> {{ member.name }}</p>
              <p><strong>이메일:</strong> {{ member.email }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MemberProfile',
  data() {
    return {
      member: {},
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchMemberInfo();
  },
  methods: {
    fetchMemberInfo() {
      this.loading = true;
      const memberId = this.$route.params.memberId;

      axios.get(`http://localhost:8888/api/member/${memberId}`)
        .then(response => {
          this.member = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.error = '오류가 발생했습니다: ' + error.message;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
