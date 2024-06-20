<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-card class="rounded-table elevation-3">
          <v-card-title>
            <v-icon class="mr-2" color="green" size="32">mdi-ferry</v-icon>
            선박 코드 목록
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="filteredCustomers"
              class="elevation-1 rounded-table-content"
              item-key="code"
              dense
              @click:row="selectCustomer"
              :items-per-page="15"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>선박 코드 목록</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
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
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="rounded-card elevation-3">
        <v-card-title>
            선박 정보
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="코드" v-model="selectedCustomer.code" readonly></v-text-field>
              <v-text-field label="선명" v-model="selectedCustomer.shipName" readonly></v-text-field>
              <v-text-field label="선사" v-model="selectedCustomer.businessName" readonly></v-text-field>
              <v-text-field label="호출부호" v-model="selectedCustomer.callSignal" readonly></v-text-field>
              <v-text-field label="IMO No" v-model="selectedCustomer.imoNumber" readonly></v-text-field>
              <v-text-field label="HULL NO" v-model="selectedCustomer.hullNumber" readonly></v-text-field>
              <v-text-field label="SHIPYARD" v-model="selectedCustomer.shipYard" readonly></v-text-field>
              <v-text-field label="선박구분" v-model="selectedCustomer.shipType" readonly></v-text-field>
              <v-text-field label="엔진타입1" v-model="selectedCustomer.enginType1" readonly></v-text-field>
              <v-text-field label="엔진타입2" v-model="selectedCustomer.enginType2" readonly></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerCode',
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
      selectedCustomer: {
        code: '',
        shipName: '',
        businessName: '',
        callSignal: '',
        imoNumber: '',
        hullNumber: '',
        shipYard: '',
        shipType: '',
        remark: '',
        enginType1: '',
        enginType2: ''
      },
      search: ''
    };
  },
  computed: {
    filteredCustomers() {
      const searchTerm = this.search.toLowerCase();
      return this.customers.filter(customer =>
        Object.values(customer).some(value =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }
  },
  methods: {
    selectCustomer(customer) {
      this.selectedCustomer = { ...customer };
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

.rounded-table {
  border-radius: 16px;
  overflow: hidden;
}

.rounded-table-content {
  border-radius: 16px !important;
}

.elevation-3 {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-card {
  border-radius: 16px;
}
</style>
