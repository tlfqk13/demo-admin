<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="headline">견적서 상세</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>문서번호</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.refNumber }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>작성일자</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.date }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>매출처명</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.companyName }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>선명</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.vesselName }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>REF NO</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.refNumber }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>메이커</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.maker }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>유형</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.type }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="8">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>PDF</v-list-item-title>
                    <v-list-item-subtitle><a :href="estimate.pdfUrl" target="_blank">{{ estimate.pdfUrl }}</a></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="itemHeaders"
                  :items="estimate.items"
                  class="elevation-1"
                  item-key="id"
                  dense
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>견적서 항목</v-toolbar-title>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EstimateDetail',
  data() {
    return {
      estimate: {
        items: []
      },
      itemHeaders: [
        { text: '코드', value: 'code' },
        { text: '설명', value: 'description' },
        { text: '수량', value: 'qty' },
        { text: '단위', value: 'unit' },
        { text: '단가', value: 'uprice' },
        { text: '금액', value: 'amount' },
        { text: '비고', value: 'notes' },
      ]
    };
  },
  mounted() {
    this.fetchEstimateDetail();
  },
  methods: {
    fetchEstimateDetail() {
      axios.get(`http://localhost:8888/api/customer-inquiries/${this.$route.params.estimateId}`)
        .then(response => {
          this.estimate = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the estimate detail!', error);
        });
    }
  }
};
</script>

<style scoped>
.v-card-title {
  background-color: #f5f5f5;
  font-weight: bold;
  font-size: 1.5em;
  padding: 16px;
  text-align: center;
}

.v-list-item {
  margin-bottom: 8px;
}

.v-data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
