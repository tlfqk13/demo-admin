<template>
  <v-app>
    <v-container>
      <v-card class="pa-3 mb-4">
        <v-card-title class="section-title">
          <v-icon class="mr-2">mdi-email</v-icon>
          Send Email with PDF Attachments
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="sendEmail">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="toEmail" label="To Email" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="subject" label="Subject" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <strong>Message from buyer:</strong>
                <v-textarea
                  v-model="headerMessage"
                  rows="6"
                  outlined
                  class="mt-2"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <strong>Attachments:</strong>
                <v-list>
                  <v-list-item v-for="(file, index) in pdfFiles" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon small class="mr-1">mdi-attachment</v-icon>
                        <span>{{ file.name }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="pdfFiles"
                  label="Attach PDFs"
                  accept=".pdf"
                  multiple
                  @change="updateAttachments"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-btn type="submit" color="primary">Send Email</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmailForm',
  data() {
    return {
      toEmail: '',
      subject: '',
      message: '',
      pdfFiles: [], // 변경: 다중 파일을 위한 배열
      headerMessage: 'Dear Sir,\n\nGood day!\n\nPlease quote for the attached requisition of the vessel "Winnie". vessel ETA is the 15th of Singapore.\n\nRegards,\nBharani'
    };
  },
  methods: {
    updateAttachments() {
      if (this.pdfFiles.length > 0) {
        this.attachmentNames = this.pdfFiles.map(file => file.name);
      } else {
        this.attachmentNames = [];
      }
    },
    async sendEmail() {
      if (this.pdfFiles.length === 0) {
        alert('Please attach at least one PDF file.');
        return;
      }

      const formData = new FormData();
      formData.append('toEmail', this.toEmail);
      formData.append('subject', this.subject);
      formData.append('message', this.message);

      // 변경: 모든 파일을 FormData에 추가
      this.pdfFiles.forEach(file => {
        formData.append('pdfFiles', file);
      });

      try {
        await axios.post('http://localhost:8888/api/send-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Email sent successfully!');
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email.');
      }
    },
  },
};
</script>

<style>
.section-title {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}
</style>
