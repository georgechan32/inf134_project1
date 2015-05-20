var max = true;
var sl = true;
var ll;

function init()
{
	
	var time = document.getElementById('myDate');
	time.innerHTML = calculateTime();
	setInterval(function(){ time.innerHTML = calculateTime(); console.log('hello');}, 3000);
	backgroundImage();
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

function backgroundImage()
{
    var current = new Date();
    var time = current.getHours();
    
    if (time >= 0 && time < 8)
    {
        document.getElementById("background_img").src = "img/splash2.jpg";
        
    }
    else if (time >= 8 && time < 12)
    {
        document.getElementById("background_img").src = "img/splash3.jpg";
    }
    else if (time >= 12 && time < 18)
    {
        document.getElementById("background_img").src = "img/splash4.jpg";
    }
    else if (time >= 18 && time < 24)
    {
        document.getElementById("background_img").src = "img/splash1.jpg";
    }
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
//e_name, e_time, e_date, e_duration, e_location, e_priority
function realEvent()
{
    
    $('#schedule_list').append('<li id="add_schedule" class="list-group-item"><span><strong>' 
            + document.getElementById("start_time").value + '</strong> ' + 
            document.getElementById("event_tt").value + '</span><span class = "hit_right">DELETE</span></li>');
    ll.add(document.getElementById("event_tt").value, document.getElementById("start_time").value
    	, document.getElementById("event_date").value, document.getElementById("duration").value,
    	document.getElementById("event_location").value, document.getElementById("priority").value)
    compile_events();
    document.getElementById("event_name").innerHTML = ll.head.name;

}


$(document).ready(function()
{
	max = true;
	sl = true;
	ll = makeLinkedList();
	function hideSchedule()
	{
		$("#schedule_list").hide("fast");

	}
	if($.cookie("username") == null)
	{ 
   		var person = prompt("Please enter your name", "John Doe");
		if (person != null && person.length > 3) 
		{
			$.cookie("username", person, "Tu, 30 June 2015 12:00:00 UT");
			$.cookie("events", "");
		}
		else
		{
			alert("Your name must be over 3 characters")
			window.location.href = window.location.href;
		}
	}
	fill_user();
});

function fill_user()
{
	if($.cookie("events") == null)
	{
		//$.cookie("events", "");
		alert("Saving to cookies");

	}
	document.getElementById("user_name_goes_here").innerHTML = $.cookie("username");
	if($.cookie("events") != "")
	{
		//alert($.cookie("events"));
		var cookie_str = $.cookie("events");
		var events = cookie_str.split("?");
		for(var i = 0; i < events.length-1; i++)
		{
			var event_str = events[i].split("/");
			add_cookie_event(event_str[1],event_str[2]);
			ll.add(event_str[1],event_str[2],event_str[3],event_str[4],event_str[5]);
			//fill_tasks(event_str[1], event_str[2]);
		}
	}
}

function fill_tasks(time, name)
{
	
}

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
		$("#schedule").animate({ left: '26%'}, "fast");
		document.getElementById("add_menu").style.zIndex = 5;
		max = false;
	}
	else
	{
		$(" #container_body").animate({ width: '100%'}, "fast");
		$("#add_event").animate({ marginRight: '2%'}, "fast");
		$("#schedule").animate({ left: '50%'}, "fast");
		document.getElementById("add_menu").style.zIndex = -6;
		max = true;
	}
}

function append_event()
{
	/*if(document.getElementById("event_tt").value != "" && document.getElementById("start_time").value != "")
	{
		//alert(document.getElementById("start_time").value);
		ll.add(document.getElementById("event_tt").value, 
			document.getElementById("start_time").value, 
			document.getElementById("event_date").value, 
			document.getElementById("event_location").value, 
			document.getElementById("event_priority").value );
		$("#schedule_list").append('<li id = "sl_li"><div class="tab_left">'+document.getElementById("event_tt").value+'</div>'+
			'<div class="tab_right">'+document.getElementById("start_time").value+'</div></li>');
		document.getElementById("event_name").innerHTML = ($("#sl_li:first").text());
		compile_events();
	}*/
}

