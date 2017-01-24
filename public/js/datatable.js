$(document).ready(function() {
    var table = $('#example').DataTable( {
        "scrollY": "50vh",
	"scrollCollapse": true,
        "paging": false,
	"ordering": true,
	"info": false
    } );
 
    $('a.toggle-vis').on( 'click', function (e) {
        e.preventDefault();
 
        // Get the column API object
        var column = table.column( $(this).attr('data-column') );
 
        // Toggle the visibility
        column.visible( ! column.visible() );
    } );
} );
