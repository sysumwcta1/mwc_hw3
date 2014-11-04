window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName('table');
	return tables;
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var ah2 = document.getElementsByTagName('h2');
		var oTxt = document.createElement('input');
		oTxt.type = "text";
		oTxt.className = "ajustment";
		var oBtn = document.createElement('input');
		oBtn.type = "button";
		oBtn.value = "filter";
		ah2[i].appendChild(oTxt);                        //附加输入域
		ah2[i].appendChild(oBtn);
		filterTheTable(tables[i], oTxt, oBtn);
	}
 	
}

function filterTheTable(table, oTxt, oBtn) {
	var oTbody = table.tBodies[0];
	var colRows = oTbody.rows;

	oBtn.onclick = function() {
		var aTrs = new Array;
		for(var i = 0; i < colRows.length; i++) {
			var checked = false;
			for(var j = 0; j < colRows[i].cells.length; j++) {
				var index = colRows[i].cells[j].innerHTML.search(oTxt.value);
				if (index != -1) {                        //search方法返回搜索字段的下标，若不等于-1表示能搜索到
					if (!checked) {                       //布尔变量checked记录此行是否已被加入新表格
						aTrs.push(colRows[i]);
						checked = true;
					}
					var str = colRows[i].cells[j].innerHTML;
					var substr1 = str.substring(0,index);
					var substr2 = oTxt.value;
					var substr3 = str.substring(index + substr2.length);
					colRows[i].cells[j].innerHTML = substr1 + "<span>" + substr2 + "</span>" + substr3;
					//在搜索字段的两端加入span标签，实现高亮
				}
			}
		}

		var aSpan = oTbody.getElementsByTagName('span');
		for (var i = 0; i < aSpan.length; i++) {
			aSpan[i].className = "active";
		}

		var oFragment = document.createDocumentFragment();

		for (var i = 0; i < aTrs.length; i++) {
			if (i % 2 != 0) {                        
				aTrs[i].className = "alternate";
			} else {
				aTrs[i].className = "";
			}
			oFragment.appendChild(aTrs[i]);
		}

		for (var i = oTbody.childNodes.length - 1; i >= 0 ; i--) {
			oTbody.removeChild(oTbody.childNodes[i]);
		}
		oTbody.appendChild(oFragment);
	}
}
