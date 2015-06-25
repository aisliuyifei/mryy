$(function () {
    FastClick.attach(document.body);
    if(document.addEventListener){
        document.addEventListener("touchstart", function(){}, true);
    }
    var ua=navigator.userAgent.toLocaleLowerCase();
    var wx=ua.indexOf("micromessenger")>-1;
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
            if(wx){
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
        if(wx){
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




    var xzName="";
    var name=getQueryString("name");
    var id=getQueryString("id");
    switch (name){
        case "aries":
            id="01";
            xzName="白羊座";
            break;
        case "taurus":
            id="02";
            xzName="金牛座";
            break;
        case "gemini":
            id="03";
            xzName="双子座";
            break;
        case "cancer":
            id="04";
            xzName="巨蟹座";
            break;
        case "leo":
            id="05";
            xzName="狮子座";
            break;
        case "virgo":
            id="06";
            xzName="处女座";
            break;
        case "libra":
            id="07";
            xzName="天秤座";
            break;
        case "scorpio":
            id="08";
            xzName="天蝎座";
            break;
        case "sagittarius":
            id="09";
            xzName="射手座";
            break;
        case "capricorn":
            id="10";
            xzName="魔蝎座";
            break;
        case "aquarius":
            id="11";
            xzName="水瓶座";
            break;
        case "pisces":
            id="12";
            xzName="双鱼座";
            break;
    }
    $(".xzName1").html(xzName);
    $(".xzImg").css('background-image','url("/img/star'+id+'@3x.png")');
    $.ajax({
        url:"/xz/api?name="+name,
        type:"GET",
        dataType:"json",
        success: function (result) {
            if(result.msg.length===0){
                return false;
            }
            $(".zhengti").html(result.msg[result.Date].XZYS);
            $(".aiqing").html(result.msg[result.Date].AQYSD);
            $(".shiye").html(result.msg[result.Date].SYYSD);
            $(".caifu").html(result.msg[result.Date].CFYSD);
            $(".jiankang").html(result.msg[result.Date].JKYSD);
            $(".jiankangNum").html(result.msg[result.Date].JKZS);
            $(".yanse").html(result.msg[result.Date].XYYS);
            $(".shipei").html(result.msg[result.Date].SPXZ);
            $(".shangtanNum").html(result.msg[result.Date].STZS);
            $(".shuzi").html(result.msg[result.Date].XYSZ);
            for(var i=0;i<result.msg[result.Date].ZHYS;i++){
                $(".zongheNum .star:eq("+i+")").addClass("active");
            }
            for(var i=0;i<result.msg[result.Date].GZZT;i++){
                $(".shiyeNum .star:eq("+i+")").addClass("active");
            }
            for(var i=0;i<result.msg[result.Date].AQYS;i++){
                $(".aiqingNum .star:eq("+i+")").addClass("active");
            }
            for(var i=0;i<result.msg[result.Date].LCTZ;i++){
                $(".caifuNum .star:eq("+i+")").addClass("active");
            }

        }
    });

    //var result=JSON.parse('{"status":0,"msg":{"2015-02-06":{"StarName":"taurus","AQYS":2,"AQYSD":"不能为了追求心上人，做出一些不可思议的事情。","CFYSD":"你人脉一多的话，赚钱也会比较容易的。","GZZT":4,"JKYSD":"自从挑了适合自己的洗发水，发质变得越来越好了。","JKZS":"84%","LCTZ":3,"SPXZ":"天秤座","STZS":"75%","SYYSD":"有自己制定短期的工作目标，并为之好好努力。","XYSZ":7,"XYYS":"白色","XZYS":"已婚的你今天有机会带着爱人出席同事间的聚会场合，关系相当融洽的你俩，当众秀甜蜜可是会让其他人羡慕的；今天会跟几位熟识的人聊天，难得大家都能够暂时抛开工作跟生活上的诸多不顺，谈一些比较轻松有趣的话题，心情难得的愉悦。","ZHYS":4},"2015-02-07":{"StarName":"taurus","AQYS":3,"AQYSD":"单身者感性的一面突显，易被主动关心你的朋友所感动。","CFYSD":"做生意如果有跟他人合作的话，要多留个心眼。","GZZT":4,"JKYSD":"由于出门穿的太少，所以今天会有些小感冒。","JKZS":"88%","LCTZ":4,"SPXZ":"巨蟹座","STZS":"87%","SYYSD":"运势一般，不过能与其他同事都能相处融洽。","XYSZ":9,"XYYS":"红色","XZYS":"已婚的你最近有些忙碌，尽量如此也不能忽略了爱人，有时间的话还是多跟对方一起逛街约会吧，为彼此营造一个好的氛围，有心思的话不妨隔一段时间就给对方一些小惊喜；对钱财之事比较用心，所以运势还不错。","ZHYS":3}},"Date":"2015-02-06"}');
    //console.log(result);
    //$(".zhengti").html(result.msg[result.Date].XZYS);
    //$(".aiqing").html(result.msg[result.Date].AQYSD);
    //$(".shiye").html(result.msg[result.Date].SYYSD);
    //$(".caifu").html(result.msg[result.Date].CFYSD);
    //$(".jiankang").html(result.msg[result.Date].JKYSD);
    //$(".jiankangNum").html(result.msg[result.Date].JKZS);
    //$(".yanse").html(result.msg[result.Date].XYYS);
    //$(".shipei").html(result.msg[result.Date].SPXZ);
    //$(".shangtanNum").html(result.msg[result.Date].STZS);
    //$(".shuzi").html(result.msg[result.Date].XYSZ);
    //for(var i=0;i<result.msg[result.Date].ZHYS;i++){
    //    $(".zongheNum .star:eq("+i+")").addClass("active");
    //}
    //for(var i=0;i<result.msg[result.Date].GZZT;i++){
    //    $(".shiyeNum .star:eq("+i+")").addClass("active");
    //}
    //for(var i=0;i<result.msg[result.Date].AQYS;i++){
    //    $(".aiqingNum .star:eq("+i+")").addClass("active");
    //}
    //for(var i=0;i<result.msg[result.Date].LCTZ;i++){
    //    $(".caifuNum .star:eq("+i+")").addClass("active");
    //}

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
});