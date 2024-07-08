<template>
  <v-app>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="companyName" label="Company Name"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="vesselName" label="Vessel Name"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="refNumber" label="Reference Number" :readonly="true"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="date" label="Date" type="date"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="maker" label="MAKER"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="type" label="TYPE"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card class="mb-4">
              <v-card-title>Header</v-card-title>
              <v-card-text>
                <v-textarea v-model="headerMessage" rows="3"></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-btn type="button" @click="addItem" color="primary" class="mb-4">Add Item</v-btn>

        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th>NO.</th>
              <th>CODE</th>
              <th>DESCRIPTION</th>
              <th>Q'TY</th>
              <th>UNIT</th>
              <th>U/PRICE</th>
              <th>AMOUNT</th>
              <th>NOTES</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td><v-text-field v-model="item.code" dense></v-text-field></td>
              <td><v-text-field v-model="item.description" dense></v-text-field></td>
              <td><v-text-field v-model="item.qty" type="number" dense></v-text-field></td>
              <td><v-text-field v-model="item.unit" dense></v-text-field></td>
              <td><v-text-field v-model="item.uprice" type="number" dense></v-text-field></td>
              <td><v-text-field v-model="item.amount" type="number" dense></v-text-field></td>
              <td><v-textarea v-model="item.notes" rows="1" dense></v-textarea></td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-btn type="submit" color="primary" class="mt-4">Generate and Send</v-btn>
      </v-form>

      <div class="preview" v-html="generateHtmlTemplate(lineHeightNormal)"></div>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import Handlebars from 'handlebars';

// 이미지 경로를 require를 사용하여 불러오기
const logoPath = require('@/assets/baskorea_logo.png');

export default {
  name: "QuotationRequest",
  data() {
    return {
      companyName: '',
      vesselName: '',
      refNumber: this.generateReferenceNumber(),
      date: this.getCurrentDate(),
      maker: '',
      type: '',
      headerMessage: '귀사의 무궁한 발전을 기원합니다.\n하기와 같이 견적서 외뢰하오니 빠른 회신 부탁드립니다.',
      items: [
        { code: '', description: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '' },
        { code: '', description: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '' },
        { code: '', description: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '' }
      ],
      lineHeightNormal: 1.2,
      lineHeightCompact: 0.3
    };
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
    generateReferenceNumber() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const uniqueNumber = Math.floor(1000 + Math.random() * 9000); // 1000부터 9999까지의 랜덤 숫자 생성
      return `${yyyy}${mm}${dd}-${uniqueNumber}`;
    },
    addItem() {
      this.items.push({ code: '', description: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '' });
    },
    generateHtmlTemplate(lineHeight) {
      const headerLines = this.headerMessage.split('\n').map(line => `<div>${line}</div>`).join('');

      const templateString = `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>견적 의뢰서</title>
            <style>
                /* CSS Reset */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                @page {
                    size: A4;
                    margin: 20mm;
                }
                body {
                    font-family: 'NanumBarunGothic', sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .logo-header {
                    text-align: center;
                    margin-bottom: 10px;
                }

                .logo-header img {
                    vertical-align: middle;
                }

                .company-info {
                    text-align: center;
                    font-size: 12px;
                    line-height: 1.2;
                }

                .sub-header {
                    text-align: center;
                    margin: 20px 0;
                    font-size: 24px;
                    font-weight: bold;
                }

                .line {
                    border-top: 1px solid black;
                    margin: 10px 0;
                }

                .document-info {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin: 20px 0;
                }

                .left {
                    display: flex;
                    flex-direction: column;
                }

                .right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    text-align: right;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }

                table, th, td {
                    border: 1px solid black;
                }

                th, td {
                    padding: 8px;
                    text-align: center;
                }

                .header-message {
                    white-space: pre-wrap;
                    border: 1px solid #ddd;
                    padding: 8px;
                    margin-bottom: 20px;
                    background-color: #f9f9f9;
                    line-height: ${lineHeight}; /* 줄 간격 설정 */
                }
            </style>
        </head>
        <body>
        <div class="logo-header">
            <img src="${logoPath}" alt="BAS KOREA 로고" width="100">
            <div class="company-info">
                BAS KOREA CO.<br>
                43-4, Gyeongjeoncheon-ro 248beon-gil, Gangseo-gu, Busan Korea 46719<br>
                Tel: +82-51-797-7078 Fax: +82-51-793-0635<br>
                Email: info@bas-korea.com
            </div>
        </div>

        <div class="line"></div>

        <div class="sub-header">
            견적 의뢰서
        </div>

        <div class="document-info">
            <div class="left">
                <div>MESSRS: {{companyName}}</div>
                <div>VESSEL: {{vesselName}}</div>
            </div>
            <div class="right">
                <div>OUR REF No: {{refNumber}}</div>
                <div>DATE: {{date}}</div>
            </div>
        </div>

        <div class="line"></div>

        <div class="header-message">${headerLines}</div>

        <table>
            <thead>
            <tr>
                <th colspan="8">
                    MAKER: ${this.maker}<br>
                    TYPE: ${this.type}
                </th>
            </tr>
            <tr>
                <th>NO.</th>
                <th>CODE</th>
                <th>DESCRIPTION</th>
                <th>Q'TY</th>
                <th>UNIT</th>
                <th>U/PRICE</th>
                <th>AMOUNT</th>
                <th>NOTES</th>
            </tr>
            </thead>
            <tbody>
            {{#each items}}
            <tr>
                <td>{{@index}}</td>
                <td>{{this.code}}</td>
                <td>{{this.description}}</td>
                <td>{{this.qty}}</td>
                <td>{{this.unit}}</td>
                <td>{{this.uprice}}</td>
                <td>{{this.amount}}</td>
                <td>{{this.notes}}</td>
            </tr>
            {{/each}}
            </tbody>
        </table>

        </body>
        </html>
      `;

      const template = Handlebars.compile(templateString);
      return template({
        companyName: this.companyName,
        vesselName: this.vesselName,
        refNumber: this.refNumber,
        date: this.date,
        headerMessage: headerLines,
        items: this.items
      });
    },
    async submitForm() {
      const htmlContent = this.generateHtmlTemplate(this.lineHeightCompact);
      try {
        const response = await axios.post('http://127.0.0.1:8888/api/convert-and-upload-pdf', htmlContent, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error sending request:', error);
      }
    }
  }
}
</script>

<style>
.preview {
  border: 1px solid #ccc;
  padding: 16px;
  margin-top: 32px;
  background-color: #f9f9f9;
}
</style>
