<template>
  <v-app>
    <v-container>
      <v-card class="pa-3 mb-4">
        <v-card-title class="section-title">
          <v-icon class="mr-2">mdi-lightbulb-on-outline</v-icon>
          Smart options to fill your Quotation automatically!
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card outlined>
                <v-card-title>
                  <v-icon class="mr-2">mdi-file-excel</v-icon>
                  Excel file
                </v-card-title>
                <v-card-text>
                  xls template to quote your prices easily
                </v-card-text>
                <v-card-actions>
                  <div
                      class="drop-zone"
                      @dragover.prevent
                      @dragenter.prevent
                      @drop.prevent="handleDropExcel"
                  >
                    Drop Excel files here or click to select
                  </div>
                  <v-file-input
                      v-model="file"
                      label="Upload Excel File"
                      @change="handleFileUpload"
                      accept=".xlsx, .xls"
                  ></v-file-input>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card outlined>
                <v-card-title>Header</v-card-title>
                <v-card-text>
                  <v-textarea v-model="headerMessage" rows="3"></v-textarea>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="companyName"
                label="Company Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="vesselName"
                label="Vessel Name"
                append-icon="mdi-magnify"
                @click:append="openVesselDialog"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="refNumber" label="Reference Number" :readonly="false"></v-text-field>
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
          <v-col cols="12" md="3">
            <v-text-field
                v-model="selectedSuppliersLabel"
                label="Select Suppliers"
                append-icon="mdi-magnify"
                readonly
                @click:append="openSupplierDialog"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn type="button" @click="addItem" color="primary" class="mb-4">Add Item</v-btn>

        <item-list :items="items" @remove-item="removeItem"></item-list>

        <v-btn type="submit" color="primary" class="mt-4 mb-4">Generate</v-btn>
      </v-form>

      <v-expansion-panels v-model="previewPanel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <b>견적 의뢰서 미리보기</b>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="preview" v-html="generateHtmlTemplate(lineHeightNormal)"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-snackbar v-model="snackbar" :timeout="3000" top>
        {{ snackbarMessage }}
        <v-btn color="red" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>

      <!-- EmailForm 컴포넌트를 하단에 추가 -->
      <email-form ref="emailForm" class="mt-4"></email-form>

      <!-- Supplier selection dialog -->
      <v-dialog v-model="supplierDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Select Suppliers</span>
          </v-card-title>
          <v-card-text>
            <v-checkbox v-model="allSuppliersSelected" @change="selectAllSuppliers" label="Select All"></v-checkbox>
            <v-divider></v-divider>
            <div v-for="supplier in suppliers" :key="supplier.id">
              <v-checkbox
                  :label="supplier.businessName"
                  :value="supplier.id"
                  v-model="selectedSuppliers"
              ></v-checkbox>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeSupplierDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveSelectedSuppliers">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Vessel selection dialog -->
      <v-dialog v-model="vesselDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Select Vessel</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="vesselSearch"
                label="Search"
                append-icon="mdi-magnify"
                @click:append="fetchVessels"
            ></v-text-field>
            <v-divider></v-divider>
            <v-list>
              <v-list-item v-for="vessel in filteredVessels" :key="vessel.id" @click="selectVessel(vessel)">
                <v-list-item-title>{{ vessel.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="closeVesselDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
import Handlebars from 'handlebars';
import EmailForm from '@/views/EmailForm.vue'; // EmailForm 컴포넌트를 import
import ItemList from '@/views/ItemList.vue'; // ItemList 컴포넌트를 import

// 이미지 경로를 require를 사용하여 불러오기
const logoPath = require('@/assets/baskorea_logo.png');

export default {
  name: "MakeInquiry",
  components: {
    EmailForm, // 컴포넌트를 등록
    ItemList // ItemList 컴포넌트 등록
  },
  data() {
    return {
      companyName: '',
      vesselName: '',
      vesselSearch: '',
      vessels: [],
      refNumber: this.generateReferenceNumber(),
      date: this.getCurrentDate(),
      maker: '',
      type: '',
      headerMessage: '귀사의 무궁한 발전을 기원합니다.\n하기와 같이 견적서 외뢰하오니 빠른 회신 부탁드립니다.',
      items: [
        {itemId: null, itemCode: '', itemDescription: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '', opt: ''},
        {itemId: null, itemCode: '', itemDescription: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '', opt: ''},
        {itemId: null, itemCode: '', itemDescription: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '', opt: ''}
      ],
      lineHeightNormal: 1.2,
      lineHeightCompact: 0.3,
      file: null,
      previewPanel: [0], // 기본으로 열려있는 상태
      snackbar: false,
      snackbarMessage: '',
      supplierDialog: false,
      vesselDialog: false,
      allSuppliersSelected: false,
      suppliers: [],
      selectedSuppliers: [],
      selectedSuppliersLabel: ''
    };
  },
  created() {
    this.fetchSuppliers();
    this.fetchVessels();
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
      this.items.push({itemId: null, itemCode: '', itemDescription: '', qty: 0, unit: '', uprice: 0, amount: 0, notes: '', opt: ''});
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    handleFileUpload() {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        // Setting items from Excel data (skipping the header row)
        this.items = json.slice(1).map(row => ({
          itemId: null,
          itemCode: row[0] || '',
          itemDescription: row[1] || '',
          qty: row[2] || 0,
          unit: row[3] || '',
          uprice: row[4] || 0,
          amount: row[5] || 0,
          notes: row[6] || '',
          opt: ''
        }));
      };
      reader.readAsArrayBuffer(this.file);
    },
    handleDropExcel(event) {
      const files = event.dataTransfer.files;
      this.file = files[0];
      this.handleFileUpload();
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
            <tr>
                <th>NO.</th>
                <th>ITEM ID</th>
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
                <td>{{this.itemId}}</td>
                <td>{{this.itemCode}}</td>
                <td>{{this.itemDescription}}</td>
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
        logoPath,
        companyName: this.companyName,
        vesselName: this.vesselName,
        refNumber: this.refNumber,
        date: this.date,
        headerMessage: headerLines,
        maker: this.maker,
        type: this.type,
        lineHeight,
        items: this.items
      });
    },
    async submitForm() {
      const htmlContent = this.generateHtmlTemplate(this.lineHeightCompact);
      try {
        const pdfResponse = await axios.post('http://127.0.0.1:8888/api/convert-and-upload-pdf', htmlContent, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });

        if (!pdfResponse.data || !pdfResponse.data.pdfUrl) {
          throw new Error("PDF URL is missing in the response");
        }

        const pdfUrl = pdfResponse.data.pdfUrl; // Assuming your backend returns the URL of the uploaded PDF

        // Now send the form data along with the PDF URL to your backend
        const customerInquiry = {
          companyName: this.companyName,
          vesselName: this.vesselName,
          refNumber: this.refNumber,
          date: this.date,
          maker: this.maker,
          type: this.type,
          inquiryType: 'CUSTOMER_INQUIRY',
          memberId: 1, // 예시로 회원 ID 설정
          inquiryItemDetails: this.items.map(item => ({
            itemId: item.itemId,
            itemCode: item.itemCode,
            itemDescription: item.itemDescription,
            qty: item.qty,
            unit: item.unit,
            uprice: item.uprice,
            amount: item.amount,
            notes: item.notes
          })),
          pdfUrl: pdfUrl
        };

        const response = await axios.post('http://127.0.0.1:8888/api/customer-inquiries', customerInquiry);
        console.log('Customer Inquiry Response:', response.data);

        // Update the email form attachments
        this.$refs.emailForm.addAttachment(pdfUrl);
        this.snackbarMessage = '생성되었습니다';
        this.snackbar = true;

        // Fetch mail template and set email form data
      } catch (error) {
        console.error('Error sending request:', error);
        this.snackbarMessage = '생성에 실패했습니다';
        this.snackbar = true;
      }
    },
    openSupplierDialog() {
      this.supplierDialog = true;
    },
    closeSupplierDialog() {
      this.supplierDialog = false;
    },
    selectAllSuppliers() {
      if (this.allSuppliersSelected) {
        this.selectedSuppliers = this.suppliers.map(supplier => supplier.id);
      } else {
        this.selectedSuppliers = [];
      }
    },
    async fetchSuppliers() {
      try {
        const response = await axios.get('http://127.0.0.1:8888/api/suppliers');
        if (response.data && Array.isArray(response.data.suppliers)) {
          this.suppliers = response.data.suppliers.filter(supplier => supplier && supplier.id !== null); // null 값 필터링
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    },
    saveSelectedSuppliers() {
      console.log('Selected suppliers:', this.selectedSuppliers);
      this.selectedSuppliersLabel = this.suppliers
          .filter(supplier => this.selectedSuppliers.includes(supplier.id))
          .map(supplier => supplier.businessName)
          .join(', ');

      const selectedEmails = this.suppliers
          .filter(supplier => this.selectedSuppliers.includes(supplier.id))
          .map(supplier => supplier.email)
          .join(', ');

      this.$refs.emailForm.setToEmail(selectedEmails);
      this.closeSupplierDialog();
    },
    openVesselDialog() {
      this.vesselDialog = true;
    },
    closeVesselDialog() {
      this.vesselDialog = false;
    },
    async fetchVessels() {
      try {
        const response = await axios.get('http://127.0.0.1:8888/api/vessels');
        if (response.data && Array.isArray(response.data.vessels)) {
          this.vessels = response.data.vessels.filter(vessel => vessel && vessel.id !== null); // null 값 필터링
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching vessels:', error);
      }
    },
    selectVessel(vessel) {
      this.vesselName = vessel.name;
      this.closeVesselDialog();
    }
  },
  computed: {
    filteredVessels() {
      if (!this.vesselSearch) {
        return this.vessels;
      }
      return this.vessels.filter(vessel =>
          vessel.name.toLowerCase().includes(this.vesselSearch.toLowerCase())
      );
    }
  }
}
</script>

<style>
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

.preview {
  border: 1px solid #ccc;
  padding: 16px;
  margin-top: 32px;
  background-color: #f9f9f9;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 16px;
  width: 50%; /* 추가 */
}
</style>
