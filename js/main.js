var max = true;
var sl = true;
var ll;

function init() {

    var time = document.getElementById('myDate');
    time.innerHTML = calculateTime();
    setInterval(function() {
        time.innerHTML = calculateTime();
    }, 3000);
    backgroundImage();
}

function calculateTime() {
    var d = new Date();
    var ampm = "a.m.";
    var hour = d.getHours();
    var minute = d.getMinutes().toString();
    if (d.getHours() == 0) {
        hour = 12;
    }
    if (d.getHours() >= 12) {
        ampm = "p.m.";
    }
    if (d.getHours() > 12) {
        hour -= 12;
    }
    if (d.getMinutes() < 10) {
        minute = "0" + minute;
    }
    return hour.toString() + ":" + minute + " " + ampm;
}

function backgroundImage() {
    var current = new Date();
    var time = current.getHours();

    if (time >= 0 && time < 8) {
        document.getElementById("background_img").src = "img/splash3.jpg";

    } else if (time >= 8 && time < 12) {
        document.getElementById("background_img").src = "img/splash1.jpg";
    } else if (time >= 12 && time < 18) {
        document.getElementById("background_img").src = "img/splash3.jpg";
    } else if (time >= 18 && time < 24) {
        document.getElementById("background_img").src = "img/splash1.jpg";
    }
}

function toggle3() {
        var ele = document.getElementById("toggleText3");
        if (ele.style.display == "none") {
           ele.style.display = "inline";
        } else {
            ele.style.display = "none";
        }
    }
    //e_name, e_time, e_date, e_duration, e_location, e_priority
function realEvent() {
    var regex_time = /[0-9]+:[0-9]+\s[a|p].[m]./;
    if (regex_time.test(document.getElementById("start_time").value) === true && document.getElementById("event_tt").value !== null) 
    {
        for(var i = ll.head; i != null; i = i.next)
        {
            if(document.getElementById("start_time").value == i.s_time)
            {
                alert("Error: event overlaps with pre-exisiting event.");
                return;
            }
        }

        clear_eventList();
        var new_id = generateNodeId();
        ll.scheduleAdd(document.getElementById("event_tt").value, document.getElementById("start_time").value,
            document.getElementById("duration").value, null,
            document.getElementById("event_location").value, $("#slider-range-max").slider("option", "value"), new_id);
        //alert($.cookie("events")); 
        add_to_cookie()  
        compile_events();
        document.getElementById("event_name").innerHTML =  ll.head.s_time + " " + ll.head.name ;
    } else {
        alert("Start time not inputted correctly");
    }


}

function add_to_cookie() {
    var currNode = ll.head;
    while (currNode) {
        add_cookie_event(currNode.name, currNode.s_time, currNode.id);
        currNode = currNode.next;
    }
}


$(document).ready(function() {
    max = true;
    sl = true;
    ll = makeLinkedList();

    function hideSchedule() {
        //$("#schedule_list").hide("fast");

    }
    if ($.cookie("username") == null) {
        var person = prompt("Please enter your name", "John Doe");
        if (person != null && person.length > 3) {
            $.cookie("username", person, "Tu, 30 June 2015 12:00:00 UT");
            $.cookie("events", "");
        } else {
            alert("Your name must be over 3 characters")
            window.location.href = window.location.href;
        }
    }
    fill_user();
});

function fill_user() {
    if ($.cookie("events") == null) {
        $.cookie("events", "");

    }
    document.getElementById("user_name_goes_here").innerHTML = $.cookie("username");
    if ($.cookie("events") != "") {
        var cookie_str = $.cookie("events");
        var events = cookie_str.split("?");
        for (var i = 0; i < events.length - 1; i++) {
            var event_str = events[i].split("/");
            add_cookie_event(event_str[1], event_str[2], event_str[7]);
            ll.add(event_str[1], event_str[2], event_str[3], event_str[4], event_str[5], event_str[6], event_str[7]);
        }
    }
}


