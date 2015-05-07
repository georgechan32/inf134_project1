var max = true;
var sl = true;
$(document).ready(function()
{
	function hideSchedule()
	{
		$("#schedule_list").hide("fast");
	}
});

function hideSchedule()
{
$("#schedule_list").slideToggle("fast");

/*
	if($("#schedule_list").css('display') == "none")
	{	
		$("#schedule_list").show("fast");
	}
	else
	{
		$("#schedule_list").hide("fast");
	}*/
}

function add_eventer()
{
	if(max)
	{
		$("#container_body").animate({ width: '50%'}, "fast");
		$("#add_event").animate({ marginRight: '52%'}, "fast");
		document.getElementById("add_menu").style.zIndex = 5;
		max = false;
	}
	else
	{
		$(" #container_body").animate({ width: '100%'}, "fast");
		$("#add_event").animate({ marginRight: '2%'}, "fast");
		document.getElementById("add_menu").style.zIndex = -6;
		max = true;
	}
}

function append_event()
{
	if(document.getElementById("event_tt").value != "" && document.getElementById("start_time").value != "")
	{
		var event_detail = document.getElementById("event_tt").value + " " + document.getElementById("start_time").value; 
		$("#schedule_list").append('<li id = "sl_li"><span class="tab">'+event_detail+'</span></li>');
		document.getElementById("event_name").innerHTML = ($("#sl_li:first").text());
	}

}

function cancel_add_event()
{
	add_eventer();
	form_clear();
	$("#schedule_list").slideUp("fast");
}

function form_clear()
{
	document.getElementById("event_tt").value = "";
	document.getElementById("event_priority").value = "";
	document.getElementById("start_time").value = "";
	document.getElementById("duration").value = "";
	document.getElementById("event_date").value = "";
	document.getElementById("event_location").value = "";
}