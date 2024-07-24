<template>
  <div id="app">
    <table>
      <thead>
      <tr>
        <th>Item</th>
        <th>Opt</th>
        <th>품목코드</th>
        <th>품 명</th>
        <th>수량</th>
        <th>단위</th>
        <th>비고</th>
        <th>의뢰처1</th>
        <th>의뢰처2</th>
        <th>
          의뢰처3
          <button @click="addClientColumn" v-if="maxClients < 5">+</button>
        </th>
        <th v-if="maxClients >= 4">의뢰처4</th>
        <th v-if="maxClients >= 5">의뢰처5</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td
            @keydown="handleKeyDown($event, item)"
            tabindex="0"
            @focus="onFocus($event, item)"
            @blur="onBlur($event, item)"
            :class="{ focused: focusedItem === item }">
          {{ item.opt || 'Select' }}
        </td>
        <td><input v-model="item.itemCode" type="text" /></td>
        <td><input v-model="item.name" type="text" /></td>
        <td><input v-model="item.quantity" type="number" /></td>
        <td><input v-model="item.unit" type="text" /></td>
        <td><input v-model="item.notes" type="text" /></td>
        <td><input v-model="item.clients[0]" type="text" /></td>
        <td><input v-model="item.clients[1]" type="text" /></td>
        <td><input v-model="item.clients[2]" type="text" /></td>
        <td v-if="maxClients >= 4"><input v-model="item.clients[3]" type="text" /></td>
        <td v-if="maxClients >= 5"><input v-model="item.clients[4]" type="text" /></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxClients: 3,
      focusedItem: null,
      items: [
        { itemCode: "-", name: "AUX. ENGINE (MAKER:YANMAR DIESEL ENGINE PTE", quantity: 0, unit: "", notes: "", opt: "", clients: ["", "", ""] },
        { itemCode: "651.000/00110", name: "HEXAGON THIN NUT M24", quantity: 2, unit: "PCS", notes: "", opt: "", clients: ["", "", ""] },
        { itemCode: "651.415/00010", name: "GEAR ASSY", quantity: 1, unit: "PCS", notes: "", opt: "", clients: ["", "", ""] },
        { itemCode: "651.415/00013", name: "GEAR ASSY", quantity: 1, unit: "PCS", notes: "Component:651.415.00 - AE1 LO PUMP (ATTACHED", opt: "", clients: ["", "", ""] }
      ]
    };
  },
  methods: {
    addClientColumn() {
      if (this.maxClients < 5) {
        this.maxClients++;
        this.items.forEach(item => {
          item.clients.push("");
        });
      }
    },
    handleKeyDown(event, item) {
      if (event.key === '1') {
        item.opt = 'M';
      } else if (event.key === '2') {
        item.opt = 'T';
      } else if (event.key === '3') {
        item.opt = 'ID';
      }
    },
    onFocus(event, item) {
      this.focusedItem = item;
    },
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  padding: 4px 8px;
  cursor: pointer;
  margin-left: 4px;
}
input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}
td:focus {
  outline: none;
}
.focused {
  background-color: #e6f7ff;
  border: 2px solid #1890ff;
}
</style>
