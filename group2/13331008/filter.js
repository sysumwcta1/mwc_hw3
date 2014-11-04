window.onload = function() {
	var tables = getAllTables();
	makeAllTableFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTableFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var parent = tables[i].parentNode;
		var inputArea = document.createElement("div");
		inputArea.innerHTML = "<input id=\"filterInput" +i.toString() + "\" type=\"text\"/> <button id=\"inputButton" + i.toString() + "\">Filter</button>";

		if (parent.lastChild == tables[i]) {
			parent.appendChild(inputArea);
		} else {
			parent.insertBefore(inputArea, tables[i].nextSibling);
		}


		filterElement = document.getElementById("inputButton" + i.toString());
		filterElement.tableNum = i;
		filterElement.onclick = function() {
			var tables = getAllTables();
			var tr = tables[this.tableNum].rows;
			for (var j = 0; j < tr.length; j++) {
				var items = tr[j].cells;
				var length = items.length;
				var flag = 0;

				for (var k = 0; k < length; k++) {
					var test = document.getElementById("filterInput" + this.tableNum.toString());
					if (items[k].innerHTML.search(document.getElementById("filterInput" + this.tableNum.toString()).value) != -1) {
						flag = 1;
						tr[j].className += " highlight";
						break;
					}
				}

				if (flag == 0) {
					tr[j].innerHTML = "";
				}
			}
		};
	}


}