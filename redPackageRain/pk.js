var html = document.getElementsByTagName('html')[0];
html.style.fontSize = html.clientWidth / 7.5 + "px";
addEventListener("resize", function() {
    html.style.fontSize = html.clientWidth / 7.5 + "px";
}, false);
/*获取容器宽高*/
var screenH = document.body.offsetHeight;
var screenW = document.body.offsetWidth;
var RX = screenW - $('.pk').width();
var RY = screenH - $('.pk').height();
var TIMER = '';
var TIMERCLOCK = '';
var newGift = true;

var userInfo = {
	userId: '',
	token: '',
	activityCode: 'A_MAY_REDPACK'
}

var userGiftsAmount = 0;

/*红包模块*/
function PACKAGE() {
	this.speed = '';
	this.x = '';
    this.y = '';
    this.pk_life = 4000;
	this.luck_key = 999;
}

PACKAGE.prototype.init = function () { // 初始化
	this.basic();
	this.bindDom();
}

PACKAGE.prototype.randomNum = function(begin, end) { // 生成随机数工具
	return Math.floor(Math.random()*(end - begin)) + begin;
}

PACKAGE.prototype.basic = function() {
	this.x = parseInt(this.randomNum(0, RX)); // 红包起始x坐标
	this.y = parseInt(this.randomNum(150, 300)); // 红包起始y坐标
	// this.speed = this.randomNum(3500, 6000); // 红包运动总时长
	this.speed = 4000;
}

PACKAGE.prototype.eases = function() { // 红包运动模式
	var easeNum = parseInt(this.randomNum(0, 5));
	switch (easeNum) {
		case 0:
			return 'easeInQuad';
			break;
		case 1:
			return 'swing';
			break;
		case 2:
			return 'easeInExpo';
			break;
		case 3:
			return 'easeInQuint';
			break;
		case 4:
			return 'easeInOutBounce';
			break;
	}
}

PACKAGE.prototype.bindDom = function() {
	var lock = this.randomNum(0, 20);
	var _key = this.luck_key;

    var pkDom = $('<div class="pk pk1" data-rom='+ lock +'></div>');
    
    pkDom.css({'left': this.x + 'px' ,'top': '-'+ this.y +'px'});
    
	pkDom.animate({ top : RY }, this.speed, this.eases(), function() {
		$(this).remove();
	});	
    
	pkDom.on('touchstart', function() {

		if (pkamount > 5 && newGift) {
			newGift = false;
			luck($(this));

		}else if ($(this).attr('data-rom') == _key) {
			
			luck($(this));
			
		}else {
            $(this).addClass('boom');
            setTimeout(function() {
				$(this).remove();
            }.bind(this),200)
        }
	})
	$('.pkcontainer').append(pkDom);
}

var pkamount = 0;
PACKAGE.prototype.start = function(alltime, amount) {
	var intervalTime = parseInt(alltime / amount);
	TIMER = setInterval(function() {
		pks.init();
		pkamount++;
        this.luck_key = this.randomNum(0, 20);
		if (pkamount > amount) {
			pks.stop();
		}
	}.bind(this), intervalTime);
}

PACKAGE.prototype.stop = function() {
	clearInterval(TIMER);
	clearInterval(TIMERCLOCK);
	$('.pk').remove();
	$('.bg').hide();
	if (!userGiftsAmount) {
		$('.result').show();
		$('.result_fail').show();
	}else {
		$('#giftsRsult').html(userGiftsAmount + '个奖励~')
		$('.result').show();
		$('.result_success').show();
	}
}
var pks = new PACKAGE();


/* 非游戏 -- 业务逻辑 */
function luck($this) {
	var _$this = $this;
	$.ajax({
		url: '/activityIf/activity/lotteryDraw/redPackLotteryDraw.htm',
		type: 'post',
		dataType: 'json',
		data: userInfo,
		success: function(data) {
			// 点击抽奖
			if (data.result == 0) {
				userGiftsAmount++;
				_$this.css('background','none');
				_$this.html(data.data.prizeName);
				_$this.off('touchstart');
				_$this.stop();
				_$this.addClass('animateFadeout');
				setTimeout(function() {
					_$this.remove();
	            },2000);
			}else {
				toast('bulingbuling');
				toast(data.msg)
				_$this.addClass('boom');
	            setTimeout(function() {
					_$this.remove();
	            },200)
			}
		}
	})
}