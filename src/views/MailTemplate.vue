<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              label="Search Templates"
              append-icon="mdi-magnify"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showTemplateForm">
              <v-icon left>mdi-plus</v-icon> Add Template
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-card class="mx-auto mail-card" color="#00BCD4" dark>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Mail Title</v-list-item-title>
                      <v-list-item-subtitle>Mail Title</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-text>
                    <v-text-field v-model="currentTemplate.mailTitle" label="Mail Title"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="mx-auto mail-card" color="#FF9800" dark>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Mail Header</v-list-item-title>
                      <v-list-item-subtitle>Mail Header</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-text>
                    <v-textarea v-model="currentTemplate.mailHeader" label="Mail Header" rows="3"></v-textarea>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="mx-auto mail-card" color="#8BC34A" dark>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Mail Body</v-list-item-title>
                      <v-list-item-subtitle>Mail Body</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-text>
                    <v-textarea v-model="currentTemplate.mailBody" label="Mail Body" rows="5"></v-textarea>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-btn color="blue darken-1" @click="saveTemplate" class="mt-4">Save Template</v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Mail Templates</v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredTemplates"
            item-key="mailTitle"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Mail Templates</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-icon small class="mr-2" @click="editTemplate(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteTemplate(item.mailTitle)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MailTemplate',
  data() {
    return {
      search: '',
      dialog: false,
      dialogTitle: '',
      valid: true,
      headers: [
        { text: 'Mail Title', value: 'mailTitle' },
        { text: 'Mail Header', value: 'mailHeader' },
        { text: 'Mail Body', value: 'mailBody' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      mailTemplates: [],
      currentTemplate: {
        mailTitle: '',
        mailHeader: '',
        mailBody: '',
      },
    };
  },
  computed: {
    filteredTemplates() {
      if (!this.search) {
        return this.mailTemplates;
      }
      return this.mailTemplates.filter(template =>
        Object.values(template).some(val =>
          String(val).toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
  },
  mounted() {
    this.fetchMailTemplates();
  },
  methods: {
    fetchMailTemplates() {
      axios.get(`http://localhost:8888/api/member/mail-templates`)
        .then(response => {
          this.mailTemplates = [response.data];  // 단일 객체를 배열로 변환
        })
        .catch(error => {
          console.error('There was an error fetching the mail templates!', error);
        });
    },
    showTemplateForm() {
      this.dialogTitle = 'Add New Template';
      this.currentTemplate = { mailTitle: '', mailHeader: '', mailBody: '' };
      this.dialog = true;
    },
    editTemplate(template) {
      this.dialogTitle = 'Edit Template';
      this.currentTemplate = { ...template };
      this.dialog = true;
    },
    deleteTemplate(mailTitle) {
      // 필요한 경우 삭제 로직을 추가합니다.
      console.log(`Delete template with title: ${mailTitle}`);
    },
    closeDialog() {
      this.dialog = false;
    },
    saveTemplate() {
      if (this.currentTemplate.mailTitle) {
        axios.put(`http://localhost:8888/api/member/mail-templates/${this.currentTemplate.mailTitle}`, this.currentTemplate)
          .then(() => {
            this.fetchMailTemplates();
            this.closeDialog();
          })
          .catch(error => {
            console.error('There was an error updating the template!', error);
          });
      } else {
        axios.post('http://localhost:8888/api/member/mail-templates', this.currentTemplate)
          .then(() => {
            this.fetchMailTemplates();
            this.closeDialog();
          })
          .catch(error => {
            console.error('There was an error creating the template!', error);
          });
      }
    },
  },
};
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
}
.v-list-item-title.headline {
  font-weight: bold;
  color: white;
}
.v-card .mx-auto {
  margin: 20px auto;
}
.v-card.mail-card {
  padding: 20px;
  height: 200px;
}
</style>
