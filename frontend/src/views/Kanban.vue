<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col
            v-for="(column, index) in columns"
            :key="index"
            cols="12"
            md="3"
            class="pa-2"
        >
          <v-card :class="column.class">
            <v-card-title class="headline d-flex justify-space-between align-center">
              {{ column.title }}
              <v-btn icon small @click="addTask(column.title)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <draggable
                  v-model="column.tasks"
                  :group="'tasks'"
                  @end="onDragEnd"
              >
                <v-card
                    v-for="(task, tIndex) in column.tasks"
                    :key="tIndex"
                    class="mb-2"
                >
                  <v-img v-if="task.image" :src="task.image" height="150px"></v-img>
                  <v-card-title>{{ task.title }}</v-card-title>
                  <v-card-subtitle>
                    <v-icon left>mdi-calendar</v-icon>
                    {{ task.date }}
                  </v-card-subtitle>
                  <v-card-text>{{ task.description }}</v-card-text>
                  <v-chip
                      :color="task.label.color"
                      dark
                      class="chip-style"
                  >{{ task.label.text }}</v-chip>
                </v-card>
              </draggable>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "KanbanView",
  components: {
    draggable
  },
  data() {
    return {
      columns: [
        {
          title: 'Todo',
          class: 'bg-grey-lighten-4',
          tasks: [
            {
              title: 'Lets do some task on pd',
              image: '',
              date: '2 days ago',
              description: 'Lorem ipsum dolor sit amet',
              label: { text: '계산서', color: 'orange' }
            },
            {
              title: 'Do some projects on React Native with Flutter',
              image: '',
              date: '4 days ago',
              description: '',
              label: { text: '견적', color: 'red' }
            }
          ]
        },
        {
          title: 'In Progress',
          class: 'bg-blue-lighten-5',
          tasks: [
            {
              title: 'Work on Dashboard',
              image: '',
              date: '13 seconds ago',
              description: '',
              label: { text: '견적', color: 'red' }
            },
            {
              title: 'Battle with fire',
              image: 'path/to/image.jpg',
              date: '13 seconds ago',
              description: '',
              label: { text: '수주', color: 'green' }
            }
          ]
        },
        {
          title: 'Pending',
          class: 'bg-lightblue-lighten-5',
          tasks: [
            {
              title: 'Create a Nextjs Dashboard',
              image: '',
              date: '13 seconds ago',
              description: '',
              label: { text: '수주', color: 'green' }
            },
            {
              title: 'Solve Vuejs Project errors',
              image: '',
              date: '13 seconds ago',
              description: 'Lorem ipsum dolor sit amet',
              label: { text: '계산서', color: 'orange' }
            }
          ]
        },
        {
          title: 'Done',
          class: 'bg-green-lighten-5',
          tasks: [
            {
              title: 'Develop React app',
              image: 'path/to/image.jpg',
              date: '1 month ago',
              description: '',
              label: { text: '견적', color: 'red' }
            },
            {
              title: 'Do some task on Nuxtjs',
              image: '',
              date: '13 seconds ago',
              description: 'Lorem ipsum dolor sit amet',
              label: { text: '수주', color: 'green' }
            }
          ]
        }
      ]
    };
  },
  methods: {
    addTask() {
      // Task 추가 로직 구현
    },
    onDragEnd() {
      // 드래그가 끝났을 때의 로직 구현
    }
  }
};
</script>

<style>
.pa-2 {
  padding: 8px;
}
.bg-grey-lighten-4 {
  background-color: #f5f5f5;
}
.bg-blue-lighten-5 {
  background-color: #e3f2fd;
}
.bg-lightblue-lighten-5 {
  background-color: #e1f5fe;
}
.bg-green-lighten-5 {
  background-color: #e8f5e9;
}
.chip-style {
  min-width: 50px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 0.875rem;
  margin-top: 8px;
}
</style>
