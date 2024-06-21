<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2" color="green" size="32">mdi-magnify</v-icon>
            품목 코드 목록
          </v-card-title>
          <v-card-text>
            <v-data-table
                :headers="headers"
                :items="filteredProducts"
                class="elevation-1 rounded-table-content"
                item-key="itemCode"
                dense
                @click:row="selectProductCode"
                :items-per-page="15"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>품목 코드 목록</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="검색"
                      single-line
                      hide-details
                  ></v-text-field>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="closeDialog">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductCodeList',
  data() {
    return {
      search: '',
      headers: [
        { text: '아이템 명', value: 'name' },
        { text: '품목코드', value: 'itemCode' },
        { text: '품명', value: 'productName' },
        { text: '수량', value: 'quantity' },
        { text: '단위', value: 'unit' },
        { text: '매출단가(₩)', value: 'salesUnitPriceKRW' },
        { text: '매출단가($)', value: 'salesUnitPriceUSD' },
        { text: '매출금액(₩)', value: 'salesAmountKRW' },
        { text: '매출금액($)', value: 'salesAmountUSD' },
        { text: '마진', value: 'margin' },
        { text: '매입처코드', value: 'supplierCode' },
        { text: '매입단가(₩)', value: 'purchaseUnitPriceKRW' },
        { text: '매입단가($)', value: 'purchaseUnitPriceUSD' },
        { text: '매입금액(₩)', value: 'purchaseAmountKRW' },
        { text: '매입금액($)', value: 'purchaseAmountUSD' },
        { text: '출력', value: 'print' },
        { text: '처리', value: 'process' },
        { text: '납기', value: 'deliveryDate' },
        { text: '비고', value: 'remark' },
        { text: '액션', value: 'action', sortable: false },
      ],
      products: [
        {
          name: 'Item 1',
          itemCode: '001',
          productName: 'Product 1',
          quantity: 10,
          unit: 'EA',
          salesUnitPriceKRW: 1000,
          salesUnitPriceUSD: 1000,
          salesAmountKRW: 10000,
          salesAmountUSD: 1000,
          margin: 1000,
          supplierCode: 'S001',
          purchaseUnitPriceKRW: 1000,
          purchaseUnitPriceUSD: 1000,
          purchaseAmountKRW: 9000,
          purchaseAmountUSD: 1000,
          print: 'N/A',
          process: 'Pending',
          deliveryDate: '2024-03-01',
          remark: 'No remarks'
        },
        {
          name: 'Item 2',
          itemCode: '002',
          productName: 'Product 2',
          quantity: 20,
          unit: 'EA',
          salesUnitPriceKRW: 2000,
          salesUnitPriceUSD: 2,
          salesAmountKRW: 40000,
          salesAmountUSD: 40,
          margin: 20,
          supplierCode: 'S002',
          purchaseUnitPriceKRW: 1800,
          purchaseUnitPriceUSD: 1.8,
          purchaseAmountKRW: 36000,
          purchaseAmountUSD: 36,
          print: 'N/A',
          process: 'Pending',
          deliveryDate: '2024-03-02',
          remark: 'No remarks'
        },
        // 예시 데이터 추가
      ],
    };
  },
  computed: {
    filteredProducts() {
      const searchTerm = this.search.toLowerCase();
      return this.products.filter(product =>
          Object.values(product).some(value =>
              String(value).toLowerCase().includes(searchTerm)
          )
      );
    },
  },
  methods: {
    selectProductCode(product) {
      this.$emit('select-product-code', product);
    },
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.v-card-title {
  background-color: #f5f5f5;
  font-weight: bold;
}

.v-card-text {
  padding-bottom: 20px;
}

.rounded-table-content {
  border-radius: 16px !important;
}
</style>
