window.onload =function(){
    var tables = getAllTables();
    makeAllTableFilterable(tables);
}
function getAllTables(){
    return document.getElementsByTagName("table");
}
function makeAllTableFilterable(tables){
    for(var t = 0 ; t < tables.length ; t++){
        inputAreaProcess(tables.item(t));
    }
}
function inputAreaProcess(table){
//添加输入域
var inputArea = document.createElement('input');
inputArea.type = 'text';
document.body.insertBefore(inputArea,table);
inputArea.style.marginBottom ="3px";

inputArea.onkeyup = function(event){
    var searching = event.target.value;
    var pattern = new RegExp(searching,"g");
    var table = event.target.nextSibling;
    var tableData = getData(table);
    for(var i = 0 ; i < tableData.length ; i++){
        var rowFlag = false;
        console.log("before : " + rowFlag);
        rowFlag = pattern.test(tableData[i]);
        console.log("after : " + rowFlag);
        rowFlag ? table.rows[i+1].style.display = 'table-row' : table.rows[i+1].style.display = 'none';
    }
    tableData = [];
}
}

function getData(table) {
    var rowsString = [];
    var cellArray = [];
    var rLength = table.rows.length;
    for (var r = 1; r < rLength; r++) {
        for (var c = 0; c < table.rows[r].cells.length; c++)
            cellArray.push(table.rows[r].cells[c].innerText);
        rowsString.push(cellArray.join(" "));
        cellArray = [];
    }
    return rowsString;
}