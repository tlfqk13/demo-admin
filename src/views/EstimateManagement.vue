<template>
  <v-container fluid>
    <v-row>
      <!-- 견적 관리 폼 섹션 -->
      <v-col cols="12">
        <v-card>
          <v-card-title>
            견적 관리
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="3">
                  <v-menu
                    ref="startDateMenu"
                    v-model="startDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="작성일자 시작"
                        v-model="startDate"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="startDate"
                      @input="startDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    ref="endDateMenu"
                    v-model="endDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="작성일자 종료"
                        v-model="endDate"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="endDate"
                      @input="endDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="문서번호" v-model="documentNumber"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="REF NO" v-model="refNumber"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="매출처명" v-model="customerName"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="선명" v-model="productName"></v-text-field>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" @click="search">조회</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 견적 리스트 섹션 -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            견적 리스트
          </v-card-title>
          <v-card-text>
            <div class="overflow-x-auto">
              <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
                item-key="id"
                dense
                @click:row="goToDetail"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>견적 리스트</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="refresh">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.estimate`]="{ item }">
                  <v-checkbox v-model="item.estimate" disabled></v-checkbox>
                </template>
                <template v-slot:[`item.invoice`]="{ item }">
                  <v-checkbox v-model="item.invoice" disabled></v-checkbox>
                </template>
                <template v-slot:[`item.order`]="{ item }">
                  <v-checkbox v-model="item.order" disabled></v-checkbox>
                </template>
              </v-data-table>
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
  name: 'EstimateManagement',
  data() {
    return {
      startDate: '',
      endDate: '',
      startDateMenu: false,
      endDateMenu: false,
      documentNumber: '',
      refNumber: '',
      customerName: '',
      productName: '',
      headers: [
        { text: '문서번호', value: 'documentNumber', width: '200px' },
        { text: '작성일자', value: 'date', width: '120px' },
        { text: '매출처명', value: 'customerName', width: '150px' },
        { text: '선명', value: 'productName', width: '120px' },
        { text: 'REF NO', value: 'refNumber', width: '200px' },
        { text: '메이커', value: 'maker', width: '120px' },
        { text: '유형', value: 'type', width: '120px' },
        { text: 'PDF', value: 'pdfUrl', width: '200px' },
      ],
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:8888/api/customer-inquiries')
        .then(response => {
          this.items = response.data.customerInquiryResponseList.map(inquiry => ({
            id: inquiry.id,
            documentNumber: inquiry.refNumber,
            date: inquiry.date,
            customerName: inquiry.companyName,
            productName: inquiry.vesselName,
            refNumber: inquiry.refNumber,
            maker: inquiry.maker,
            type: inquiry.type,
            pdfUrl: inquiry.pdfUrl,
          }));
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    },
    search() {
      // 검색 기능 구현
      console.log('검색 실행');
    },
    refresh() {
      this.fetchData();
    },
    goToDetail(item) {
      this.$router.push({ name: 'EstimateDetail', params: { id: item.id } });
    }
  },
};
</script>

<style scoped>
.v-card-title {
  background-color: #f5f5f5;
  font-weight: bold;
  font-size: 1.2em;
}

.v-card-text {
  padding-bottom: 20px;
}

.overflow-x-auto {
  overflow-x: auto;
}

.v-data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.v-data-table td {
  white-space: nowrap;
}

.v-data-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.v-toolbar-title {
  font-weight: bold;
}

.v-btn {
  margin-top: 16px;
}
</style>
