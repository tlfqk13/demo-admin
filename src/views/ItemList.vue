<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th>NO.</th>
        <th>ITEM ID</th>
        <th>OPT</th>
        <th>CODE</th>
        <th>DESCRIPTION</th>
        <th>Q'TY</th>
        <th>UNIT</th>
        <th>U/PRICE</th>
        <th>AMOUNT</th>
        <th>NOTES</th>
        <th>ACTIONS</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td><v-text-field v-model="item.itemId" dense></v-text-field></td>
        <td
            @keydown="handleKeyDown($event, item)"
            tabindex="0"
            @focus="onFocus(item)"
            @blur="onBlur"
            :class="{ focused: focusedItem === item }">
          {{ item.opt || 'Select' }}
        </td>
        <td><v-text-field v-model="item.itemCode" dense></v-text-field></td>
        <td><v-text-field v-model="item.itemDescription" dense></v-text-field></td>
        <td><v-text-field v-model="item.qty" type="number" dense></v-text-field></td>
        <td><v-text-field v-model="item.unit" dense></v-text-field></td>
        <td><v-text-field v-model="item.uprice" type="number" dense></v-text-field></td>
        <td><v-text-field v-model="item.amount" type="number" dense></v-text-field></td>
        <td><v-textarea v-model="item.notes" rows="1" dense></v-textarea></td>
        <td>
          <v-btn icon @click="removeItem(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      focusedItem: null // 포커스된 아이템을 추적
    };
  },
  methods: {
    handleKeyDown(event, item) {
      if (event.key === '1') {
        item.opt = 'M';
      } else if (event.key === '2') {
        item.opt = 'T';
      } else if (event.key === '3') {
        item.opt = 'ID';
      }
    },
    onFocus(item) {
      this.focusedItem = item;
    },
    onBlur() {
      this.focusedItem = null;
    },
    removeItem(index) {
      this.$emit('remove-item', index);
    }
  }
}
</script>

<style scoped>
td:focus {
  outline: none;
}
.focused {
  background-color: #e6f7ff;
  border: 2px solid #1890ff;
}
</style>
