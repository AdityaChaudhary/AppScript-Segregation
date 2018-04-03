function PhantomMerger() {

  var cRow = 8; //control row number

  //var sh = SpreadsheetApp.getActiveSheet();
  var toAddSheet = SpreadsheetApp.getActive().getSheetByName('ToAdd');
  var toAddData = toAddSheet.getDataRange().getValues();// get all data from add-data sheet

  var filterPSheet = SpreadsheetApp.getActive().getSheetByName('filterP');
  var filterPData = filterPSheet.getDataRange().getValues();// get all data from filterP-data sheet

  var finalProdSheet = SpreadsheetApp.getActive().getSheetByName('finalProd');
  try{
    Logger.log('Rows'+finalProdSheet.getLastRow());
    for(var i = 1; i<=finalProdSheet.getLastRow(); i++){
      finalProdSheet.deleteRow(i);
    }
  }catch(e){
    Logger.log('[#]Exception: ' + e);
  }



  //add first row to production sheet
  finalProdSheet.appendRow(filterPData[0]);

  var mergedControls = [];

  for(nn in filterPData){
    if(nn < 1)
      continue;

    var control = filterPData[nn][cRow].toString().trim();
    //Logger.log(control);
    var pIPs = filterPData[nn][1];
    //Logger.log(pIPs);

    for(pp in toAddData){
      if(pp < 1)
        continue;

      var bControl = toAddData[pp][cRow].toString().trim();
      //Logger.log(bControl);
      if(control == bControl){
        pIPs = pIPs + "\n" + toAddData[pp][1]
        mergedControls.push(control);
        break;
      }

      //Logger.log(filterPData[nn][1] + "\n" + toAddData[pp][1]);
    }


    filterPData[nn][1] = pIPs;
    finalProdSheet.appendRow(filterPData[nn]);

  }

  //Logger.log(mergedControls);

  for(qq in toAddData){
      if(qq < 1)
       continue;
      if(mergedControls.indexOf(toAddData[qq][cRow].toString().trim()) < 0) {
      //Logger.log(typeof(toAddData[qq][cRow]));
        finalProdSheet.appendRow(toAddData[qq]);
      }
   }


}
