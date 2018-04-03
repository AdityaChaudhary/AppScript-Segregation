function getUnique(){
  var col = 4 ; // choose the column you want to use as data source (0 indexed, it works at array level)
  var sh = SpreadsheetApp.getActiveSheet();
  var ss = SpreadsheetApp.getActive().getSheetByName('all controls');
  var data=ss.getDataRange().getValues();// get all data
  //Logger.log(data);
  var newdata = new Array();
  var i = 0;
  for(nn in data){
    i += 1;
    if(i<=1)
      continue;
    var duplicate = false;
    for(j in newdata){
      if(data[nn][col] == newdata[j][0]){
        duplicate = true;
      }
    }
    if(!duplicate){
      newdata.push([data[nn][col]]);
    }
  }
  //Logger.log(newdata);
/*  newdata.sort(function(x,y){
  var xp = Number(x[0]);// ensure you get numbers
  var yp = Number(y[0]);
  return xp == yp ? 0 : xp < yp ? -1 : 1;// sort on numeric ascending
});*/
  //Logger.log(newdata);
 //sh.getRange(1,5,newdata.length,newdata[0].length).setValues(newdata);// paste new values sorted in column of your choice (here column 5, indexed from 1, we are on a sheet))

  return newdata;
 }


function Phantasm() {

  var col = 4 ; // choose the column you want to use as data source (0 indexed, it works at array level)
  //var sh = SpreadsheetApp.openById('1q_n6mQ3YOeRKWHoQP0yHB1TO-ToEQ-I8deDZE6nRefI');
  var sh = SpreadsheetApp.getActiveSheet();
  var ss = SpreadsheetApp.getActive().getSheetByName('all controls');
  var data = ss.getDataRange().getValues();// get all data
  Logger.log("[#]DATA len: " + data.length);
  //SpreadsheetApp.getActiveSpreadsheet().insertSheet('Final');
  var finalSheet = SpreadsheetApp.getActive().getSheetByName('final');
  try{
    Logger.log('Rows'+finalSheet.getLastRow());
    for(var i = 1; i<=finalSheet.getLastRow(); i++){
      finalSheet.deleteRow(i);
    }
    //finalSheet.deleteRows(1, finalSheet.getMaxRows()-1);
  }catch(e){
    Logger.log('[#]Exception: ' + e);
  }

  //return;

  finalSheet.appendRow(data[0]);

//  Logger.log("Hi");


//  var newdata = new Array();

  var unique = getUnique();
  //Logger.log(unique);


  //return;

  for(var rowNum = 0; rowNum < unique.length; rowNum ++){

    //if(rowNum > 10)
      //continue;
    var cell = unique[rowNum][0];
    //Logger.log('[#]' + rowNum + ' : ' +  cell);
    var j = 1;
    var count = 0;
    var ips = [];
    var out;
    while(j < data.length){
      if(cell === data[j][col]){
        count += 1;
        ips.push(data[j][2]);
        out = data[j];
      }
      j += 1;
    }

    ips = ips.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });

    //Logger.log('out' + ips);
    var test = ips.length > 12 ? 'F' : 'T';
    Logger.log('[#]out: ' + cell + ' -> ' + test)
    //return;

    out[2] = ips.join('\n');
    finalSheet.appendRow(out);

//    Logger.log('[#]Count :' + rowNum + ' : ' + count);


   }

}
