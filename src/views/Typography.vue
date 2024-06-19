<template>
  <v-container>
    <v-card class="pa-3">
      <v-card-title>
        TypoGraphy
      </v-card-title>
      <v-card-text>
        <v-card class="pa-3 d-none d-sm-block">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 secondary">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 error">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 primary--text">
          컨텐츠
        </v-card>
        <v-card class="pa-3 text-h2 error--text">
          컨텐츠
        </v-card>
      </v-card-text>
      <v-container class="grey lighten-5">
        <v-card class="pa-3" outlined>
          <p class="text-h1">
            Heading1
          </p>
          <p class="text-h2">
            Heading2
          </p>
          <p class="text-h3 text-sm-subtitle-1">
            Heading3
          </p>
          <p class="display-4">
            display-4
          </p>
          <p class="font-weight-bold">
            Black text
          </p>
        </v-card>
        </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'TypoGraphy',
}
</script>
