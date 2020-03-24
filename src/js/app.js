// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
  data() {
    return {
      appScriptURL: 'https://script.google.com/macros/s/AKfycbz6ehW2s1Ni3jRCYcXx-YehgjNu9TwxTtIx-BCKPQefa2yiq1U/exec?&',
      spreadSheetID: '',
      serverURL: 'https://finance-pwa-server.herokuapp.com/cors/',
      currentDate: {},
      expensesData: [],
      incomesData: [],
      budgetData: [],
      categories: [
        '生活',
        '娛樂',
        '儲蓄',
        '教育',
        '投資',
        '贈與'
      ],
    }
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search)
    if(urlParams.has('id'))
      this.spreadSheetID = urlParams.get('id')
    else
      alert('請在網址後面加上 “？id=(spread sheet ID)”')
    this.getCurrentDate();
    this.getMonthExpenses(this.currentDate.year, this.currentDate.month);
    this.getIncomes();
    this.getBudget();
  },
  methods: {
    sortArrayByDate(arr) {
      let sorted =  arr.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return sorted.reverse()
    },
    getCurrentDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let date = yyyy + '-' + mm + '-' + dd;
      this.currentDate = {
        'date': date,
        'year': yyyy,
        'month': mm,
        'day': dd
      };
    },
    getMonthExpenses(year, month) {
      let data = {
        action: 'getmonthexpense',
        year: year,
        month: month,
        spreadsheetid: this.spreadSheetID,
      }
      var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      // console.log(this.serverURL + this.appScriptURL + queryString)

      fetch(this.serverURL + this.appScriptURL + queryString, {
        // mode: 'no-cors'
      })
      .then(response => response.json())
      .then((response) => {
        console.log(this.sortArrayByDate(response.data));
        // this.expensesData = response.data;
        this.expensesData = this.sortArrayByDate(response.data);
      })
      .catch((err) => {
        alert('錯誤:', err);
        console.log('錯誤:', err);
      });
    },
    getIncomes() {
      let data = {
        action: 'getincomes',
        spreadsheetid: this.spreadSheetID,
      }
      var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      // console.log(this.serverURL + this.appScriptURL + queryString)

      fetch(this.serverURL + this.appScriptURL + queryString, {
        // mode: 'no-cors'
      })
      .then(response => response.json())
      .then((response) => {
        this.incomesData = this.sortArrayByDate(response.data);
        // console.log(response.data)
      })
      .catch((err) => {
        alert('錯誤:', err);
        console.log('錯誤:', err);
      });
    },
    getBudget() {
      let data = {
        action: 'getbudget',
        spreadsheetid: this.spreadSheetID,
      }
      var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      // console.log(this.serverURL + this.appScriptURL + queryString)

      fetch(this.serverURL + this.appScriptURL + queryString, {
        // mode: 'no-cors'
      })
      .then(response => response.json())
      .then((response) => {
        // console.log(response.data)
        this.budgetData = response.data;
      })
      .catch((err) => {
        alert('錯誤:', err);
        console.log('錯誤:', err);
      });
    },
    addExpensesData(data) {
      this.expensesData.push(data);
    }
  }
});