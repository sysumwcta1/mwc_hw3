window.onload = function () {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables () {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		var table = tables[i];
		
		var tr_array = table.tBodies[0].rows;
		var th_array = table.tHead.rows[0].cells;

		var newrow = table.insertRow(0);
		var cell1 = newrow.insertCell();
		var cell2 = newrow.insertCell();

		var input_cell = document.createElement("input");
        cell1.appendChild(input_cell);
	    var input_button_cell = document.createElement("button");
	    cell2.appendChild(input_button_cell);
	   



		/*for (var j = th_array.length - 1; j >= 0; j--) {
			th_array[j].isOddTimes = 1;
			th_array[j].onclick = toOrder(th_array[j], tr_array, table);
		};*/
	};
}



/*function makeAllTablesSortable (tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		var table = tables[i];
		var tr_array = table.tBodies[0].rows;
		var th_array = table.tHead.rows[0].cells;
		for (var j = th_array.length - 1; j >= 0; j--) {
			th_array[j].isOddTimes = 1;
			th_array[j].onclick = toOrder(th_array[j], tr_array, table);
		};
	};
}*/

/*
function toOrder (thToSort, trToSort, table) {
	return function(){
		toSort(thToSort, trToSort, table);
		setThCss(thToSort);
		resetAll(table, thToSort);
		thToSort.isOddTimes = -(thToSort.isOddTimes);
	};
}

function toSort (thToSort, trToSort, table) {
	var rowsToSort = Array.prototype.slice.call(trToSort);
	rowsToSort.sort(sortby(thToSort.cellIndex));
*/
	/*for (var i=0; i < rowsToSort.length; i++) {
		for (var j = 0; j < rowsToSort[i].cells.length; j++) {
			trToSort[i].cells[j].textContent = rowsToSort[i].cells[j].textContent;
		};
    }*/



/*
	//将改动写入到原列表的过程
	var oFragment = document.createDocumentFragment();  
    for (var i=0; i < rowsToSort.length; i++) {
        oFragment.appendChild(rowsToSort[i]);
    }
    table.tBodies[0].appendChild(oFragment);
}

function sortby (thIndex) {
	return function(a,b){
			var aChildNode_text = a.cells[thIndex].textContent;	//注意要加上textContent！！！！
			var bChildNode_text = b.cells[thIndex].textContent;
			if (aChildNode_text > bChildNode_text) {
				return event.target.isOddTimes;
			} else if (aChildNode_text < bChildNode_text) {
				return -(event.target.isOddTimes);
			} else {
				return 0;
			}
	};
}

function setThCss (thToSetCss) {
	if (thToSetCss.isOddTimes == 1) {
		thToSetCss.className = 'thAsc';
	}
	if (thToSetCss.isOddTimes == -1) {
		thToSetCss.className = 'thDesc';
	}
}

function resetAll (table, thToSort) {
	var thsToReset = table.tHead.rows[0].cells;
	for (var i = thsToReset.length - 1; i >= 0; i--) {
		if (i != thToSort.cellIndex) {
			thsToReset[i].isOddTimes = 1;
			thsToReset[i].className = '';			
		};
	};
}
*/
