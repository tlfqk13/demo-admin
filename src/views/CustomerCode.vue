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
              item-key="id"
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
              <v-text-field label="연락처" v-model="selectedCustomer.contact"></v-text-field>
              <v-text-field label="담당자" v-model="selectedCustomer.representative"></v-text-field>
              <v-text-field label="E-MAIL" v-model="selectedCustomer.email"></v-text-field>
              <v-text-field label="주소" v-model="selectedCustomer.address"></v-text-field>
              <v-text-field label="국가" v-model="selectedCustomer.country"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveCustomer">저장</v-btn>
            <v-btn color="secondary" @click="resetForm">초기화</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CustomerCode',
  data() {
    return {
      search: '',
      headers: [
        { text: '코드', value: 'code', width: '100px' },
        { text: '사업자명', value: 'businessName', width: '200px' },
        { text: '연락처', value: 'contact', width: '200px' },
        { text: '담당자', value: 'representative', width: '150px' },
        { text: 'E-MAIL', value: 'email', width: '200px' },
        { text: '주소', value: 'address', width: '300px' },
        { text: '국가', value: 'country', width: '200px' },
      ],
      customers: [],
      selectedCustomer: {
        id: null,
        code: '',
        businessName: '',
        contact: '',
        representative: '',
        email: '',
        address: '',
        country: '',
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
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      axios.get('http://localhost:8888/api/customers')
        .then(response => {
          this.customers = response.data.customers;
        })
        .catch(error => {
          console.error('There was an error fetching the customers!', error);
        });
    },
    selectCustomer(customer) {
      this.selectedCustomer = { ...customer };
    },
    saveCustomer() {
      if (this.selectedCustomer.id) {
        // Update existing customer
        axios.put(`http://localhost:8888/api/customers/${this.selectedCustomer.id}`, this.selectedCustomer)
          .then(response => {
            const index = this.customers.findIndex(c => c.id === this.selectedCustomer.id);
            if (index > -1) {
              this.customers.splice(index, 1, response.data.customer);
            }
            alert('Customer updated successfully.');
          })
          .catch(error => {
            console.error('There was an error updating the customer!', error);
          });
      } else {
        // Add new customer
        axios.post('http://localhost:8888/api/customers', this.selectedCustomer)
          .then(response => {
            this.customers.push(response.data.customer);
            alert('Customer added successfully.');
          })
          .catch(error => {
            console.error('There was an error adding the customer!', error);
          });
      }
      this.resetForm();
    },
    resetForm() {
      this.selectedCustomer = {
        id: null,
        code: '',
        businessName: '',
        contact: '',
        representative: '',
        email: '',
        address: '',
        country: '',
      };
    }
  }
};
</script>

<style scoped>
.rounded-table-content {
  border-radius: 16px !important;
}

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
