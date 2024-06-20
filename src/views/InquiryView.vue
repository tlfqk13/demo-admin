<template>
  <v-container fluid>
    <!-- 폼 내용 -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>단일 견적 화면 (신규 생성/공란)</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="3">
                  <v-text-field label="문서번호" v-model="documentNumber"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    ref="creationDateMenu"
                    v-model="creationDateMenu"
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
                        label="작성일자"
                        v-model="creationDate"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="creationDate"
                      @input="creationDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    ref="shippingDateMenu"
                    v-model="shippingDateMenu"
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
                        label="선적일자"
                        v-model="shippingDate"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="shippingDate"
                      @input="shippingDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="환율" v-model="exchangeRate"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    label="선적자"
                    v-model="shippingCompany"
                    append-icon="mdi-magnify"
                    readonly
                    @click:append="openShipCodeDialog"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="매출처"
                    v-model="customer"
                    append-icon="mdi-magnify"
                    readonly
                    @click:append="openCustomerCodeDialog"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="managers"
                    label="담당자"
                    v-model="manager"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="Hull No." v-model="hullNumbers"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field label="Ref No." v-model="refNumber"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="비고" v-model="remarks"></v-text-field>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn color="primary" @click="addItem">추가</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- INQUIRY 그리드 추가 -->
    <v-row class="mt-5">
      <v-col>
        <InquiryGrid
          :items="inquiryItems"
          @update:item="updateItem"
          @delete:item="deleteItem"
        />
      </v-col>
    </v-row>

    <!-- 선적자 코드 모달 -->
    <v-dialog v-model="shipCodeDialog" max-width="800px">
      <ShipCodeList @select-ship-code="selectShipCode" @close="shipCodeDialog = false" />
    </v-dialog>

    <!-- 매출처 코드 모달 -->
    <v-dialog v-model="customerCodeDialog" max-width="800px">
      <CustomerCodeList @select-customer-code="selectCustomerCode" @close="customerCodeDialog = false" />
    </v-dialog>
  </v-container>
</template>

<script>
import InquiryGrid from "@/views/InquiryGrid.vue";
import ShipCodeList from "@/views/ShipCodeList.vue";
import CustomerCodeList from "@/views/CustomerCodeList.vue";

export default {
  name: 'InquiryView',
  components: {
    InquiryGrid,
    ShipCodeList,
    CustomerCodeList,
  },
  data() {
    return {
      documentNumber: '',
      creationDate: '',
      shippingDate: '',
      exchangeRate: '',
      creationDateMenu: false,
      shippingDateMenu: false,
      shippingCompany: '',
      customer: '',
      hullNumber: '',
      salesPerson: '',
      manager: '',
      refNumber: '',
      remarks: '',
      shipCodeDialog: false,
      customerCodeDialog: false,
      inquiryItems: [],
      hullNumbers: '',
      managers: ['Manager A', 'Manager B', 'Manager C'],
    };
  },
  methods: {
    addItem() {
      const newItem = {
        id: this.inquiryItems.length + 1,
        documentNumber: this.documentNumber,
        creationDate: this.creationDate,
        shippingDate: this.shippingDate,
        exchangeRate: this.exchangeRate,
        shippingCompany: this.shippingCompany,
        customer: this.customer,
        hullNumber: this.hullNumber,
        salesPerson: this.salesPerson,
        manager: this.manager,
        refNumber: this.refNumber,
        remarks: this.remarks,
      };
      this.inquiryItems.push(newItem);
      this.clearForm();
    },
    updateItem({index, item}) {
      this.inquiryItems.splice(index, 1, item);
    },
    deleteItem(item) {
      const index = this.inquiryItems.indexOf(item);
      if (index > -1) {
        this.inquiryItems.splice(index, 1);
      }
    },
    clearForm() {
      this.documentNumber = '';
      this.creationDate = '';
      this.shippingDate = '';
      this.exchangeRate = '';
      this.shippingCompany = '';
      this.customer = '';
      this.hullNumber = '';
      this.salesPerson = '';
      this.manager = '';
      this.refNumber = '';
      this.remarks = '';
    },
    openShipCodeDialog() {
      this.shipCodeDialog = true;
    },
    openCustomerCodeDialog() {
      this.customerCodeDialog = true;
    },
    selectShipCode(shipCode) {
      this.shippingCompany = shipCode.businessName;
      this.shipCodeDialog = false;
    },
    selectCustomerCode(customer) {
      this.customer = customer.businessName;
      this.customerCodeDialog = false;
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

.mt-5 {
  margin-top: 50px;
}

.v-col > .v-input--selection-controls__input {
  margin-top: 0 !important;
}

.elevation-3 {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-table {
  border-radius: 16px;
  overflow: hidden;
}

.rounded-table-content {
  border-radius: 16px !important;
}

.rounded-card {
  border-radius: 16px;
}
</style>
