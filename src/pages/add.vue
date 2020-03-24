<template>
  <f7-page name="add">

    <f7-navbar :sliding="false" large>
      <f7-nav-title sliding>記帳</f7-nav-title>
      <f7-nav-title-large sliding>開始記帳</f7-nav-title-large>
    </f7-navbar>

    <f7-block strong>
      <f7-row id="price">
        <f7-col>{{ price }}</f7-col>
        <f7-col id="dollar-sign" width="10">$</f7-col>
      </f7-row>
    </f7-block>

    <f7-block strong>
      <f7-row tag="p">
        <f7-col tag="span"><f7-button large @click="addNumber('1')">1</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('2')">2</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('3')">3</f7-button></f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span"><f7-button large @click="addNumber('4')">4</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('5')">5</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('6')">6</f7-button></f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span"><f7-button large @click="addNumber('7')">7</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('8')">8</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('9')">9</f7-button></f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span"><f7-button large @click="addNumber('00')">00</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="addNumber('0')">0</f7-button></f7-col>
        <f7-col tag="span"><f7-button large @click="backspace()" icon-ios="material:backspace"></f7-button></f7-col>
      </f7-row>
    </f7-block>

    <f7-list inline-labels no-hairlines-md>
      <!-- <f7-list-input
        label="價格"
        type="text"
        :defaultValue='this.$root.price'
        placeholder="請輸入價格"
        clear-button
      ></f7-list-input> -->
      <f7-list-input
        label="名稱"
        :value='name'
        @input="name = $event.target.value"
        type="text"
        placeholder="請輸入名稱"
        :autofocus='false'
        clear-button
      ></f7-list-input>
      <f7-list-input
        label="種類"
        :value='catogory'
        @input="catogory = $event.target.value"
        type="select"
        placeholder="請選擇種類"
      >
        <option v-for='item in this.$root.categories' :value="item" :key='item'>{{ item }}</option>
      </f7-list-input>
      <f7-list-input
        label="日期"
        :value='date'
        @input="date = $event.target.value"
        type="date"
        placeholder="日期"
      ></f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button large fill @click="submit">送出</f7-button>
      <br>
      <br>
    </f7-block>

  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      price: '0',
      name: '',
      catogory: '生活',
      date: '',
    }
  },
  mounted() {
    this.date = this.$root.currentDate.date;
  },
  methods: {
    addNumber(number) {
      this.price += number;
      this.price = parseInt(this.price).toString()
    },
    backspace() {
      this.price = this.price.slice(0, -1);
    },
    submit(month) {
      let today = this.date.split('-')
      let expenseData = {
          'date': this.date,
          'year': parseInt(today[0]).toString(),
          'month': parseInt(today[1]).toString(),
          'day': parseInt(today[2]).toString(),
          'category': this.catogory,
          'name': this.name,
          'price': this.price
        }

      let data = {
        action: 'add',
        spreadsheetid: this.$root.spreadSheetID,
        data: JSON.stringify(expenseData)
      }
      var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      // console.log(this.serverURL + this.appScriptURL + queryString)

      fetch(this.$root.serverURL + this.$root.appScriptURL + queryString, {
        // mode: 'no-cors'
      })
      .then(response => {
        if(response.ok) {
          if((parseInt(today[1]) === parseInt(this.$root.currentDate.month)) && (parseInt(today[0]) === parseInt(this.$root.currentDate.year))){
            this.$root.addExpensesData(expenseData);
          }
          this.price = '0';
          this.name = '';
          this.catogory = '生活';
          this.date = this.$root.currentDate.date;
          alert('上傳成功');
        }
        else
          alert('上傳失敗：' + response.statusText)
      })
      .catch((err) => {
        alert('錯誤:', err);
        console.log('錯誤:', err);
      });
    },
  }  
}
</script>

<style scoped>
  #price{
    font-size: 30px;
  }
  #dollar-sign{
    color: gray;
  }
</style>