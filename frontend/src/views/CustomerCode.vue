<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-card class="rounded-table elevation-3">
          <v-card-title>
            <v-icon class="mr-2" color="green" size="32">mdi-invoice-arrow-right-outline</v-icon>
            매출처 코드 목록
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
                  <v-toolbar-title>매출처 코드 목록</v-toolbar-title>
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
            매출처 정보
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="코드" v-model="selectedCustomer.code"></v-text-field>
              <v-text-field label="사업자명" v-model="selectedCustomer.businessName"></v-text-field>
              <v-text-field label="연락처" v-model="selectedCustomer.phone"></v-text-field>
              <v-text-field label="담당자" v-model="selectedCustomer.contactPerson"></v-text-field>
              <v-text-field label="E-MAIL" v-model="selectedCustomer.email"></v-text-field>
              <v-text-field label="주소" v-model="selectedCustomer.address"></v-text-field>
              <v-text-field label="기타정보" v-model="selectedCustomer.extraInfo"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveCustomer">저장</v-btn>
          </v-card-actions>
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
      search: '',
      headers: [
        { text: '코드', value: 'code', width: '100px' },
        { text: '사업자명', value: 'businessName', width: '200px' },
        { text: '연락처', value: 'phone', width: '200px' },
        { text: '담당자', value: 'contactPerson', width: '150px' },
        { text: 'E-MAIL', value: 'email', width: '200px' },
        { text: '주소', value: 'address', width: '300px' },
        { text: '기타정보', value: 'extraInfo', width: '200px' },
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
        ...Array.from({ length: 29 }, (_, i) => ({
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
        phone: '',
        contactPerson: '',
        email: '',
        address: '',
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
      this.selectedCustomer = { ...customer };
    },
    saveCustomer() {
      const index = this.customers.findIndex(c => c.code === this.selectedCustomer.code);
      if (index > -1) {
        this.customers.splice(index, 1, this.selectedCustomer);
      } else {
        this.customers.push(this.selectedCustomer);
      }
      this.$emit('update:customer-list', this.customers);
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
