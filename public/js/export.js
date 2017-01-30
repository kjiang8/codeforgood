$(document).ready(function() {
  $("#btnExport").click(function(e) {
    e.preventDefault();

    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('table_wrapper_for_export');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    console.log(table_html);
    a.href = data_type + ', ' + table_html;
    a.download = 'exported_volunteer_table' + '.xls';
    a.click();
  });
});
