// Delete Database //
if(window.location.pathname == "/management"){
    $ondelete = $(".table-responsive .table tbody tr td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://10.35.29.120/api/${id}`,
            "method" : "DELETE"
        }
	
        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            });

        }

    })
}
// Delete Database //

// Get Filter //
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "../api/all",
        dataType: 'json',
        success: function(data) {
            var time = document.getElementById("filter");
            var option = document.createElement("ul");
            var all = "All";
            var year_check = [];
            option.innerHTML += '<li class="list-inline-item"><button class="btn2 btn--radius-2 btn--blue-2" onclick="filter()">All</button></li>';
            time.append(option);
            for (var i in data) {
                if( !year_check.includes(data[i].Year)){
                    year_check = year_check.concat(data[i].Year);
                }
                
            }
            year_check.sort();
            year_check.reverse();
            for (var i in year_check) {
                
                option.innerHTML += '<li class="list-inline-item"><button class="btn2 btn--radius-2 btn--blue-2" onclick="filter('+year_check[i]+')">'+year_check[i]+'</button></li>';
                time.append(option);
            }
        }
    });
  });

  function filter(year)
  {
    if(year == null){
        year = "All";
    }
    window.location.href = '../management?year='+ year ;
  }
// Get Filter //