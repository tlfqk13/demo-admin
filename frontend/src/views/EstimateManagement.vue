<template>
  <v-container fluid>
    <v-row>
      <!-- 견적 관리 폼 섹션 -->
      <v-col cols="12" class="d-flex flex-column" style="flex: 3">
        <v-card>
          <v-card-title>
            견적 관리
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="1">
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
                <v-col cols="1">
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
                <v-col cols="1">
                  <v-menu
                    ref="startShippingDateMenu"
                    v-model="startShippingDateMenu"
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
                        label="선적일자 시작"
                        v-model="startShippingDate"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="startShippingDate"
                      @input="startShippingDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="1">
                  <v-menu
                    ref="endShippingDateMenu"
                    v-model="endShippingDateMenu"
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
                        label="선적일자 종료"
                        v-model="endShippingDate"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="endShippingDate"
                      @input="endShippingDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-text-field label="문서번호" v-model="documentNumber"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field label="REF NO" v-model="refNumber"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field label="매출처명" v-model="customerName"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field label="선명" v-model="productName"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-select
                    :items="condition1"
                    label="품목내역1"
                    v-model="condition1Selected"
                  ></v-select>
                </v-col>
                <v-col cols="2" v-if="condition1Selected">
                  <v-text-field
                    label="품목내역1 텍스트"
                    v-model="condition1Text"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-select
                    :items="condition2"
                    label="품목내역2"
                    v-model="condition2Selected"
                  ></v-select>
                </v-col>
                <v-col cols="2" v-if="condition2Selected">
                  <v-text-field
                    label="품목내역2 텍스트"
                    v-model="condition2Text"
                  ></v-text-field>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" @click="search">조회</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 견적 리스트 섹션 -->
      <v-col cols="12" class="d-flex flex-column" style="flex: 7">
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
                <template v-slot:[`item.color`]="{ item }">
                  <v-row :style="{ background: item.color === 255 ? 'red' : item.color === 9 ? 'green' : 'white' }">
                    <v-col>{{ item.color }}</v-col>
                  </v-row>
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
export default {
  name: 'EstimateManagement',
  data() {
    return {
      startDate: '',
      endDate: '',
      startDateMenu: false,
      endDateMenu: false,
      startShippingDate: '',
      endShippingDate: '',
      startShippingDateMenu: false,
      endShippingDateMenu: false,
      documentNumber: '',
      refNumber: '',
      customerName: '',
      productName: '',
      manager: '',
      managers: ['Manager A', 'Manager B', 'Manager C'],
      condition1: ['품목명','품목코드','PART NO','파트분류','메이커,타입','규격','화물관리 NO','매입처명','의뢰처명','품명 + 매입처명','상태코드','재고코드','비고'],
      condition2: ['품목명','품목코드','PART NO','파트분류','메이커,타입','규격','화물관리 NO','매입처명','의뢰처명','품명 + 매입처명','상태코드','재고코드','비고'],
      condition1Selected: '',
      condition2Selected: '',
      status: {
        estimate: false,
        order: false,
        invoice: false,
      },
      headers: [
        { text: '문서번호', value: 'documentNumber', width: '200px' },
        { text: '작성일자', value: 'createdDate', width: '120px' },
        { text: '선적일자', value: 'shippingDate', width: '120px' },
        { text: '매출처명', value: 'customerName', width: '150px' },
        { text: '품목명', value: 'productName', width: '200px' },
        { text: 'REF NO', value: 'refNumber', width: '200px' },
        { text: '통화', value: 'currency', width: '80px' },
        { text: '환율', value: 'exchangeRate', width: '100px', sortable: false },
        { text: '선명', value: 'shipName', width: '120px' },
        { text: '견적', value: 'estimate', width: '70px', align: 'center', sortable: false },
        { text: '명세', value: 'invoice', width: '70px', align: 'center', sortable: false },
        { text: '수주', value: 'order', width: '70px', align: 'center', sortable: false },
        { text: '비고', value: 'remarks', width: '200px' },
        { text: '마진(￥)', value: 'marginYen', width: '100px' },
        { text: '매입처명', value: 'supplierName', width: '150px' },
        { text: '합계금액(￥)', value: 'totalAmountYen', width: '150px' },
        { text: '합계금액($)', value: 'totalAmountDollar', width: '150px' },
        { text: '담당자', value: 'manager', width: '100px' },
        { text: '품목수', value: 'itemCount', width: '80px' },
        { text: 'Color', value: 'color', width: '70px' },
      ],
      items: [
        {
          id: 1,
          documentNumber: 'BAS240307-073',
          createdDate: '2024-03-07',
          shippingDate: '2024-03-07',
          customerName: 'TECHMAR SHIP',
          productName: 'OCN-008/2024E-1005',
          refNumber: '',
          currency: 'USD',
          exchangeRate: '1,050.00',
          shipName: 'OCEANIC II',
          estimate: true,
          order: false,
          invoice: true,
          remarks: 'TECHLOG',
          marginYen: '0.00',
          supplierName: 'TECHLOG',
          totalAmountYen: '19,212,000',
          totalAmountDollar: '18,297.14',
          manager: 'INDIA3',
          itemCount: 11,
          color: 255,
        },
        {
          id: 2,
          documentNumber: 'BAS240307-073',
          createdDate: '2024-03-07',
          shippingDate: '2024-03-07',
          customerName: 'TECHMAR SHIP',
          productName: 'OCN-008/2024E-1005',
          refNumber: '',
          currency: 'USD',
          exchangeRate: '1,050.00',
          shipName: 'OCEANIC II',
          estimate: false,
          order: false,
          invoice: true,
          remarks: 'TECHLOG',
          marginYen: '0.00',
          supplierName: 'TECHLOG',
          totalAmountYen: '19,212,000',
          totalAmountDollar: '18,297.14',
          manager: 'INDIA3',
          itemCount: 11,
          color: 255,
        },
        {
          id: 3,
          documentNumber: 'BAS240307-073',
          createdDate: '2024-03-07',
          shippingDate: '2024-03-07',
          customerName: 'TECHMAR SHIP',
          productName: 'OCN-008/2024E-1005',
          refNumber: '',
          currency: 'USD',
          exchangeRate: '1,050.00',
          shipName: 'OCEANIC II',
          estimate: true,
          order: true,
          invoice: false,
          remarks: 'TECHLOG',
          marginYen: '0.00',
          supplierName: 'TECHLOG',
          totalAmountYen: '19,212,000',
          totalAmountDollar: '18,297.14',
          manager: 'INDIA3',
          itemCount: 11,
          color: 255,
        },
        // 다른 데이터 추가
      ],
    };
  },
  methods: {
    search() {
      // 검색 기능 구현
      console.log('검색 실행');
    },
    refresh() {
      // 데이터 새로고침 기능 구현
      console.log('데이터 새로고침');
    },
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
