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
        <v-spacer></v-spacer>
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
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
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
      if (confirm('Are you sure you want to delete this item?')) {
        //this.items.splice(index, 1);
        this.$emit('update:item', { index, item: this.items[index] });
      }
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
        this.$emit('update:item', { index: this.editedIndex, item: this.items[this.editedIndex] });
      } else {
        //this.items.push(this.editedItem);
        this.$emit('add:item', this.editedItem);
      }
      this.close();
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
