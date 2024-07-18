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
            <v-data-table
              :headers="headers"
              :items="filteredTemplates"
              item-key="id"
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
                <v-icon small @click="deleteTemplate(item.id)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mx-auto mail-card">
                <div class="card-header company-card">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Company Name</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <v-card-text>
                  <v-text-field v-model="currentTemplate.companyName" label="Company Name"></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="mx-auto mail-card">
                <div class="card-header mail-title-card">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Mail Title</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <v-card-text>
                  <v-text-field v-model="currentTemplate.mailTitle" label="Mail Title"></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card class="mx-auto mail-card">
                <div class="card-header mail-header-card">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Mail Header</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <v-card-text>
                  <v-textarea v-model="currentTemplate.mailHeader" label="Mail Header" rows="4"></v-textarea>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card class="mx-auto mail-card">
                <div class="card-header mail-body-card">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">Mail Body</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <v-card-text>
                  <v-textarea v-model="currentTemplate.mailBody" label="Mail Body" rows="8"></v-textarea>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveTemplate">Save Template</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: 'Company Name', value: 'companyName' },
        { text: 'Mail Title', value: 'mailTitle' },
        { text: 'Mail Header', value: 'mailHeader' },
        { text: 'Mail Body', value: 'mailBody' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      mailTemplates: [],
      currentTemplate: {
        id: null,
        companyName: '',
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
          if (response.data && !Array.isArray(response.data)) {
            this.mailTemplates = [response.data];
          } else {
            this.mailTemplates = response.data;
          }
        })
        .catch(error => {
          console.error('There was an error fetching the mail templates!', error);
        });
    },
    showTemplateForm() {
      this.dialogTitle = 'Add New Template';
      this.currentTemplate = { id: null, companyName: '', mailTitle: '', mailHeader: '', mailBody: '' };
      this.dialog = true;
    },
    editTemplate(template) {
      this.dialogTitle = 'Edit Template';
      this.currentTemplate = { ...template };
      this.dialog = true;
    },
    deleteTemplate(id) {
      axios.delete(`http://localhost:8888/api/member/mail-template/${id}`)
        .then(() => {
          this.fetchMailTemplates();
        })
        .catch(error => {
          console.error('There was an error deleting the template!', error);
        });
    },
    closeDialog() {
      this.dialog = false;
    },
    saveTemplate() {
      const requestPayload = {
        id: this.currentTemplate.id,
        companyName: this.currentTemplate.companyName,
        mailTitle: this.currentTemplate.mailTitle,
        mailHeader: this.currentTemplate.mailHeader,
        mailBody: this.currentTemplate.mailBody,
      };

      if (this.currentTemplate.id) {
        axios.put(`http://localhost:8888/api/member/mail-template/${this.currentTemplate.id}`, requestPayload)
          .then(() => {
            this.fetchMailTemplates();
            this.closeDialog();
          })
          .catch(error => {
            console.error('There was an error updating the template!', error);
          });
      } else {
        axios.post('http://localhost:8888/api/member/mail-template', requestPayload)
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
  margin: 10px auto;
}
.v-card.mail-card {
  padding: 0;
  background-color: white;
}
.card-header {
  padding: 6px;
}
.company-card {
  height: 70px;
  background-color: #cdd400;
}
.mail-title-card {
  height: 70px;
  background-color: #00BCD4;
}
.mail-header-card {
  height: 70px;
  background-color: #FF9800;
}
.mail-body-card {
  height: 70px;
  background-color: #8BC34A;
}
.mail-header-card .v-card-text {
  height: 200px;
}
.mail-body-card .v-card-text {
  height: 200px;
}
.v-card-text {
  padding: 20px;
}
</style>