function hideSchedule() {
   $("#schedule_list").slideToggle("fast");
   var toggle = $("#schedule_toggle");
 
    if (max) 
    {       
            $("#schedule_list").effect("slide", { direction: "down" }, 800);
        //  $("#schedule_list").show(function(){
            toggle.removeClass("glyphicon-chevron-down");
            toggle.addClass("glyphicon-remove");
        //  });
        max = false;
    } 
    else 
    {
        $("#info").slideDown("slow");
        $("#schedule_list").slideDown("fast");
        toggle.removeClass("glyphicon-remove");
        toggle.addClass("glyphicon-chevron-down");

        max = true;
    }

}


function clear_eventList() {
    var listParent = document.getElementById("schedule_list");
    $('#schedule_list').empty();
}

function append_event() {
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

function add_cookie_event(nodeName, nodeTime, nodeId) {
	nodeIdString = "'" + nodeId + "'";
    $('#schedule_list').append('<li id="' + nodeName + '" class="list-group-item" onclick = "editEvent('+nodeIdString+')"><span ><strong>' + nodeTime + '</strong> ' + nodeName + '</span><span class = "hit_right"><button type="button" class="btn btn-link" style="margin-top:-5px;"onclick ="cleanEvent(' + nodeIdString + ')">Delete</button></span></li>');
    var fill_content = $(".list-group-item:first").text();
    document.getElementById("event_name").innerHTML = fill_content.substr(0, fill_content.length - 6);
}

function cleanEvent(nodeName) {
    //alert(nodeName.id);
    ll.remove_param(nodeName);
    compile_events();
    //alert($.cookie("events"));
    location.reload();
}

function compile_events() {
    var string_cookie = "";
    var ll_pointer = ll.head;
    //1 is event name
    //2 is start time
    //3 is event date
    //4 is event location
    //5 is event priority

    while (ll_pointer != null) {
        string_cookie += "event/" + ll_pointer.name + "/" + ll_pointer.s_time + "/" + ll_pointer.duration + "/" + ll_pointer.date + "/" + ll_pointer.location + "/" + ll_pointer.priority + "/" + ll_pointer.id + "?";
        ll_pointer = ll_pointer.next;
    }
    //alert(string_cookie);
    $.cookie("events", string_cookie);
    //alert(string_cookie);
}

function cancel_add_event() {
    add_eventer();
    form_clear();
    $("#schedule_list").effect("slide");
}

function form_clear() {
    document.getElementById("event_tt").value = "";
    /*document.getElementById("event_priority").value = "";*/
    document.getElementById("start_time").value = "";
    document.getElementById("duration").value = "";
    // document.getElementById("event_date").value = "";
    document.getElementById("event_location").value = "";
}

function e_form_clear() {
    document.getElementById("e_event_tt").value = "";
    /*document.getElementById("event_priority").value = "";*/
    document.getElementById("e_start_time").value = "";
    document.getElementById("e_duration").value = "";
    // document.getElementById("event_date").value = "";
    document.getElementById("e_event_location").value = "";
}

var edit_ptr;
function eventEditer()
{
    edit_ptr.name = document.getElementById("e_event_tt").value;
    edit_ptr.s_time = document.getElementById("e_start_time").value;
    edit_ptr.duration = document.getElementById("e_duration").value;
    edit_ptr.location = document.getElementById("e_event_location").value;
    compile_events();
    location.reload();
}

function editEvent(id)
{
    e_form_clear();
    edit_ptr = ll.head;
    //iterate through the linked list to find the correct event
    while(edit_ptr)
    {
        if(edit_ptr.id == id)
        {
            break;
        }
        edit_ptr = edit_ptr.next;
    }
    //$("#slider-range-max").slider( "option", "value") = ll_pointer.priority;
    document.getElementById("e_event_tt").value = edit_ptr.name;
    document.getElementById("e_start_time").value = edit_ptr.s_time;
    document.getElementById("e_duration").value = edit_ptr.duration;
    document.getElementById("e_event_location").value = edit_ptr.location;
    $('#edit-modal').modal('show');
    //console.log("edit_event called");
}

var makeLinkedList = function() {
    var instanceOfLinkedList = Object.create(methodsOfLinkedList);
    instanceOfLinkedList.head = null;
    instanceOfLinkedList.tail = null;
    return instanceOfLinkedList;
}


var methodsOfLinkedList = {
    add: function(v1, v2, v3, v4, v5, v6, v7) {
        var newNode = makeNode(v1, v2, v3, v4, v5, v6, v7);
        if (!this.head)
            this.head = newNode;
        if (this.tail)
            this.tail.next = newNode;
        this.tail = newNode;
    },
    scheduleAdd: function(v1, v2, v3, v4, v5, v6, v7) {
        //gonna disregard the tail node
        var newNode = makeNode(v1, v2, v3, v4, v5, v6, v7);
        if (this.head == null) {
            this.head = newNode;
            //this.tail = newNode;
            return;
        }
        if (this.head.priority < newNode.priority) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            for (var iter = this.head; iter != null; iter = iter.next) {
                if (iter.next == null) {
                    iter.next = newNode;
                    break;
                } else if (iter.priority > newNode.priority && iter.next.priority < newNode.priority) {
                    newNode.next = iter.next;
                    iter.next = newNode;
                    location.reload();
                    break;
                }

            }
        }
    },
    remove_head: function() {
        if (this.head === null)
            return;
        var currentNode = this.head;
        this.head = currentNode.next;
        currentNode = null;
    },
    remove_all: function() {
        while (this.head)
            this.remove_head();
    },
    remove: function(node) {
        if (node === null)
            return;
        if (node === this.head)
            this.remove_head();
        else {
            var currentNode = this.head;
            var deleteNode = this.head.next;
            while (currentNode) {
                if (deleteNode === null)
                    return null
                else if (deleteNode === node) {
                    var returnValue = deleteNode.name;
                    if (deleteNode.next === null)
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
    remove_param: function(nodeId) {
        var node = this.head;
        while (node) {
            if (node.id == nodeId) {
                this.remove(node);
                return;
            }
            node = node.next;
        }
    },
    contains: function(value) {
        var currentNode = this.head;
        while (currentNode) {
            if (currentNode.data == value)
                return currentNode.data;
            currentNode = currentNode.next;
        }
        return null;
    },
    print: function() {
        var str = "";
        var currentNode = this.head;
        while (currentNode) {
            str += currentNode.name + " " + currentNode.priority + " " + currentNode.id;
            if (currentNode = currentNode.next)
                str += "\n";
        }
        console.log(str);
        return str;
    }
};

var makeNode = function(e_name, e_time, e_duration, e_date, e_location, e_priority, e_id) {
    var instanceOfNode = {
        name: e_name,
        s_time: e_time,
        duration: e_duration,
        date: e_date,
        location: e_location,
        priority: e_priority,
        id: e_id,
        next: null
    };
    return instanceOfNode;
}

function generateNodeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function printLinkedList() {
    ll.print()
}

function clear_predefined() {
    ll.remove_all();
    compile_events();
    location.reload();
}
function add_predefined()
{
    var nodes = [];

    nodes.push(ll.scheduleAdd("INF134", "12:30 p.m.", "1.5", null, "UCI", 11, generateNodeId()));
    nodes.push(ll.scheduleAdd("CS131", "2:00 p.m.", "1", null, "UCI", 11, generateNodeId()));
    nodes.push(ll.scheduleAdd("Eat", "4:00 p.m.", "30", null, "UCI", 11, generateNodeId()));
    nodes.push(ll.scheduleAdd("Work", "5:00 p.m.", "5", null, "Irvine", 11, generateNodeId()));

    add_to_cookie();
    compile_events();
    location.reload();

}
