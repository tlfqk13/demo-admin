<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <!-- First Column: Daily Activities -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="https://via.placeholder.com/400x200" height="200px"></v-img>
            <v-card-text>
              <div class="d-flex justify-space-between">
                <div>
                  <v-icon left>mdi-calendar</v-icon>
                  22 March, 2021
                </div>
              </div>
              <h3>Super awesome, Vue is coming!</h3>
              <v-chip class="ma-2" color="orange" text-color="white">Medium</v-chip>
              <v-chip class="ma-2" color="pink" text-color="white">Low</v-chip>
            </v-card-text>
            <v-card-actions>
              <v-avatar class="ma-2" size="32" v-for="(avatar, index) in avatars" :key="index">
                <img :src="avatar">
              </v-avatar>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Second Column: Weekly Stats -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Weekly Stats</v-card-title>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left color="red">mdi-cart</v-icon>
                  Top Sales
                </v-list-item-title>
                <v-list-item-subtitle>Johnathan Doe</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip color="grey" text-color="white">+68%</v-chip>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left color="yellow">mdi-star</v-icon>
                  Best Seller
                </v-list-item-title>
                <v-list-item-subtitle>MaterialPro Admin</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip color="grey" text-color="white">+45%</v-chip>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left color="green">mdi-comment</v-icon>
                  Most Commented
                </v-list-item-title>
                <v-list-item-subtitle>Ample Admin</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip color="grey" text-color="white">+10%</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left color="green">mdi-comment</v-icon>
                  Most Commented
                </v-list-item-title>
                <v-list-item-subtitle>Ample Admin</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip color="grey" text-color="white">+10%</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left color="green">mdi-comment</v-icon>
                  Most Commented
                </v-list-item-title>
                <v-list-item-subtitle>Ample Admin</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip color="grey" text-color="white">+10%</v-chip>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>

        <!-- Third Column: Daily Activities -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Daily Activities</v-card-title>
            <v-list dense>
              <v-list-item v-for="(activity, index) in activities" :key="index">
                <v-list-item-avatar>
                  <v-icon :color="activity.color">{{ activity.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- Additional Columns -->
      <v-row>
        <v-col v-for="(item, index) in items1" :key="`sheet-${index}`" cols="12" sm="6" md="3">
          <v-card class="mt-4 mx-auto">
            <v-sheet class="v-sheet--offset mx-auto" :color="item.color" elevation="12" max-width="calc(100% - 32px)">
              <v-sparkline :labels="item.labels" :value="item.value" color="white" line-width="2" padding="16" />
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="text-h6 my-2">{{ item.title }}</div>
              <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
              <v-divider class="my-2" />
              <v-icon class="mr-2" small>mdi-clock</v-icon>
              <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="(color, index) in ['dark', 'cyan', 'success']" :key="index" cols="12" sm="4">
          <v-card class="mx-auto text-center" :color="color" dark>
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline :value="item" color="rgba(255, 255, 255, .7)" height="100" padding="24" stroke-linecap="round" smooth>
                  <template v-slot:label="item">
                    ${{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <div class="text-h4 font-weight-thin">Sales Last 24h</div>
            </v-card-text>

            <v-divider />

            <v-card-actions class="justify-center">
              <v-btn block text>Go to Report</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DashboardView',
  data: () => ({
    avatars: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/32.jpg',
      'https://randomuser.me/api/portraits/men/33.jpg'
    ],
    activities: [
      { title: 'Meeting with John', time: '04:05 AM', icon: 'mdi-account', color: 'green' },
      { title: 'Payment received of $385.90', time: '04:25 AM', icon: 'mdi-currency-usd', color: 'orange' },
      { title: 'Project Meeting', time: '05:26 AM', icon: 'mdi-calendar', color: 'blue' },
      { title: 'New Sale recorded #ML-3467', time: '05:12 AM', icon: 'mdi-cart', color: 'yellow' },
      { title: 'Payment was made to Michael', time: '06:23 AM', icon: 'mdi-currency-usd', color: 'red' }
    ],
    items1: [
      {
        color: 'blue',
        title: '총 판매량',
        labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        value: [200, 675, 410, 390, 310, 460, 250, 240]
      },
      {
        color: 'red',
        title: '하루 판매량',
        labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        value: [200, 675, 410, 390, 310, 460, 250, 240]
      },
      {
        color: 'green',
        title: '일 업무 처리 수',
        labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        value: [200, 675, 410, 390, 310, 460, 250, 240]
      },
      {
        color: 'primary',
        title: '월별 매출',
        labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
        value: [200, 675, 410, 390, 310, 460, 250, 240]
      }
    ],
    item: [423, 446, 675, 510, 590, 610, 760]
  })
};
</script>

<style scoped>
.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 0.875rem;
}

.v-chip {
  margin: 0 5px 5px 0;
}
</style>
