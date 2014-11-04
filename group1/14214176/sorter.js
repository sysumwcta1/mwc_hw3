/****************公用函数**********************/
function hasClassName(dom, test_name) {
	var name = dom.className;
	var reg = new RegExp('(\\s|^)' + test_name + '(\\s|$)');
	return reg.test(name);
}

function addClassName(dom, test_name) {
	var name = dom.className;
	if (!hasClassName(dom, test_name)) {
		dom.className = name + ' ' + test_name;
	}
}

function removeClassName(dom, test_name) {
	var name = dom.className;
	if (hasClassName(dom, test_name)) {
		dom.className = name.replace(new RegExp('(\\s|^)' + test_name + '(\\s|$)'), '');
	}
}
//保存所有表的数据
function saveTableData(tables) {
	for (var i = 0; i < tables.length; i++) {
		tabels_data.push(getTableArr(tables[i]));
	}
}
//获得表的二维数据(0:innerText,1:innerHTML)
function getTableArr(table, type) {
	type = (type == undefined) ? 0 : type;
	var trs = table.getElementsByTagName('tbody')[0].rows;
	var trs_copy = [];
	var cells_copy = [];
	var cells;

	for (var i = 0; i < trs.length; i++) {
		cells = trs[i].cells;
		cells_copy = [];
		for (var j = 0; j < cells.length; j++) {
			if (type == 0) {
				cells_copy.push(cells[j].innerText);
			} else {
				cells_copy.push(cells[j].innerHTML);
			}
		}
		trs_copy.push(cells_copy);
	}
	return trs_copy
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(table_doms) {
	for (var i = 0; i < table_doms.length; i++) {
		addThEvent(table_doms[i]);
	}
}
//查找tabel的原始数据
function getTableInitData(table) {
	var tables = getAllTables();
	var index;
	for (var i = 0; i < tables.length; i++) {
		if (tables[i] == table) {
			index = i;
			break;
		}
	}

	return tabels_data[index];
}

/*****************sort部分****************/
//字符串排序
function strCompare(arr, index, direction) {
	var objs = [];
	for (var i = 0; i < arr.length; i++) {
		objs.push({
			str: arr[i]
		});
	}

	for (var i = 0; i < objs.length - 1; i++) {
		for (var j = i + 1; j < objs.length; j++) {
			//自减方向
			if (direction == DIRECTION[1]) {
				if (objs[i].str[index] > objs[j].str[index]) {
					var temp = objs[i];
					objs[i] = objs[j];
					objs[j] = temp;
				}
			}
			//自增方向
			else {
				if (objs[i].str[index] < objs[j].str[index]) {
					var temp = objs[i];
					objs[i] = objs[j];
					objs[j] = temp;
				}
			}
		}
	}

	return objs;
}
//按列排序
function sortTableByCol(table, index, direction) {
	index = (index == undefined) ? 0 : index;
	direction = (direction == undefined) ? DIRECTION[0] : direction;

	//二维数组
	var trs_copy = getTableArr(table, 1);
	var cells;
	var trs = table.getElementsByTagName('tbody')[0].rows;
	var sortObjs = strCompare(trs_copy, index, direction);

	for (var i = 0; i < trs.length; i++) {
		cells = trs[i].cells;
		for (var j = 0; j < cells.length; j++) {
			cells[j].innerHTML = sortObjs[i].str[j];
		}
	}

}

//根据给table->th->td添加事件
function addThEvent(table) {
	var ths = table.rows[0].cells;
	for (var i = 0; i < ths.length; i++) {

		//onclick事件：箭头图标的修改及排序
		ths[i].onclick = function(e) {
			var dom = e.target;
			if (hasClassName(dom, DIRECTION[0])) {

				removeClassName(dom, DIRECTION[0]);
				addClassName(dom, DIRECTION[1]);

				sortTableByCol(table, dom.cellIndex, DIRECTION[0]);
			} else {

				removeClassName(dom, DIRECTION[1]);
				addClassName(dom, DIRECTION[0]);

				sortTableByCol(table, dom.cellIndex, DIRECTION[1]);
			}
		}
		//onmouseleave事件：处理鼠标离开后箭头消失
		ths[i].onmouseleave = function(e) {
			var dom = e.target;
			if (hasClassName(dom, DIRECTION[0])) {
				removeClassName(dom, DIRECTION[0]);
			}
			if (hasClassName(dom, DIRECTION[1])) {
				removeClassName(dom, DIRECTION[1]);
			}
		}

	}
}
/****************filer部分**********************/
//重绘表格
function drawTable(e) {
	var table = e.target.nextSibling;
	var tabel_data = getTableInitData(table);
	//行匹配标记
	var row_math_flag = false;
	var tabel_html = '';
	var cells_html = '';

	for (var i = 0; i < tabel_data.length; i++) {
		cells_html = '';
		row_math_flag = false;
		for (var j = 0; j < tabel_data[i].length; j++) {

			cells_html += '<td>';

			if (tabel_data[i][j].indexOf(e.target.value) != -1) {
				row_math_flag = true;
				cells_html += tabel_data[i][j].replace(e.target.value, '<font class="strong">' + e.target.value + '</font>');

			} else {
				cells_html += tabel_data[i][j];
			}
			cells_html += '</td>';
		}
		//如果存在匹配的单元格，则添加这行
		if (row_math_flag) {
			tabel_html += '<tr>' + cells_html + '</tr>';
		}
	}
	table.getElementsByTagName('tbody')[0].innerHTML = tabel_html;

}
//添加input元素
function addInput(table) {
	var input = document.createElement('input');
	document.body.insertBefore(input, table);
	input.oninput = drawTable;
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		addInput(tables[i]);
	}
}

/**********************************************/
//方向数组
var DIRECTION = ['asc', 'desc'];
//所有table的数据
var tabels_data = [];
//元素class的操作
window.onload = function() {
	var tables = getAllTables();
	saveTableData(tables);
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
}