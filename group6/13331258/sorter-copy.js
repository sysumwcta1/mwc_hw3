window.onload = function () {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables () {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable (tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		var table = tables[i];
		var tr_array = table.tBodies[0].rows;
		var th_array = table.tHead.rows[0].cells;
		for (var j = th_array.length - 1; j >= 0; j--) {
			th_array[j].isOddTimes = 1;
			th_array[j].onclick = toOrder(th_array[j], tr_array);
		};
	};
}
function toOrder (thToSort, trToSort) {
	return function(){
		toSort(thToSort, trToSort);
		setThCss(thToSort);
		resetAll(thToSort);
		thToSort.isOddTimes = -(thToSort.isOddTimes);
	};
}

function toSort (thToSort, trToSort) {
	thIndex = thToSort.cellIndex;
	//var rowsToSort = trToSort;
	var rowsToSort = Array.prototype.slice.call(trToSort);
	rowsToSort.sort(sortby(thIndex));
	trToSort = rowsToSort;
}
function sortby (thIndex) {
	return function(a,b){
			var aChildNode = a.cells[thIndex];
			var bChildNode = b.cells[thIndex];
			if (aChildNode > bChildNode) {
				return event.target.isOddTimes;
			} else if (aChildNode < bChildNode) {
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

function resetAll (thToReset) {
	var thsToReset = thToReset.parentNode.childNodes;
	for (var i = thsToReset.length - 1; i >= 0, i != thsToReset[i].isOddTimes; i--) {
		thsToReset[i].isOddTimes = 1;
		thsToReset[i].className = '';
	};
}