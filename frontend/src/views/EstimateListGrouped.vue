<template>
  <v-app>
    <v-container>
      <v-expansion-panels multiple>
        <v-expansion-panel
            v-for="(group, index) in groupedItems"
            :key="index"
            v-model="expanded[group.group]"
        >
          <v-expansion-panel-header>
            {{ group.group }} ({{ group.items.length }})
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                :headers="subHeaders"
                :items="group.items"
                class="elevation-0"
                hide-default-footer
            ></v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      subHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Post', value: 'post' },
        { text: 'Project', value: 'project' },
        { text: 'Status', value: 'status' },
        { text: 'Budget', value: 'budget' }
      ],
      items: [
        { group: 'Active', name: 'Jan Petrovic', post: 'Web Designer', project: 'Elite Admin', status: 'Active', budget: '$3.9' },
        { group: 'Active', name: 'Nirav Joshi', post: 'Frontend Engineer', project: 'Hosting Press HTML', status: 'Active', budget: '$2.4k' },
        { group: 'Active', name: 'Sunil Joshi', post: 'Web Designer', project: 'Elite Admin', status: 'Active', budget: '$3.9' },
        { group: 'Cancel', name: 'Michael Zenaty', post: 'Project Manager', project: 'Elite Admin', status: 'Cancel', budget: '$3.9' },
        { group: 'Completed', name: 'John Doe', post: 'Backend Engineer', project: 'Hosting Press HTML', status: 'Completed', budget: '$2.1k' },
        { group: 'Completed', name: 'Sara Smith', post: 'Frontend Engineer', project: 'Elite Admin', status: 'Completed', budget: '$1.9k' }
      ],
      expanded: {}
    }
  },
  computed: {
    groupedItems() {
      const groups = {};
      this.items.forEach(item => {
        if (!groups[item.group]) {
          groups[item.group] = {
            group: item.group,
            items: []
          };
        }
        groups[item.group].items.push(item);
      });
      return Object.values(groups);
    }
  }
}
</script>

<style>
.v-expansion-panel-header {
  font-weight: bold;
}
</style>
