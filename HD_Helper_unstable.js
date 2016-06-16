var IP_pages = [document.getElementById("list").innerHTML];
var footer = document.getElementsByClassName("pagination alternate")[0];
var liTags = footer.getElementsByTagName("li");
var numberOfPages = parseInt(liTags[liTags.length - 2].innerText);
var currentWebsiteURL = window.location.protocol + "//" + window.location.hostname;

/*Functions*/

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

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
            'Sort by : <select id="sortType" style="margin-right: 10px;">' +
            '<option class="form" value="all">View all</option>' +
            '<option class="form" value="internetSpeeds">Internet Speeds</option>' +
            '<option class="form" disabled>More coming soon!</option>' +
            '</select>' +
            '</div>' +
            '</form>';
        savedDat = document.getElementById("list").cloneNode(true);
        $('#sortType').change(function() {
            var value = $(this).val();
            if (value == "internetSpeeds"){
                var div = document.getElementById("hidden-div");
                var form = document.createElement("FORM");
                form.className = "form-horizontal";
                form.innerHTML = '<div id="internetSpeed-div"class="browser-input">' +
                    'Internet Speeds : <select id="internetSpeed" style="margin-right: 10px;">' +
                    '<option class="form" value="selectOne">Select one</option>' +
                    '<option class="form" value="1">1 Mbit/s</option>' +
                    '<option class="form" value="2">2 Mbit/s</option>' +
                    '<option class="form" value="4">4 Mbit/s</option>' +
                    '<option class="form" value="10">10 Mbit/s</option>' +
                    '<option class="form" value="25">25 Mbit/s</option>' +
                    '<option class="form" value="50">50 Mbit/s</option>' +
                    '<option class="form" value="100">100 Mbit/s</option>' +
                    '<option class="form" value="250">250 Mbit/s</option>' +
                    '<option class="form" value="500">500 Mbit/s</option>' +
                    '<option class="form" value="1000">1 Gbit/s (1000 Mbit/s)</option>' +
                    '<option class="form" value="other">Other</option>' +
                    '</select>' +
                    '</div>';
        div.appendChild(form);
        $('#internetSpeed').change(function() {
            searchIPdat()
        });
        
    }else if (value == "all"){
        document.getElementById("internetSpeed-div").remove();
        document.getElementById("list").innerHTML = savedDat.innerHTML;    
    }
});
        checkFavorites();
        $.getScript(currentWebsiteURL + "/js/main.js.pagespeed.jm.oC0Po-3w4s.js", function() {});
    }, (numberOfPages * 0.08) * 1000);
}

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

    url = currentWebsiteURL + "/list?page=" + page;
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
            document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + "\n" + "<hr><br><center><h1>Page " + page + "</h1><small>Brought to you by <a href='" + currentWebsiteURL + "/profile?id=494249'>MacHacker</a></small></center><br><hr>" + "\n" + list;
            checkFavorites();
            $.getScript(currentWebsiteURL + "/js/main.js.pagespeed.jm.oC0Po-3w4s.js", function() {});
        }
    };

    url = currentWebsiteURL + "/list?page=" + page;
    xmlhttp.open("GET", url, true);
    xmlhttp.withCredentials = true;
    xmlhttp.send(null);

}

