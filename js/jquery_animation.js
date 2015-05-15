var max = true;
var sl = true;
var ll;

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
		}
	}
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
	$("#schedule_list").append('<li id = "sl_li"><span class="tab_left">'+nodeName+'</span>'+
			'<span class="tab_right">'+nodeTime+'</span></li>');
		document.getElementById("event_name").innerHTML = ($("#sl_li:first").text());
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
	add: function(v1,v2,v3, v4, v5)
	{
		var newNode = makeNode(v1,v2,v3, v4, v5);
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
					var returnValue = deleteNode.data;
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

var makeNode = function(e_name, e_time, e_date, e_location, e_priority)
{
	//alert("E TIME " + e_time);
	var instanceOfNode = {
		name: e_name,
		s_time: e_time,
		date: e_date,
		location: e_location,
		priority: e_priority,
		next: null
	};
	return instanceOfNode;
}