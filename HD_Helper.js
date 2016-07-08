var gritterLoaded = false
function gritterNotify(opts) {
    if (!gritterLoaded) {
        $('<link rel="stylesheet" type="text/css" href="css/jquery.gritter.css" >').appendTo("head");
        $.getScript("js/jquery.gritter.min.js", function() {
            $.gritter.add({
                title: opts.title,
                text: opts.text,
                image: opts.img,
                sticky: opts.sticky
            });
        });
        gritterLoaded = true;
        return;
    }
    $.gritter.add({
        title: opts.title,
        text: opts.text,
        image: opts.img,
        sticky: opts.sticky
    });
}

gritterNotify({
                    title: "HexEnhanced",
                    text: "HexEnhanced fomaly know as the <i>HDB plugin</i> has been <b>discontinued</b> and <b>disabled</b> as we are no longer verified. I will continue to work on the project and it may be released sometime in the future. Click <a href='https://forum.hackerexperience.com/viewtopic.php?f=18&t=8614'>here</a> for more info. More should be coming sortly. Stay tuned!",
                    image: "",
                    sticky: false
});
