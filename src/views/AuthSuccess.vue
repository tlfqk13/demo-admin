<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'AuthSuccess',
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      this.$router.push('/dashboard');
    } else {
      this.$router.push('/forms'); // accessToken이 없는 경우 로그인 페이지로 리다이렉트
    }
  }
}
</script>
