<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab>Account</v-tab>
            <v-tab>Mail Template</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-title>Account Settings</v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-avatar size="128" class="mb-4">
                          <v-img :src="profilePicture"></v-img>
                        </v-avatar>
                        <v-file-input
                          label="Upload New Photo"
                          accept="image/png, image/jpeg, image/gif"
                          @change="onFileChange"
                        ></v-file-input>
                        <v-btn @click="resetPhoto">Reset</v-btn>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="user.givenName"
                              :rules="[rules.required]"
                              label="Given Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="user.familyName"
                              :rules="[rules.required]"
                              label="Family Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="user.email"
                              :rules="[rules.required, rules.email]"
                              label="Email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="user.country"
                              :rules="[rules.required]"
                              label="Country"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select
                              v-model="user.status"
                              :items="statuses"
                              :rules="[rules.required]"
                              label="Status"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="user.company"
                              label="Company"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-alert
                      type="warning"
                      v-if="!user.emailConfirmed"
                      class="mt-3"
                    >
                      Your email is not confirmed. Please check your inbox.
                      <v-btn text @click="resendConfirmation"
                      >Resend Confirmation</v-btn
                      >
                    </v-alert>
                    <v-btn color="primary" @click="saveChanges"
                    >Save Changes</v-btn
                    >
                    <v-btn @click="cancel">Cancel</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Mail Template Settings Tab -->
            <v-tab-item>
              <v-card flat>
                <v-card-title>Mail Template Settings</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-btn color="primary" @click="showTemplateForm">새 템플릿 추가</v-btn>
                      <v-list two-line>
                        <v-list-item v-for="(template, index) in mailTemplates" :key="index" @click="editTemplate(template)">
                          <v-list-item-content>
                            <v-list-item-title>{{ template.mailTitle }}</v-list-item-title>
                            <v-list-item-subtitle>{{ template.mailHeader }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>

                  <v-dialog v-model="dialog" max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ dialogTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-text-field v-model="currentTemplate.mailTitle" label="Mail Title"></v-text-field>
                          <v-textarea v-model="currentTemplate.mailHeader" label="Mail Header" rows="3"></v-textarea>
                          <v-textarea v-model="currentTemplate.mailBody" label="Mail Body" rows="5"></v-textarea>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveTemplate">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  data() {
    return {
      tab: 0,
      dialog: false,
      dialogTitle: '',
      valid: true,
      profilePicture: '',
      user: {
        givenName: '',
        familyName: '',
        email: '',
        country: '',
        status: '',
        company: '',
        emailConfirmed: false,
      },
      mailTemplates: [
        { id: 1, mailTitle: 'Template 1', mailHeader: 'Header 1', mailBody: 'Body 1' },
        { id: 2, mailTitle: 'Template 2', mailHeader: 'Header 2', mailBody: 'Body 2' },
        { id: 3, mailTitle: 'Template 3', mailHeader: 'Header 3', mailBody: 'Body 3' }
      ],
      currentTemplate: {
        id: null,
        mailTitle: '',
        mailHeader: '',
        mailBody: '',
      },
      statuses: ['Active', 'Inactive'],
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchMailTemplates();
  },
  methods: {
    fetchUserData() {
      axios.get(`http://localhost:8888/api/member-info`)
        .then(response => {
          const { member } = response.data;
          this.user.givenName = member.givenName;
          this.user.familyName = member.familyName;
          this.user.email = member.email;
          this.user.country = member.country;
          this.user.status = 'Active';
          this.user.company = 'Your Company';
          this.user.emailConfirmed = true;
          this.profilePicture = '';
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
        });
    },
    fetchMailTemplates() {
      axios.get(`http://localhost:8888/api/member/mail-templates`)
        .then(response => {
          this.mailTemplates = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the mail templates!', error);
        });
    },
    onFileChange(event) {
      const file = event;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    resetPhoto() {
      this.profilePicture = '';
    },
    resendConfirmation() {
      // Logic to resend email confirmation
    },
    saveChanges() {
      // Logic to save user changes
    },
    cancel() {
      // Logic to cancel changes and reset the form
    },
    showTemplateForm() {
      this.dialogTitle = '새 템플릿 추가';
      this.currentTemplate = { id: null, mailTitle: '', mailHeader: '', mailBody: '' };
      this.dialog = true;
    },
    editTemplate(template) {
      this.dialogTitle = '템플릿 수정';
      this.currentTemplate = { ...template };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveTemplate() {
      if (this.currentTemplate.id) {
        axios.put(`http://localhost:8888/api/member/mail-template/${this.currentTemplate.id}`, this.currentTemplate)
          .then(() => {
            this.fetchMailTemplates();
            this.closeDialog();
          })
          .catch(error => {
            console.error('There was an error updating the template!', error);
          });
      } else {
        axios.post('http://localhost:8888/api/member/mail-template', this.currentTemplate)
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
.v-avatar {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.title {
  background-color: #00BCD4;
  color: white;
  border-radius: 4px;
  padding: 10px;
}

.header {
  background-color: #FF9800;
  color: white;
  border-radius: 4px;
  padding: 10px;
}

.body {
  background-color: #8BC34A;
  color: white;
  border-radius: 4px;
  padding: 10px;
}

.v-card-title {
  font-weight: bold;
}
</style>
