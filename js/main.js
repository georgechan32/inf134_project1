var events = [["Class at DBH", "3:00pm"]]

function init()
{
	
	var time = document.getElementById('myDate');
	time.innerHTML = calculateTime();
	setInterval(function(){ time.innerHTML = calculateTime(); console.log('hello');}, 3000);
	
}

function calculateTime()
{
	var d = new Date();
	var ampm = "a.m.";
	var hour = d.getHours();
	var minute = d.getMinutes().toString();
	if(d.getHours() == 0)
	{
		hour = 12;
	}
	if(d.getHours() >= 12)
	{
		ampm = "p.m.";
	}
	if(d.getHours() > 12)
	{
		hour -= 12;
	}
	if(d.getMinutes() < 10)
	{
		minute = "0"+minute;
	}
	return hour.toString() + ":"+minute + " " + ampm;
}
function toggle3() 
{
        var ele = document.getElementById("toggleText3");
        if(ele.style.display == "none") 
        {
                ele.style.display = "inline";
        }
        else 
        {
        ele.style.display = "none";
        }
}

function realEvent()
{
    
    $('#schedule_list').append('<li id="add_schedule" class="list-group-item"><strong>' 
            + document.getElementById("start_time").value + '</strong> ' + 
            document.getElementById("event_tt").value + '</li>');
}

