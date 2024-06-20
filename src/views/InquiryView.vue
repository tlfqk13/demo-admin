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
                  <v-select
                    :items="shippingCompanies"
                    label="선적자"
                    v-model="shippingCompany"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="hullNumbers"
                    label="Hull No"
                    v-model="hullNumber"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="managers"
                    label="매출처"
                    v-model="salesPerson"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="managers"
                    label="담당자"
                    v-model="manager"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field label="Ref No." v-model="refNumber"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="비고" v-model="remarks"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-btn color="primary" @click="search">추가</v-btn>
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
        <InquiryGrid />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InquiryGrid from "@/views/InquiryGrid.vue";


export default {
  name: 'InquiryView',
  components: {
    InquiryGrid,
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
      hullNumber: '',
      salesPerson: '',
      manager: '',
      refNumber: '',
      remarks: '',
      status: {
        estimate: false,
        order: false,
        invoice: false,
        sales: false,
        settlement: false,
        payment: false,
      },
      shippingCompanies: ['Company A', 'Company B', 'Company C'],
      hullNumbers: ['001', '002', '003'],
      managers: ['Manager A', 'Manager B', 'Manager C'],
    };
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
</style>
