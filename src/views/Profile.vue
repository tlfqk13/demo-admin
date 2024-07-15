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
              <MailTemplate />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import MailTemplate from './MailTemplate.vue';

export default {
  name: 'UserProfile',
  components: {
    MailTemplate,
  },
  data() {
    return {
      tab: 0,
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
      statuses: ['Active', 'Inactive'],
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    };
  },
  mounted() {
    this.fetchUserData();
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
