<template>
  <v-card class="pa-3 mb-4">
    <v-card-title class="section-title">
      <v-icon class="mr-2">mdi-email</v-icon>
      Send Email with PDF Attachment
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
          <v-col cols="12">
            <v-textarea v-model="message" label="Message" rows="4" outlined></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="pdfFiles"
              label="Attach PDF(s)"
              accept=".pdf"
              multiple
              required
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" color="primary">Send Email</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
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
      pdfFiles: [],
    };
  },
  methods: {
    async sendEmail() {
      if (this.pdfFiles.length === 0) {
        alert('Please attach at least one PDF file.');
        return;
      }

      const formData = new FormData();
      formData.append('to', this.toEmail);
      formData.append('subject', this.subject);
      formData.append('text', this.message);
      this.pdfFiles.forEach(file => {
        formData.append('attachments', file);
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
