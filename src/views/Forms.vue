<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >

      <v-text-field
        density="compact"
        placeholder="이메일 주소 또는 아이디"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="비밀번호 입력"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-2"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        로그인
      </v-btn>

      <v-btn
        class="login-with-google-btn"
        color="white"
        size="large"
        variant="tonal"
        block
        @click="signInWithGoogle"
      >
        <v-icon left>mdi-google</v-icon>
        구글로 로그인
      </v-btn>

      <v-btn
        class="mb-2"
        color="yellow"
        size="large"
        variant="tonal"
        block
        @click="signInWithKakao"
      >
        <v-icon left>mdi-chat</v-icon>
        카카오톡으로 로그인
      </v-btn>
      <!-- 추가된 텍스트 버튼들 -->
      <v-card-text class="text-center">
        <a class="text-decoration-none mx-2" href="#" rel="noopener noreferrer">이메일 가입</a>
        <v-divider vertical></v-divider>
        <a class="text-decoration-none mx-2" href="#" rel="noopener noreferrer">이메일 찾기</a>
        <v-divider vertical></v-divider>
        <a class="text-decoration-none mx-2" href="#" rel="noopener noreferrer">비밀번호 찾기</a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'FormsTest',
  data: () => ({
    visible: false,
  }),
  methods: {
    signInWithGoogle() {
      const form = document.createElement('form');
      form.setAttribute('id', 'google-login-form');
      form.setAttribute('action', 'http://localhost:8888/oauth2/authorization/google');
      form.setAttribute('method', 'get');
      form.style.display = 'none';
      document.body.appendChild(form);
      form.submit();
    },
    signInWithKakao() {
      // Kakao 로그인 로직 구현
      console.log('Sign in with Kakao clicked');
    }
  }
}
</script>

<style scoped>
.login-with-google-btn {
  background-color: #4285F4;
  margin-bottom: 8px;
  color: black;
  font-weight: bold;
  text-transform: none;
}

.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
  font-weight: bold;
  color: black;
}
</style>
