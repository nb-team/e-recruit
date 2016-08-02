(function () {
    //jQuery.noConflict();

    var totalPage = 7
    var now = { row: 1, col: 1 }, last = { row: 0, col: 0 };
    const towards = { up: 1, right: 2, down: 3, left: 4 };
    var isAnimating = false;

    s = window.innerHeight / 500;
    ss = 250 * (1 - s);

    $('.wrap').css('-webkit-transform', 'scale(' + s + ',' + s + ') translate(0px,-' + ss + 'px)');

    var size = document.body.clientWidth / 320 * 20;
    $('.head').css('font-size', size * 1.3 + 'px')
    $('.subhead').css('font-size', size * 0.7 + 'px')
    $('li').css('font-size', size + 'px')
    $('.title').css('font-size', size * 0.7 + 'px')
    $('.line').css('font-size', size * 0.5 + 'px')
    $('.ps').css('font-size', size * 0.5 + 'px')

    var play = true;
    var media = document.getElementById("media");
    $("#audio_btn").click(function (sender) {
        if (play) {
            $("#audio_btn").removeClass("play_yingfu").addClass("off");
            $("#yinfu").removeClass("rotate");
            media.pause();
        }
        else {
            $("#audio_btn").removeClass("off").addClass("play_yingfu");
            $("#yinfu").addClass("rotate");
            media.play();
        }
        play = !play;
    })

    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    $(document).swipeUp(function () {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row != totalPage) {
            now.row = last.row + 1; now.col = 1; pageMove(towards.up);
        }
    })

    $(document).swipeDown(function () {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row != 1) { now.row = last.row - 1; now.col = 1; pageMove(towards.down); }
    })

    var width = document.body.scrollWidth;
    var height = document.body.scrollHeight;
    
    var ratio = height/width;
   
    if(ratio <= 1.5)
    {
        $("#resumeBtn").css("top","63%");
    }    
    if(ratio < 1.6)
    {
        $("#resumeBtn").css("top","62%");
    }
    else if(ratio > 1.7)
    {
        $("#resumeBtn").css("top","59%");
    }
    
    //$("#resumeBtn").css("top",59 +   "%");
    
    //$(document).swipeLeft(function () {
    //    if (isAnimating) return;
    //    last.row = now.row;
    //    last.col = now.col;
    //    if (last.row > 1 && last.row < 5 && last.col == 1) { now.row = last.row; now.col = 2; pageMove(towards.left); }
    //})

    //$(document).swipeRight(function () {
    //    if (isAnimating) return;
    //    last.row = now.row;
    //    last.col = now.col;
    //    if (last.row > 1 && last.row < 5 && last.col == 2) { now.row = last.row; now.col = 1; pageMove(towards.right); }
    //})

    function pageMove(tw) {
        var lastPage = ".page-" + last.row + "-" + last.col,
            nowPage = ".page-" + now.row + "-" + now.col;

        switch (tw) {
            case towards.up:
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                break;
            case towards.right:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case towards.down:
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case towards.left:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
        }
        isAnimating = true;
        $(nowPage).removeClass("hide");

        $(lastPage).addClass(outClass);
        $(nowPage).addClass(inClass);

        setTimeout(function () {
            $(lastPage).removeClass('page-current');
            $(lastPage).removeClass(outClass);
            $(lastPage).addClass("hide");
            $(lastPage).find("img").addClass("hide");
            $(lastPage).find("div").addClass("hide");

            $(nowPage).addClass('page-current');
            $(nowPage).removeClass(inClass);
            $(nowPage).find("img").removeClass("hide");
            $(nowPage).find("div").removeClass("hide");

            isAnimating = false;
        }, 600);
    }
})();
