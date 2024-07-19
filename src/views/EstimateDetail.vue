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
              <v-col cols="4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Inquiry Type</v-list-item-title>
                    <v-list-item-subtitle>{{ estimate.inquiryType }}</v-list-item-subtitle>
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
                  <template #top>
                    <v-toolbar flat>
                      <v-toolbar-title>견적서 항목</v-toolbar-title>
                    </v-toolbar>
                  </template>
                  <template #item="{ item }">
                    <tr>
                      <td>{{ item.itemId }}</td>
                      <td>{{ item.code }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.qty }}</td>
                      <td>{{ item.unit }}</td>
                      <td>
                        <v-text-field v-model="item.uprice" label="단가" type="number" @input="updateAmount(item)"></v-text-field>
                      </td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.notes }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn color="primary" @click="saveEstimate">저장</v-btn>
              </v-col>
            </v-row>
            <v-row v-if="error">
              <v-col cols="12">
                <v-alert type="error" dismissible>
                  {{ error }}
                </v-alert>
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
        { text: 'ID', value: 'itemId' },
        { text: '코드', value: 'code' },
        { text: '설명', value: 'description' },
        { text: '수량', value: 'qty' },
        { text: '단위', value: 'unit' },
        { text: '단가', value: 'uprice' },
        { text: '금액', value: 'amount' },
        { text: '비고', value: 'notes' },
      ],
      error: null
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
          console.log("Fetched estimate: ", this.estimate); // 콘솔에 데이터를 출력
          this.error = null; // Reset error message
        })
        .catch(error => {
          console.error('There was an error fetching the estimate detail!', error);
          this.error = 'There was an error fetching the estimate detail. Please try again later.';
        });
    },
    updateAmount(item) {
      item.amount = item.qty * item.uprice;
    },
    saveEstimate() {
      const editRequests = this.estimate.items.map(item => ({
        itemId: item.itemId, // Ensure itemId is correctly set
        qty: item.qty,
        unit: item.unit,
        uprice: item.uprice,
        amount: item.amount
      }));

      console.log("Edit requests: ", editRequests); // 콘솔에 데이터를 출력

      axios.put(`http://localhost:8888/api/customer-inquiries/${this.$route.params.estimateId}`, editRequests)
        .then(() => {
          this.$router.push({ name: 'estimateManagement' }); // Navigate back to the list or another desired route
        })
        .catch(error => {
          console.error('There was an error saving the estimate!', error);
          this.error = 'There was an error saving the estimate. Please try again later.';
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
