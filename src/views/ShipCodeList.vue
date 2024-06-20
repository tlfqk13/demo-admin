<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2" color="green" size="32">mdi-ferry</v-icon>
      선박 코드 선택
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="filteredShipCode"
        class="elevation-1 rounded-table-content"
        item-key="code"
        dense
        @click:row="selectShipCode"
        :items-per-page="15"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>선박 코드 목록</v-toolbar-title>
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
</template>

<script>
export default {
  name: 'ShipCodeList',
  data() {
    return {
      headers: [
        { text: '코드', value: 'code', width: '100px' },
        { text: '선명', value: 'shipName', width: '200px' },
        { text: '선사', value: 'businessName', width: '200px' },
        { text: '호출부호', value: 'callSignal', width: '150px' },
        { text: 'IMO No', value: 'imoNumber', width: '150px' },
        { text: 'HULL No', value: 'hullNumber', width: '250px' },
        { text: 'SHIPYARD', value: 'shipYard', width: '200px' },
        { text: '선박구분', value: 'shipType', width: '150px' },
        { text: '비고', value: 'remark', width: '250px' },
        { text: '엔진타입1', value: 'enginType1', width: '150px' },
        { text: '엔진타입2', value: 'enginType2', width: '150px' },
      ],
      customers: [
        {
          code: 'AR',
          shipName: 'ARYA TANKERS PVT LTD',
          businessName: 'ARYA TANKERS PVT LTD',
          callSignal: 'Mr. Yogesh',
          imoNumber: '49229009',
          hullNumber: 'yogesh.shinde@arya.in',
          shipYard: 'Marathon Futurex',
          shipType: 'SUP123',
          remark: '+91 22 49229009',
          enginType1: '추가 정보 예시',
          enginType2: '추가 정보 예시'
        },
        ...Array.from({ length: 29 }, (_, i) => ({
          code: `CUST${i + 2}`,
          shipName: `선명 ${i + 2}`,
          businessName: `선박회사 ${i + 2}`,
          callSignal: `Contact ${i + 2}`,
          imoNumber: `4000000${i + 2}`,
          hullNumber: `HN ${i + 2}`,
          shipYard: `SY ${i + 2}`,
          shipType: `ST ${i + 2}`,
          remark: `비고 ${i + 2}`,
          enginType1: `타입 ${i + 2}`,
          enginType2: `타입 ${i + 2}`
        }))
      ],
      search: ''
    };
  },
  computed: {
    filteredShipCode() {
      const searchTerm = this.search.toLowerCase();
      return this.customers.filter(customer =>
        Object.values(customer).some(value =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }
  },
  methods: {
    selectShipCode(customer) {
      this.$emit('select-ship-code', customer);
    },
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.rounded-table-content {
  border-radius: 16px !important;
}
</style>
