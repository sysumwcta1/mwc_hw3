/*
*代码实现了筛选功能，但是未能实现高亮关键字的功能，注释也没来得及添加
*这只是作业第二题
*/

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}
function sortTables(table, iCol) {
    var ths = table.tHead.rows[0].cells;
    var tbody = table.tBodies[0];
    var colRows = tbody.rows;
    var aTrs = new Array;

    for (var i=0; i < colRows.length; i++) {  //将将得到的列放入数组，备用  
        aTrs[i] = colRows[i];  
    }

    for (var i = 0; i < ths.length; i++) {
        ths[i].className = "nochange";
    }
    if (table.sortCol == iCol) {  //判断上一次排列的列和现在需要排列的是否同一个。 
        aTrs.reverse();
        
        if (ths[iCol].change == "changeAscend") {
            ths[iCol].className = "changeDescend";
            ths[iCol].change = "changeDescend";
        } else {
            ths[iCol].className = "changeAscend";
            ths[iCol].change = "changeAscend";
        }
        
    } else {
        aTrs.sort(compareEle(iCol));  //如果不是同一列，使用数组的sort方法，传进排序函数 
        ths[iCol].className = "changeAscend";
        ths[iCol].change = "changeAscend";
    }

    var oFragment = document.createDocumentFragment();  

    for (var i=0; i < aTrs.length; i++) {
        oFragment.appendChild(aTrs[i]);
    }
    tbody.appendChild(oFragment);

    table.sortCol = iCol;  //记录最后一次排序的列索引 
}
function compareEle(iCol) {  //排序函数，iCol表示列索引，dataType表示该列的数据类型  
    return  function (oTR1, oTR2) {
        var vValue1 = oTR1.cells[iCol].textContent;
        var vValue2 = oTR2.cells[iCol].textContent;
        if (vValue1 < vValue2) {
            return -1;
        } else if (vValue1 > vValue2) {
            return 1;
        } else {
            return 0;
        }
    };
}
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].tHead.rows[0].cells;
        
        for (var j = 0; j < ths.length; j++) {
            ths[j].onclick = function() {
                ths[j].index = j;
                var table = tables[i];
                return function() {
                    sortTables(table, this.index);
                };
            }();
        }
    }
}
function appendOnclickForTodo() {
    var table = document.getElementById("todo");
    var todoInput = document.getElementById("toDoInput");
    setTimeout(function() {
        filterTheTable(todoInput.value, table);
    }, 200)
}
function appendOnclickForStaff() {
    var table = document.getElementById("staff");
    var todoInput = document.getElementById("staffInput");
    setTimeout(function() {
        filterTheTable(todoInput.value, table);
    }, 200)
}
function filterTheTable(filterText, table) {
    var tbody = table.tBodies[0];
    var tbodyRows = tbody.rows;

    for (var i = 0; i < tbodyRows.length; i++) {
        if (tbodyRows[i].textContent.indexOf(filterText) == -1) {
            tbodyRows[i].style.display = "none";
        } else {
            tbodyRows[i].style.display = "";
        }
    }
}