function searchIPdat() {
    var speed = document.getElementById("internetSpeed").value;
    if (speed == "selectOne"){
        return
    } else if (speed == "1000") {
        speed = "1 Gbit/s";
    } else if (speed == "other") {
        var normalSpeeds = ["1 Mbit/s", "2 Mbit/s", "4 Mbit/s", "10 Mbit/s", "25 Mbit/s", "50 Mbit/s", "100 Mbit/", "250 Mbit/s", "500 Mbit/s", "1 Gbit/s"]
        lis = savedDat.children;
        var group = [];
        for (var i in lis) {
                try {
                    foundSpeed = lis[i].children[2].children[0].children[0].innerText;
                    if (ifIn(foundSpeed, normalSpeeds) === false) {
                        if (ifIn('<li id="' + lis[i].id + '" >' + lis[i].innerHTML + "</li>", group) === false) {
                            group.push('<li id="' + lis[i].id + '" >' + lis[i].innerHTML + "</li>");
                        }
                    }
                } catch (err) {
                    continue;
                }
        }
        document.getElementById("list").innerHTML = group.join("\n");
        checkFavorites();
        $.getScript(currentWebsiteURL + "/js/main.js.pagespeed.jm.oC0Po-3w4s.js", function() {});
        return
    } else {
        speed = speed + " Mbit/s";
    }
    lis = savedDat.children;
    var group = [];
    for (var i in lis) {
            try {
                var foundSpeed = lis[i].children[2].children[0].children[0].innerText;
                
                if (foundSpeed == speed) {
                    
                    if (ifIn('<li id="' + lis[i].id + '" >' + lis[i].innerHTML + "</li>", group) === false) {
                        
                        group.push('<li id="' + lis[i].id + '" >' + lis[i].innerHTML + "</li>");
                    }
                }
            } catch (err) {
                continue;
            }
    }
    document.getElementById("list").innerHTML = group.join("\n");
    checkFavorites();
    $.getScript(currentWebsiteURL + "/js/main.js.pagespeed.jm.oC0Po-3w4s.js", function() {});
}

function isEven(n) {
    return n % 2 === 0;
}

var injectStyle = function(css) {
    var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    if (!head) return;
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
};

function toggleFavorite(ip, elem) {
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites[ip]) {
        delete favorites[ip];
        elem.removeClass("fa-star");
        elem.addClass("fa-star-o");
    } else {
        favorites[ip] = true;
        elem.removeClass("fa-star-o");
        elem.addClass("fa-star");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function checkFavorites() {
    $("ul.list.ip li").each(function() {
        var entry = $(this);
        var ip = entry.find(".list-ip #ip").text();
        console.log($("#stared", this).length);
        if ($("#stared", this).length !== 0) {
            $("#stared", this).remove();
        } else {
            var pass = $(this).find(".list-user span.small").get(1).firstChild.data;
            var url = $(this).find(".list-ip a").attr("href") + "&action=login&user=root&pass=" + pass;
            $(this).find(".list-user").prepend('<a href="' + url + '" style="float:left;margin: 2px 5px 0px 5px;"><span class="he16-login icon-tab" title="Login" style="margin:0px;"></span><span class="small">login</span></a>');
        }
        favorites = JSON.parse(localStorage.getItem("favorites"));
        if (favorites[ip]) {
            entry.find(".list-actions").append('<i class="favorite fa-2x fa fa-inverse fa-star" id="stared"></i>');
        } else {
            entry.find(".list-actions").append('<i class="favorite fa-2x fa fa-inverse fa-star-o" id="stared"></i>');
        }
        entry.find("i.favorite").click(function() {
            toggleFavorite(ip, $(this));
        });
    });
}

/*Main controller*/

$(document).ready(function() {
    times = 0;
    pagesDict = {};

    numberOfPages = parseInt(liTags[liTags.length - 2].innerText);
    for (var index in liTags) {
        if (liTags[index].className == "active") {
            cycledPages = parseInt(liTags[index].innerText);
            break;
        }
    }

    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            if (document.getElementsByClassName("link active")[0].innerText.match("IP List|Lista de IPs")) {
                if (cycledPages != numberOfPages) {
                    cycledPages += 1;
                    retrieveNextPage(cycledPages);

                }
            }
        }
    })

    if (window.location.href.indexOf(currentWebsiteURL + "/list") != -1) {
        injectStyle('.fa-star {content: "\f005";}');
        injectStyle('.fa-star-o {content: "\f006";}');
        injectStyle('i.favorite {color: #DAA520;}');
        var favText = localStorage.getItem("favorites"),
            favorites = {};
        if (!favText) {
            localStorage.setItem("favorites", "{}");
        }

        checkFavorites();
    }

    if (document.getElementsByClassName("link active")[0].innerText.match("IP List|Lista de IPs") || document.getElementsByClassName("link active")[0].innerText.match("IP List|Lista de IPs")) {
        injectTab();
        injectSettingsDiv();
        document.getElementById("loadAll").addEventListener("click", loadAll);
        console.log("Injected bitch");
    }

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