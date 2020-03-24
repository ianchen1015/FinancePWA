function doGet(e) {
    //取得參數
    let params = e.parameter; 
    let action = params.action;
    let spreadSheetID = params.spreadsheetid;
    
    //var date = params.date;
    //var month = params.month;
    //var time = params.time;
    //var category = params.category;
    //var name = params.name;
    //var price = params.price;
    //var sheetid = params.sheetid;
    //Logger.log("id: %s" , sheetid);
   
    //sheet資訊
    let SpreadSheet = SpreadsheetApp.openById(spreadSheetID);
    //var Sheet = SpreadSheet.getSheets()[0];
    //var Sheet2 = SpreadSheet.getSheets()[1];
    //var LastRow = Sheet.getLastRow();
    //console.log(LastRow)
    
    //var debug = SpreadSheet.getRange('工作表1!L12');
    //debug.setValue(idd);
    
    let sheetNumber = {
      'expenses': 0,
      'incomes': 1,
      'budget': 2
    }
    
  
    //存入資訊
    if(action === 'getmonthexpense'|| action === 'getincomes'){// Expenses or incomes
      var year = params.year;
      var month = params.month;
      
      if(action === 'getincomes'){
        var sheet = SpreadSheet.getSheets()[sheetNumber.incomes];
      }
      else{
        var sheet = SpreadSheet.getSheets()[sheetNumber.expenses];
      }
      
      let lastRow = sheet.getLastRow();
      let lastColumn = sheet.getLastColumn();// number of keys
      let data = sheet.getSheetValues(2, 1, lastRow- 1, lastColumn)// get data
      let keys = sheet.getSheetValues(1, 1, 1, lastColumn)[0]// get keys
      
      // convert array to dict according to keys
      let dicts = []
      data.forEach(
        arr => {
          let d = {}
          keys.forEach((item, idx) => {
            d[item] = arr[idx]});
          dicts.push(d)
      });
        
      // Apply filter (need to be optimized)
      if(action === 'getmonthexpense')
        dicts = dicts.filter(item =>
          (item.year == year) && (item.month == month) )
        
      Logger.log("recent: %s" , JSON.stringify({'data': dicts}));
      return ContentService.createTextOutput(JSON.stringify({'data': dicts}));
    }
    else if(action === 'getbudget'){
      let budgetSheet = SpreadSheet.getSheets()[sheetNumber.budget];
      let lastRow = budgetSheet.getLastRow();
      let data = budgetSheet.getSheetValues(3, 1, lastRow- 2, 2)// get data
      //Logger.log("recent: %s" , JSON.stringify({'data': data}));
      return ContentService.createTextOutput(JSON.stringify({'data': data}));
    }
    else if(action === 'add'){// add record to expenses sheet by data in request
      let data = JSON.parse(params.data);
      var sheet = SpreadSheet.getSheets()[sheetNumber.expenses];
      let lastRow = sheet.getLastRow();
      let lastColumn = sheet.getLastColumn();
      let keys = sheet.getSheetValues(1, 1, 1, lastColumn)[0]// get keys
      
      //let keyIdx = keys.findIndex((key) => {return key === 'name'}) + 1
      
      var id = parseInt(sheet.getSheetValues(lastRow, 1, 1,1)) + 1
      sheet.getRange(lastRow+1, 1).setValue(id);// auto generate id
  
      for (const [key, value] of Object.entries(data)) {// for items in dict
        let keyIdx = keys.findIndex((item) => {return item === key}) + 1// find key idx
        sheet.getRange(lastRow+1, keyIdx).setValue(value);// add values
      }
      return ContentService.createTextOutput("success");
    }
   
  }
  
  //call
  function debug() {
    var Result = doGet(
      {
        "parameter": {
          action: 'getmonthexpense',
          year: '2020',
          month: '3',
          spreadsheetid: '14Z_h6ujdrMqAY9MKN-Kfvcwc8N3qfR0MIwlniplcLks',
        
        }
      }
    );
    Logger.log("Result: %s" , Result);
  }