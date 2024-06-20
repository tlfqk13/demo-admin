<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    item-key="id"
    dense
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>품목사항</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="아이템 명" v-model="editedItem.name"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">취소</v-btn>
              <v-btn color="blue darken-1" text @click="save">저장</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'InquiryGrid',
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
      headers: [
        {text: '아이템 명', value: 'name', width: '100px'},
        {text: '품목코드', value: 'itemCode', width: '100px'},
        {text: '품명', value: 'productName', width: '150px'},
        {text: '수량', value: 'quantity', width: '70px'},
        {text: '단위', value: 'unit', width: '70px'},
        {text: '매출단가(₩)', value: 'salesUnitPriceKRW', width: '100px'},
        {text: '매출단가($)', value: 'salesUnitPriceUSD', width: '100px'},
        {text: '매출금액(₩)', value: 'salesAmountKRW', width: '100px'},
        {text: '매출금액($)', value: 'salesAmountUSD', width: '100px'},
        {text: '마진', value: 'margin', width: '70px'},
        {text: '매입처코드', value: 'supplierCode', width: '100px'},
        {text: '매입단가(₩)', value: 'purchaseUnitPriceKRW', width: '100px'},
        {text: '매입단가($)', value: 'purchaseUnitPriceUSD', width: '100px'},
        {text: '매입금액(₩)', value: 'purchaseAmountKRW', width: '100px'},
        {text: '매입금액($)', value: 'purchaseAmountUSD', width: '100px'},
        {text: '출력', value: 'print', width: '70px'},
        {text: '처리', value: 'process', width: '100px'},
        {text: '납기', value: 'deliveryDate', width: '100px'},
        {text: '비고', value: 'remark', width: '150px'},
        {text: '의뢰처1', value: 'client1', width: '100px'},
        {text: '의뢰처2', value: 'client2', width: '100px'},
        {text: '액션', value: 'action', sortable: false, width: '70px'},
      ],
      items: [
        {
          id: 1,
          name: 'Item 1',
          itemCode: '001',
          productName: 'Product 1',
          quantity: 10,
          unit: 'EA',
          salesUnitPriceKRW: 1000,
          salesUnitPriceUSD: 1,
          salesAmountKRW: 10000,
          salesAmountUSD: 10,
          margin: 10,
          supplierCode: 'S001',
          purchaseUnitPriceKRW: 900,
          purchaseUnitPriceUSD: 0.9,
          purchaseAmountKRW: 9000,
          purchaseAmountUSD: 9,
          print: 'N/A',
          process: 'Pending',
          deliveryDate: '2024-03-01',
          remark: 'No remarks',
          client1: 'Client 1',
          client2: 'Client 2',
        },
        {
          id: 2,
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
          remark: 'No remarks',
          client1: 'Client 3',
          client2: 'Client 4',
        },
      ],
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
/* 스타일을 여기에 작성하세요 */
</style>