function add_cookie_event(nodeName, nodeTime)
{
	$('#schedule_list').append('<li id="'+nodeName+'" class="list-group-item"><span onclick = "add_eventer()"><strong>' 
            + nodeTime + '</strong> ' + nodeName + '</span><span class = "hit_right" onclick = "cleanEvent('+nodeName+')">Delete</span></li>');
	var fill_content = $(".list-group-item:first").text();
	document.getElementById("event_name").innerHTML = fill_content.substr(0, fill_content.length-6);
}

function cleanEvent(nodeName)
{
	//alert(nodeName.id);
	ll.remove_param(nodeName.id);
	compile_events();
	//alert($.cookie("events"));
	location.reload(); 
}
function compile_events()
{
	var string_cookie = "";
	var ll_pointer = ll.head;
	//1 is event name
	//2 is start time
	//3 is event date
	//4 is event location
	//5 is event priority

	while(ll_pointer != null)
	{
		string_cookie += "event/"+ll_pointer.name+"/"+ll_pointer.s_time+"/"+ll_pointer.date+"/"+ll_pointer.location+"/"+ll_pointer.priority+"?";
		ll_pointer = ll_pointer.next;
	}
	//alert(string_cookie);
	$.cookie("events",string_cookie);
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
	/*document.getElementById("event_priority").value = "";*/
	document.getElementById("start_time").value = "";
	document.getElementById("duration").value = "";
	document.getElementById("event_date").value = "";
	document.getElementById("event_location").value = "";
}

var makeLinkedList = function()
{
	var instanceOfLinkedList = Object.create(methodsOfLinkedList);
	instanceOfLinkedList.head = null;
	instanceOfLinkedList.tail = null;
	return instanceOfLinkedList;
}


var methodsOfLinkedList = 
{
	add: function(v1,v2,v3, v4, v5, v6)
	{
		var newNode = makeNode(v1,v2,v3, v4, v5, v6);
		if(!this.head)
			this.head = newNode;
		if(this.tail)
			this.tail.next = newNode;
		this.tail = newNode;
	},
	remove_head: function()
	{
		if(this.head === null)
			return;
		var currentNode = this.head;
		this.head = currentNode.next;
		currentNode = null;
	},
	remove_all: function()
	{
		while(this.head)
			this.remove_head();
	},
	remove: function(node)
	{
		if(node === null)
			return;
		if(node === this.head)
			this.remove_head();
		else
		{
			var currentNode = this.head;
			var deleteNode = this.head.next;
			while(currentNode)
			{
				if(deleteNode === null)
					return null
				else if(deleteNode === node)
				{
					var returnValue = deleteNode.name;
					if(deleteNode.next === null)
						currentNode.next = null;
					else
						currentNode.next = deleteNode.next;
					deleteNode = null;
					return returnValue;
				}
				currentNode = currentNode.next;
				node = currentNode;
				deleteNode = deleteNode.next;
			}
		}
	},
	remove_param: function(nName)
	{
		var node = this.head;
		while(node)
		{
			//alert(node.name + " " + nName);
			if(node.name == nName)
			{
			//	alert("FOUND");
				this.remove(node);
				return;
			}
			node = node.next;
		}
		//alert("ERROR< COULD NOT FIND?");
	},
	contains: function(value)
	{
		var currentNode = this.head;
		while(currentNode)
		{
			if(currentNode.data == value)
				return currentNode.data;
			currentNode = currentNode.next;
		}
		return null;
	},
	print: function()
	{
		var str = "";
		var currentNode = this.head;
		while(currentNode)
		{
			str += currentNode.data;
			if(currentNode = currentNode.next)
				str += " -> ";
		}
		console.log(str);
		return str;
	}
};

var makeNode = function(e_name, e_time, e_date, e_duration, e_location, e_priority)
{
	//alert("E TIME " + e_time);
	var instanceOfNode = {
		name: e_name,
		s_time: e_time,
		duration: e_duration,
		date: e_date,
		location: e_location,
		priority: e_priority,
		next: null
	};
	return instanceOfNode;
}