var max = true;
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
	$("#schedule_list").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');
}