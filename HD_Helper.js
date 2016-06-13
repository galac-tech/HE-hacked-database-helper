var IP_pages = [document.getElementById("list").innerHTML];
var footer = document.getElementsByClassName("pagination alternate")[0];
var liTags = footer.getElementsByTagName("li");
var numberOfPages = parseInt(liTags[liTags.length - 2].innerText);

function ifIn(obj, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function injectTab() {
    var navbar = document.getElementsByClassName("nav nav-tabs")[0];
    var li = document.createElement("li");
    li.className = "link";
    var a = document.createElement("a");
    a.id = "startAnimation";
    var span1 = document.createElement("span");
    span1.className = "icon-tab he16-clan_adm";
    var span2 = document.createElement("span");
    span2.className = "hide-phone";
    span2.innerText = "HDH Settings";
    a.appendChild(span1);
    a.appendChild(span2);
    li.appendChild(a);
    navbar.insertBefore(li, navbar.children[4]);
    document.getElementsByClassName("span12")[1].id = "animatedElm";
}

function injectSettingsDiv() {
    var div = document.createElement("div");
    div.id = "hidden-div";
    div.style.display = "none";
    div.style.padding = "20px";
    div.innerHTML = '<center><span class="btn btn-success mission-accept" id="loadAll" >Load all pages</span></center>';
    var widget = document.getElementsByClassName("widget-box")[0];
    widget.insertBefore(div, widget.children[1]);
}

function HTMLParser(string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    return div;
}

function loadAll() {
    var waitTime = 0;
    var bodyDiv = document.getElementById("hidden-div");
    bodyDiv.children[0].children[0].innerHTML = '<img src="https://media.giphy.com/media/xT8qBhpN14efJBZPnq/giphy.gif" alt="loading">';
    cycledPages = 1;
    while (numberOfPages != cycledPages) {
        cycledPages += 1;
        retrieveAll(cycledPages);
    }
    setTimeout(function() {
        for (var i in pagesDict) {
            document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + pagesDict[i];
        }
        bodyDiv.innerHTML = '<form class="form-horizontal">' +
            '<div class="browser-input">' +
            'Internet Speeds : <select id="internetSpeed" style="margin-right: 10px;">' +
            '<option class="form" value="all">View all</option>' +
            '<option class="form" value="1">1 Mbit/s</option>' +
            '<option class="form" value="2">2 Mbit/s</option>' +
            '<option class="form" value="4">4 Mbit/s</option>' +
            '<option class="form" value="6">6 Mbit/s</option>' +
            '<option class="form" value="10">10 Mbit/s</option>' +
            '<option class="form" value="25">25 Mbit/s</option>' +
            '<option class="form" value="50">50 Mbit/s</option>' +
            '<option class="form" value="100">100 Mbit/s</option>' +
            '<option class="form" value="250">250 Mbit/s</option>' +
            '<option class="form" value="500">500 Mbit/s</option>' +
            '<option class="form" value="1000">1 Gbit/s (1000 Mbit/s)</option>' +
            '</select>' +
            '<input type="button" class="btn btn-inverse" id="searchIPdat" value="Search">' +
            '</div>' +
            '</form>';
        document.getElementById("searchIPdat").addEventListener("click", searchIPdat);
        savedDat = document.getElementById("list").cloneNode(true);
    }, (numberOfPages * 0.08) * 1000);
}

pagesDict = {};

function retrieveAll(page) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlResponse = xmlhttp.responseText;
            HTML = HTMLParser(xmlResponse);
            var list = HTML.getElementsByTagName("ul")[3].innerHTML;
            pagesDict[page] = "\n" + '<center><a href="?page=' + page + '" ><h6>Page ' + page + '</h6></a></center>' + "\n" + list;
        }
    };

    url = "https://legacy.hackerexperience.com/list?page=" + page;
    xmlhttp.open("GET", url, true);
    xmlhttp.withCredentials = true;
    xmlhttp.send(null);

}

function retrieveNextPage(page) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlResponse = xmlhttp.responseText;
            HTML = HTMLParser(xmlResponse);
            var list = HTML.getElementsByTagName("ul")[3].innerHTML;
            document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + "\n" + "<hr><br><center><h1>Page " + page + "</h1><small>Brought to you by <a href='https://legacy.hackerexperience.com/profile?id=494249'>MacHacker</a><small></center><br><hr>" + "\n" + list;
        }
    };

    url = "https://legacy.hackerexperience.com/list?page=" + page;
    xmlhttp.open("GET", url, true);
    xmlhttp.withCredentials = true;
    xmlhttp.send(null);

}

numberOfPages = parseInt(liTags[liTags.length - 2].innerText);
for (var index in liTags) {
    if (liTags[index].className == "active") {
        cycledPages = parseInt(liTags[index].innerText);
        break;
    }
}

$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        if (document.getElementsByClassName("link active")[0].innerText == "IP List\n") {
            if (cycledPages != numberOfPages) {
                cycledPages += 1;
                retrieveNextPage(cycledPages);

            }
        }
    }
});

function searchIPdat() {
    speed = document.getElementById("internetSpeed").value;
    if (speed == "1000") {
        speed = "1 Gbit/s";
    } else if (speed == "all") {
        document.getElementById("list").innerHTML = savedDat.innerHTML;
        return;
    } else {
        speed = speed + " Mbit/s";
    }
    lis = savedDat.children;
    var group = [];
    for (var i in lis) {
        if (lis[i].tagName == "CENTER") {
            var page = "<center>" + lis[i].innerHTML + "</center>";
            var found = true;
        } else {
            try {
                foundSpeed = lis[i].children[2].children[0].children[0].innerText;
                if (foundSpeed == speed) {
                    if (ifIn('<li id="' + lis[i].id + '" >' + lis[i].innerHTML + "</li>", group) === false) {
                        if (found === true) {
                            group.push(page);
                            found = false;
                        }
                        group.push('<li id="' + lis[i].id + '" >' + lis[i].innerHTML + "</li>");
                    }
                }
            } catch (err) {
                continue;
            }
        }
    }
    document.getElementById("list").innerHTML = group.join("\n");
}

if (document.getElementsByClassName("link active")[0].innerText == "IP List\n") {
    injectTab();
    injectSettingsDiv();
}

function isEven(n) {
    return n % 2 === 0;
}

times = 0;
$(document).ready(function() {
    $("#startAnimation").click(function() {
        times += 1;
        setTimeout(function() {
            if (isEven(times) === false) {
                $("#animatedElm").animate({
                    marginTop: '+=50px'
                }, 500);
                $("#hidden-div").show(500);
                document.getElementById("hidden-div").style.display = "block";
            } else {
                $("#animatedElm").animate({
                    marginTop: '-=50px'
                }, 500);
                $("#hidden-div").hide(500);
                document.getElementById("hidden-div").style.display = "none";
            }
        }, 500);
    });
});

document.getElementById("loadAll").addEventListener("click", loadAll);
