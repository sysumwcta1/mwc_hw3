function getAllTables() {
  var table = document.getElementsByTagName("table");
  return table;
}
function makeAllTablesSortable(_table) {
  var inputs = document.getElementsByTagName("input");
  var buttons = document.getElementsByTagName("button");

  for (var i = _table.length - 1; i >= 0; i--) {
    makeTable(_table[i],inputs[i],buttons[i]);
  }
}
function makeTable(_table_,_input_,_button_) {
    var ths = _table_.getElementsByTagName("th");
    var tb = _table_.getElementsByTagName("tbody");
    var trs = tb[0].getElementsByTagName("tr");

    _button_.onclick = function() {
      var com = _input_.value;
      var flag = 0;

      for (var i = 0; i < trs.length ; i++) {
        var tds = trs[i].getElementsByTagName("td");

        for (var j = 0; j < tds.length; j++) {
          var tdstr = tds[j].innerHTML;
          var newstr;

          for (var k = 0; k < tdstr.length; k++) {
            if (tdstr.charAt(k) == com ) {
              flag++;
              newstr = tdstr.substring(0,k)+com.bold()+tdstr.substring(k+1,tdstr.length);
              tds[j].innerHTML = newstr;
            }
          }
        }

       if (flag == 0)
          trs[i].style.display = "none";
        else
          flag = 0;
      }
    }
}
window.onload = function(){
  var tables = getAllTables();
  makeAllTablesSortable(tables);
}