<template>
  <v-card class="pa-3">
    <v-card-title class="section-title">
      <v-icon class="mr-2">mdi-email-outline</v-icon>
      Send Email with PDF Attachments
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="toEmail" label="To Email"></v-text-field>
        <v-text-field v-model="subject" label="Subject"></v-text-field>
        <v-textarea v-model="message" label="Message from buyer:" rows="3"></v-textarea>
        <div class="drop-zone" @drop.prevent="handleFileDrop" @dragover.prevent>
          Drop PDF files here or click to select
        </div>
        <v-file-input
          v-model="newAttachments"
          label="Attach PDFs"
          prepend-icon="mdi-paperclip"
          multiple
          show-size
          chips
          @change="handleFileInputChange"
        ></v-file-input>
        <v-list>
          <v-list-item v-for="(attachment, index) in attachments" :key="index">
            <v-list-item-content>{{ attachment.name || attachment }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="sendEmail">Send Email</v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" :timeout="3000" top>
      {{ snackbarMessage }}
      <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmailForm',
  props: {
    initialAttachments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      toEmail: '',
      subject: '',
      message: '',
      newAttachments: [],
      attachments: [],
      snackbar: false,
      snackbarMessage: '',
    };
  },
  created() {
    this.attachments = [...this.initialAttachments];
  },
  methods: {
    handleFileInputChange() {
      this.attachments.push(...this.newAttachments);
      this.newAttachments = [];
    },
    handleFileDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.addAttachments(Array.from(files));
    },
    addAttachments(files) {
      files.forEach(file => {
        this.attachments.push(file);
      });
    },
    addAttachment(pdfUrl) {
      this.attachments.push(pdfUrl);
    },
    setToEmail(email) {
      this.toEmail = email;
    },
    async sendEmail() {
      const formData = new FormData();
      formData.append('toEmail', this.toEmail);
      formData.append('subject', this.subject);
      formData.append('message', this.message);

      this.attachments.forEach((file) => {
        if (typeof file === 'string') {
          formData.append('attachmentUrls', file);
        } else {
          formData.append('attachments', file);
        }
      });

      try {
        const response = await axios.post('http://127.0.0.1:8888/api/send-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          this.snackbarMessage = '이메일이 성공적으로 발송되었습니다.';
          this.snackbar = true;
        } else {
          throw new Error('Email send failed');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        this.snackbarMessage = '이메일 발송에 실패했습니다.';
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.section-title {
  background-color: #00f18d;
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 16px;
}
</style>
