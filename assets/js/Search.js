//-------- script in header --------//

// get Year that follow the database got //
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "../api/all",
        dataType: 'json',
        success: function(data) {
            var time = document.getElementById("time");
            var year_check = [];
            for (var i in data) {
                if( !year_check.includes(data[i].Year)){
                    year_check = year_check.concat(data[i].Year);
                }
                
            }
            year_check.sort();
            year_check.reverse();
            for (var i in year_check) {
                var option = document.createElement("OPTION");
                option.innerHTML += '<option value="'+year_check[i]+'">'+year_check[i]+'</option>';
                time.append(option);
            }
        }
    });
  });

// Send Search keyword //
function send()
{
    var search = document.getElementById("keyword").value;
    var search2 = document.getElementById("time").value;

    if (search == ""){
       
        search = "All";
        
    }
    
    window.location.href = './result?keyword='+ search + '&time='+ search2 ;
}


//-------- script header --------//