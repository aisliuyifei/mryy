$(function(){
    FastClick.attach(document.body);
    if(document.addEventListener){
        document.addEventListener("touchstart", function(){}, true);
    }






    var ua=navigator.userAgent.toLocaleLowerCase();
    var wx1=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    if(!isIOSPhone&&!isAndroid&&!isWP){
        $(".shareContent").removeClass("hidden");
        $(".shareBtn").hover(function(){
            $(".shareDomPanel").fadeIn();
            $(".downloadPanel").fadeOut();
        },function(){});
        $(".shareDomPanel").hover(function(){
            $(".shareDomPanel").fadeIn();
            $(".downloadPanel").fadeOut();
        },function(){
            $(".shareDomPanel").fadeOut();
        });


        $(".downloadBtn").hover(function(){
            $(".shareDomPanel").fadeOut();
            $(".downloadPanel").fadeIn();
        },function(){});
        $(".downloadPanel").hover(function(){
            $(".shareDomPanel").fadeOut();
            $(".downloadPanel").fadeIn();
        },function(){
            $(".downloadPanel").fadeOut();
        });
    }
    else{
        $(".downloadBtn").click(function(){
            if(wx1){
                location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
            }
            else{
                if(isIOS){
                    location.href="http://itunes.apple.com/cn/app/id419805549?mt=8";
                }
                else if(isAndroid){
                    location.href="http://download.eoemarket.com/app?id=54861&co_id=0&client_id=140&channel_id=807";
                }
                else if(isWP){
                    location.href="http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e";
                }
                else{
                    location.href="http://www.51wnl.com";
                }
            }
        });
    }
    var title="";
    //å‘é€æœ‹å‹æ ‡é¢˜
    var fTitle=title;
    //åˆ†äº«æè¿°
    var desc=title;
    //åˆ†äº«é“¾æŽ¥
    var link=location.href;
    //åˆ†äº«å›¾ç‰‡é“¾æŽ¥
    var imgUrl='http://www.51wnl.com/activitynew/yuncheng/img/icon.png';
    var monthList=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    var weekList=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var nowDate=new Date();
    var date=getQueryString("date"),year= nowDate.getFullYear(),month= nowDate.getMonth()+1,day=nowDate.getDate();
    if(date&&date.length!==0){
        year=str2Int(date.substring(0,4));
        month=str2Int(date.substring(5,7));
        day=str2Int(date.substring(8,10));
        nowDate=new Date(year,month-1,day);
    }
    $(".dayNumber").html(day);
    $(".monthNum").html(monthList[month-1]);
    $(".weekNum").html(weekList[nowDate.getDay()]);
    var imgWidth=$(".imgWrapper").width()-4;
    var imgHeight=$(window).height()-66-4;
    $(".contentImg").width(imgWidth);
    $(".contentImg").height(imgHeight);
    $.ajax({
        url:"http://www.51wnl.com/api/getdailysentenceweb.ashx",
        dataType:"jsonp",
        data:{
            dt:year+"-"+(month<10?("0"+month):month)+"-"+(day<10?("0"+day):day)
        },
        success: function (data) {
            if(data.succeed==="true"){
                title=data.result.S;
                $(".yyTxt").html(title);
                _bd_share_config.common.bdText=_bd_share_config.common.bdDesc=title;
                _bd_share_config.share[0].bdText=_bd_share_config.share[0].bdDesc=title;
                if(isAndroid&&wx1){
                    $(".contentImg").attr("src",data.result.LargeImg);
                }
                else{
                    $(".contentImg").attr("src",data.result.LargeImg+"?imageView2/1/w/"+(imgWidth*2)+"/h/"+(imgHeight*2)+"/q/90");
                }
                fTitle=title;
                desc=title;
                setShareInfo();
            }
        }
    });
    wx.ready(function(){
        setShareInfo();
    });
    wx.error(function(res){
        alert(JSON.stringify(res));
    });
    function setShareInfo(){
        //èŽ·å–â€œåˆ†äº«åˆ°æœ‹å‹åœˆâ€æŒ‰é’®ç‚¹å‡»çŠ¶æ€åŠè‡ªå®šä¹‰åˆ†äº«å†…å®¹æŽ¥å£
        wx.onMenuShareTimeline({
            title: title, // åˆ†äº«æ ‡é¢˜
            link: link, // åˆ†äº«é“¾æŽ¥
            imgUrl: imgUrl, // åˆ†äº«å›¾æ ‡
            success: function () {
                // ç”¨æˆ·ç¡®è®¤åˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            },
            cancel: function () {
                // ç”¨æˆ·å–æ¶ˆåˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            }
        });
        //èŽ·å–â€œåˆ†äº«ç»™æœ‹å‹â€æŒ‰é’®ç‚¹å‡»çŠ¶æ€åŠè‡ªå®šä¹‰åˆ†äº«å†…å®¹æŽ¥å£
        wx.onMenuShareAppMessage({
            title: fTitle, // åˆ†äº«æ ‡é¢˜
            desc: desc, // åˆ†äº«æè¿°
            link: link, // åˆ†äº«é“¾æŽ¥
            imgUrl: imgUrl, // åˆ†äº«å›¾æ ‡
            //type: '', // åˆ†äº«ç±»åž‹,musicã€videoæˆ–linkï¼Œä¸å¡«é»˜è®¤ä¸ºlink
            //dataUrl: '', // å¦‚æžœtypeæ˜¯musicæˆ–videoï¼Œåˆ™è¦æä¾›æ•°æ®é“¾æŽ¥ï¼Œé»˜è®¤ä¸ºç©º
            success: function () {
                // ç”¨æˆ·ç¡®è®¤åˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            },
            cancel: function () {
                // ç”¨æˆ·å–æ¶ˆåˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            }
        });
        //èŽ·å–â€œåˆ†äº«åˆ°QQâ€æŒ‰é’®ç‚¹å‡»çŠ¶æ€åŠè‡ªå®šä¹‰åˆ†äº«å†…å®¹æŽ¥å£
        wx.onMenuShareQQ({
            title: title, // åˆ†äº«æ ‡é¢˜
            desc: desc, // åˆ†äº«æè¿°
            link: link, // åˆ†äº«é“¾æŽ¥
            imgUrl: imgUrl, // åˆ†äº«å›¾æ ‡
            success: function () {
                // ç”¨æˆ·ç¡®è®¤åˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            },
            cancel: function () {
                // ç”¨æˆ·å–æ¶ˆåˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            }
        });
        //èŽ·å–â€œåˆ†äº«åˆ°è…¾è®¯å¾®åšâ€æŒ‰é’®ç‚¹å‡»çŠ¶æ€åŠè‡ªå®šä¹‰åˆ†äº«å†…å®¹æŽ¥å£
        wx.onMenuShareWeibo({
            title: title, // åˆ†äº«æ ‡é¢˜
            desc: desc, // åˆ†äº«æè¿°
            link: link, // åˆ†äº«é“¾æŽ¥
            imgUrl: imgUrl, // åˆ†äº«å›¾æ ‡
            success: function () {
                // ç”¨æˆ·ç¡®è®¤åˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            },
            cancel: function () {
                // ç”¨æˆ·å–æ¶ˆåˆ†äº«åŽæ‰§è¡Œçš„å›žè°ƒå‡½æ•°
            }
        });
    }
    function str2Int(str){
        str = str.replace(/^0+/g, '');
        if(str.length == 0){
            return 0;
        }
        return parseInt(str);
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }







    $(".contentMask").click(function(){
        $(".qrcodeImgContent").addClass("hidden");
    });
    $(".downloadLink").click(function () {
        downloadAction();
    });
    $(".wnlDownloadBtn").click(function () {
        downloadAction();
    });
    function downloadAction(){
        if(wx1){
            location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
        }
        else{
            if(isIOS){
                location.href="http://itunes.apple.com/cn/app/id419805549?mt=8";
            }
            else if(isAndroid){
                location.href="http://download.eoemarket.com/app?id=54861&co_id=0&client_id=140&channel_id=807";
            }
            else if(isWP){
                location.href="http://www.windowsphone.com/en-us/store/app/%E4%B8%87%E5%B9%B4%E5%8E%86/8ffa51ca-df17-e011-9264-00237de2db9e";
            }
            else{
                $("html,body").scrollTop(0);
                $(".qrcodeImgContent").removeClass("hidden");
            }
        }
    }
});
