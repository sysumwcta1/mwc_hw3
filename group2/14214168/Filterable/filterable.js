window.onload(){
    var tables = getAllTables();
    makeAllTableFilterable(tables);
}

function getAllTables(){
    return document.getElementById("table");
}

function makeAllTableFilterable(tables){
    for(var t = 0 ; t < tables.length ; t++){
        filterProcess(tables.item(t));
    }
}

function filterProcess(table){
var input = document.createElement("input");
var button = document.createElement("input");

input.type = 'text';

button.type = 'button';
input.value = "click"
table.appendChild(input);
table.appendChild(button);

}