//-------- script in create/Update page --------//

// Year Generate //
window.onload = function () {
    //Reference the DropDownList.
    var ddlYears = document.getElementById("ddlYears");

    //Determine the Current Year.
    var currentYear = (new Date()).getFullYear();

    //count down year
    var j = 0;
    
    //Loop and add the Year values to DropDownList.
    for (var i = currentYear-1;  j < 10; i--) {
        
        var option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        ddlYears.append(option);
        j++;   
    }
};
// Year Generate //


// add/del member function //
function addmember() {
    var new_member = document.getElementById('total_member').value;
    var new_field = document.createElement('div');
    var check_2 = document.getElementById('check_2').value;
    var check_3 = document.getElementById('check_3').value;

    new_member++;

    if (new_member <= 3)
    {
        if(check_2 == 0){
            new_field.innerHTML = '<ul class="list-inline m-0" id="Member_line_2"><li class="list-inline-item"><input class="input--style-6" type="text" id="member_2" name="member" size="40"  required aria-required="true"></li><li class="list-inline-item"><button type="button" class="btn btn--radius-2 btn-outline-danger" onclick="delmember(2)"> - </button></li></ul>';
        
            document.getElementById("member_fields").append(new_field);
        
            document.getElementById('total_member').value ++ ;
            document.getElementById('check_2').value = 1;
        }
	
        else if (check_3 == 0){
            new_field.innerHTML = '<ul class="list-inline m-0" id="Member_line_3"><li class="list-inline-item"><input class="input--style-6" type="text" id="member_3" name="member" size="40"  required aria-required="true"></li><li class="list-inline-item"><button type="button" class="btn btn--radius-2 btn-outline-danger" onclick="delmember(3)"> - </button></li></ul>';
        
            document.getElementById("member_fields").append(new_field);
        
            document.getElementById('total_member').value ++ ;
            document.getElementById('check_3').value = 1;

	}
    }
    else
    {
        alert("Maximum member is 3!");
    }
    
}

function delmember(i) {
    var last_member = document.getElementById('total_member').value;
    var del_element = document.getElementById('Member_line_'+i);

    if (last_member > 1) {
        
        del_element.remove();
        document.getElementById('total_member').value = last_member - 1;
        document.getElementById('check_'+i).value = 0;
    }
    
}
// add/del member function //

// send from input (Create Page) //
$("#Add_Doc").submit(function(event){
    alert("Data Inserted Successfully!");
})

// send from input (Update page) //
$("#Update_Doc").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
    var tags = data.All_tags.split(",");
    var member_num = document.getElementById('total_member').value;
    var member = document.getElementById('member_1').value;
    for (var i = 2;i <= member_num;i++){
        
        member = member.concat(",",document.getElementById('member_'+i).value);
        
    }
    
    member = member.split(",");
    var request = {
        "url" : `http://10.35.29.120/api/${data.id}`,
        "method" : "PUT",
        "data" : {
            project_no : data.group_number,
            project_title : data.title,
            Member: member,
            Advisor : data.advisor,
            Co_Advisor : data.co_advisor,
            Year : data.year,
            Tags : tags,
            Views : 0
        }
    }
    
    $.ajax(request).done(function(response){
        
        alert("Data Updated Successfully!");
    })
})

// Add/Delete tag field //
let input, hashtagArray, container, t;

input = document.querySelector('#Tag');
container = document.querySelector('.tag-container');
if(document.getElementById('All_tags').value != ""){
    hashtagArray = document.getElementById('All_tags').value.split(",");
    
}
else {
    hashtagArray = [];
}

input.addEventListener('keyup', () => {
    if ((event.which == 13 && input.value.length > 0)) {
        var text = document.createTextNode(input.value);
        var p = document.createElement('p');
        container.appendChild(p);
        p.appendChild(text);
        p.classList.add('tag');
        hashtagArray = hashtagArray.concat(input.value);
        input.value = '';

        let deleteTags = document.querySelectorAll('.tag');
        
        for(let i = 0; i < deleteTags.length; i++) {
            deleteTags[i].addEventListener('click', () => {
                
                container.removeChild(deleteTags[i]);
                function arrayRemove(arr, value) { 
    
                    return arr.filter(function(ele){ 
                        return ele != value; 
                    });
                }
                
                hashtagArray = arrayRemove(hashtagArray, hashtagArray[i]);
                document.getElementById('All_tags').value = hashtagArray;
                
                i--;
            });
            
        }
    }
    document.getElementById('All_tags').value = hashtagArray;
});

if(hashtagArray) {
    let deleteTags = document.querySelectorAll('.tag');
        
        for(let i = 0; i < deleteTags.length; i++) {
            deleteTags[i].addEventListener('click', () => {
                
                container.removeChild(deleteTags[i]);
                function arrayRemove(arr, value) { 
    
                    return arr.filter(function(ele){ 
                        return ele != value; 
                    });
                }
                
                hashtagArray = arrayRemove(hashtagArray, hashtagArray[i]);
                document.getElementById('All_tags').value = hashtagArray;
                
                i--;
            });
            
        }
}
// End Add/Delete tag field //


document.onkeydown = chkEvent
function chkEvent(e) {
    var keycode;

    if (window.event) keycode = window.event.keyCode; //*** for IE ***//

    else if (e) keycode = e.which; //*** for Firefox ***//

    if(keycode==13){
        return false;
    }
}


//-------- script in create/Update page --------//