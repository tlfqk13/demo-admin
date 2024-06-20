<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-card class="rounded-table elevation-3">
          <v-card-title>
            <v-icon class="mr-2" color="green" size="32">mdi-invoice-arrow-left</v-icon>
            매입처 코드 목록
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
                  <v-toolbar-title>매입처 코드 목록</v-toolbar-title>
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
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="rounded-card elevation-3">
          <v-card-title>
            <v-icon class="mr-2" color="green" size="32">mdi-information</v-icon>
            매입처 정보
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="코드" v-model="selectedCustomer.code" readonly></v-text-field>
              <v-text-field label="사업자명" v-model="selectedCustomer.businessName" readonly></v-text-field>
              <v-text-field label="연락처" v-model="selectedCustomer.contact" readonly></v-text-field>
              <v-text-field label="담당자" v-model="selectedCustomer.contactPerson" readonly></v-text-field>
              <v-text-field label="E-MAIL" v-model="selectedCustomer.email" readonly></v-text-field>
              <v-text-field label="주소" v-model="selectedCustomer.address" readonly></v-text-field>
              <v-text-field label="기타정보" v-model="selectedCustomer.extraInfo" readonly></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SupplierCode',
  data() {
    return {
      search: '',
      headers: [
        {text: '코드', value: 'code', width: '100px'},
        {text: '사업자명', value: 'businessName', width: '200px'},
        {text: '연락처', value: 'phone', width: '200px'},
        {text: '담당자', value: 'contactPerson', width: '150px'},
        {text: 'E-MAIL', value: 'email', width: '200px'},
        {text: '주소', value: 'address', width: '300px'},
        {text: '기타정보', value: 'extraInfo', width: '200px'},
      ],
      customers: [
        {
          code: 'AR',
          businessName: 'ARYA TANKERS PVT LTD',
          contactPerson: 'Mr. Yogesh',
          phone: '+91 22 49229009',
          email: 'yogesh.shinde@arya.in',
          address: 'Marathon Futurex, B-501, Mafatlal Mills, N.M. Joshi Marg, Lower Parel, Mumbai',
          supplierCode: 'SUP123',
          contact: '+91 22 49229009',
          extraInfo: '추가 정보 예시'
        },
        // 예시 데이터 29개 추가
        ...Array.from({length: 29}, (_, i) => ({
          code: `CUST${i + 1}`,
          businessName: `Business ${i + 1}`,
          contactPerson: `Contact ${i + 1}`,
          phone: `+91 22 4000000${i + 1}`,
          email: `email${i + 1}@business.com`,
          address: `Address ${i + 1}`,
          supplierCode: `SUP${i + 1}`,
          contact: `+91 22 4000000${i + 1}`,
          extraInfo: `Extra info ${i + 1}`
        }))
      ],
      selectedCustomer: {
        code: '',
        businessName: '',
        supplierCode: '',
        address: '',
        contact: '',
        email: '',
        extraInfo: '',
      }
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
      this.selectedCustomer = {...customer};
    },
  },
};
</script>

<style scoped>
.v-card-title {
  background-color: #f5f5f5;
  font-weight: bold;
  display: flex;
  align-items: center;
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
