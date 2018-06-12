// $(document).ready(function(){
    var nowTime = new Date().getTime();
    
    var preTime1 = (new Date("2018/06/12 14:00:00")).getTime();
    var preTime2 = (new Date("2018/05/17 16:00:00")).getTime();
    var preTime3 = (new Date("2018/05/17 20:00:00")).getTime();

    var overTime1 = (new Date("2018/06/12 20:00:00")).getTime();
    var overTime2 = (new Date("2018/05/17 16:02:00")).getTime();
    var overTime3 = (new Date("2018/05/17 20:02:00")).getTime();

    var timeShow = 10;
    var activeTime = 120000; // 2分钟
    var timeMask;

    var isIos = false; // 平台检验
    navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? isIos = true : isIos = false;

    // getUserInfo();

    function getUserInfo() {
        if(isIos == true) {
            var message = {
                'action': 'getUserInfo'
            };
            window.webkit.messageHandlers.App.postMessage(message);
        } else {
            app.getUserInfo();
        }
    }

    function receiveUserInfo(id, token) {
        userInfo.userId = id;
        userInfo.token = token;

        // $('.mask').show();
        // $('#clockTime').html(timeShow);
        // timeMask = setInterval(function() {
        //     timeShow--;
        //     $('#clockTime').html(timeShow);
        //     if (timeShow <= 0) {
        //         clearInterval(timeMask);
        //         $('.mask').hide();
        //         // 开启活动游戏&两分钟
        //         $('.bg').show();
        //         bgshow();
        //         pks.start(activeTime,300); // 开始游戏
        //     }
        // }, 1000);
        // timeCheck();
        getServeiceDate();
    }

    function getServeiceDate() {
        $.ajax({
            url: '/activityIf/activity/lotteryDraw/systemTimeStemp.htm',
            type: 'POST',
            dataType: 'json',
            data: {},
            success: function(data) {
                if (data.result == 0) {
                    nowTime = data.data;
                    timeCheck();
                }
            }
        })
    }

    timeCheck()
    function timeCheck() {
        // 预定时间10秒前或者2分钟内 均开启
        if ((preTime1 - nowTime)/1000 <= 10 && preTime1 > nowTime) { // 倒计时,活动开启
            $('.mask').show();
            timeShow = Math.floor((preTime1 - nowTime)/1000);
            $('#clockTime').html(timeShow);
            // 活动开启倒计时
            timeMask = setInterval(function() {
                timeShow--;
                $('#clockTime').html(timeShow);
                console.log(timeShow);
                if (timeShow <= 0) {
                    clearInterval(timeMask);
                    $('.mask').hide();
                    // 开启活动游戏&两分钟
                    $('.bg').show();
                    bgshow();
                    pks.start(activeTime,300); // 开始游戏
                }
            }, 1000);
        }else if ((preTime2 - nowTime)/1000 <= 10 && preTime2 > nowTime) {
            $('.mask').show();
            timeShow = Math.floor((preTime2 - nowTime)/1000);
            $('#clockTime').html(timeShow);
            // 活动开启倒计时
            timeMask = setInterval(function() {
                timeShow--;
                $('#clockTime').html(timeShow);
                console.log(timeShow);
                if (timeShow <= 0) {
                    clearInterval(timeMask);
                    $('.mask').hide();
                    // 开启活动游戏&两分钟
                    $('.bg').show();
                    bgshow();
                    pks.start(activeTime,300); // 开始游戏
                }
            }, 1000);

        }else if ((preTime3 - nowTime)/1000 <= 10 && preTime3 > nowTime) {
            $('.mask').show();
            timeShow = Math.floor((preTime3 - nowTime)/1000);
            $('#clockTime').html(timeShow);
            // 活动开启倒计时
            timeMask = setInterval(function() {
                timeShow--;
                $('#clockTime').html(timeShow);
                console.log(timeShow);
                if (timeShow <= 0) {
                    clearInterval(timeMask);
                    $('.mask').hide();
                    // 开启活动游戏&两分钟
                    $('.bg').show();
                    bgshow();
                    pks.start(activeTime,300); // 开始游戏
                }
            }, 1000);

        }else if (nowTime > preTime1 && nowTime < overTime1) { // 活动时间内 活动开启
            // 直接开启活动游戏

            // 计算活动游戏时间
            activeTime = Math.floor(overTime1 - nowTime);
            $('.bg').show();
            bgshow();
            var pkamount = Math.floor(activeTime / 120000 * 300);
            pks.start(activeTime, pkamount);

        }else if (nowTime > preTime2 && nowTime < overTime2) {

            activeTime = Math.floor(overTime2 - nowTime);
            $('.bg').show();
            bgshow();
            var pkamount = Math.floor(activeTime / 120000 * 300);
            pks.start(activeTime, pkamount);

        }else if (nowTime > preTime3 && nowTime < overTime3) {

            activeTime = Math.floor(overTime3 - nowTime);
            $('.bg').show();
            bgshow();
            var pkamount = Math.floor(activeTime / 120000 * 300);
            pks.start(activeTime, pkamount);

        }else {
            toast('活动暂未开启或者已结束...');
        }

    }
    

    // canvas背景
    function bgshow() {
        //小碎片1
        $("canvas.flare1").let_it_snow({
            windPower: 3,
            speed: 3,
            count: 7,
            size: 3,
            image: "./ribbons1.png"
        });
        //小碎片2
        $("canvas.flare2").let_it_snow({
            windPower: 2,
            speed: 2,
            count: 4,
            size: 5,
            image: "./ribbons2.png"
        });
        //小碎片3
        $("canvas.flare3").let_it_snow({
            windPower: 1,
            speed: 2,
            count: 5,
            size: 4,
            image: "./ribbons3.png"
        });
    }

    function toast(content, time) {
        var $toast = $('<div class="toast">'+ content +'</div>');
        $('body').append($toast);
        setTimeout(function() {
            $toast.remove();
        }, 1500);
    }

    function goInvest() {
        // 跳转出借列表
        if(isIos == true) {
            var message = {
                'action': 'goInvest'
            };
            window.webkit.messageHandlers.App.postMessage(message);
        } else {
            app.goInvest();
        }
    }

    function goCouponList() {
        if(isIos == true) {
            var message = {
                'action': 'goCouponList'
            };
            window.webkit.messageHandlers.App.postMessage(message);
        } else {
            app.goCouponList();
        }
    }

    $('#btn3').on('touchstart', function() {
        goInvest();
    })

    $('#btn1').on('click', function() {
        goCouponList();
    })

    $('#btn2').on('click', function() {
        goInvest();
    })


// });