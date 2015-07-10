$(function() {
    var themeId=getQueryString("themeid");
    // if(themeId&&themeId.length>0){
    //     $(".button a").attr("href",$(".button a").attr("href")+"&themeid="+themeId);
    //     load_css(themeId+"/index.css");
    // }
    // else{
    //     load_css("Theme-Default-iPhone/index.css");
    // }
    function load_css(url, callback) {
        var script = document.createElement('link');
        script.type = 'text/css';
        script.rel = "stylesheet";
        if (script.readyState) { //IE   
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    if (callback) {
                        callback();
                    }
                }
            }
        } else { //others
            script.onload = function() {
                if (callback) {
                    callback();
                }
            }
        }
        script.href = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    var versioncode=getQueryString("versioncode");
    if(versioncode){
        $("header").addClass("hidden");
        $(".content").css("margin-top","0");
        $(".topSelectContent").css("top","0");
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
    if (!versioncode&&!is_iOS7()) {
        $("#main_m").css("top", "-20px");
        $("header").css("top", "-20px");
        $(".topSelectContent").css("top", "44px");
    };

    function is_iOS7() {
        var ua = navigator.userAgent.toLowerCase();
        var index1=ua.indexOf("cpu iphone os")+14;
        var osVersion=parseInt(ua.substr(index1,1));
        if (osVersion>=7) {
            return true;
        }
        else {
            return false;
        }
    }
    var inputWidth=$(document.body).width()-15;
    $(".item").width(inputWidth);
    $(".title").width(inputWidth-60-15);
    $("a").bind('taphold', function(event) {
        event.preventDefault();
    });
    $("#closeBtn").click(function() {
        document.location="protocol://exit:";
    });
    var dateNow = new Date();
    var date = new Date();
    var shareUrl=location.href;
    if(date.getFullYear()===date.getFullYear()&&dateNow.getMonth()===date.getMonth()&&dateNow.getDate()===date.getDate()){
        $("#todayBtn").css("visibility","hidden");
        // location.href="protocol://today#0";
    }
    else{
        $("#todayBtn").css("visibility","visible");
        // location.href="protocol://today#1";
    }
    $(".dayShow").html(date.pattern("yyyy-MM-dd"));
    var dayCount = "今天";
    $(".dayCount").html(dayCount);
    var dateString = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    $.ajax({
        url: "/data/" + dateString + ".txt",
        type: "GET",
        success: function(result) {
            result = JSON.parse(result);
            $.each(result[dateString], function(i) {
                if(i===0){
                    var textObj = {
                        text: this.Y+"年的今天,"+this.C+" 更多今日历史信息，请点击："+shareUrl,
                        image: "1",
                        url:shareUrl,
                        pureText:this.Y+"的今天,"+this.C,
                        prefix:"更多今日历史信息，请点击："
                    };
                    $(".shareLink").attr("href","protocol://share:" + encodeURI(JSON.stringify(textObj)));
                }
                var item = $(".tempList .item:first").clone();
                item.find(".year").html(this.Y);
                item.find(".title").html(this.C);
                item.removeClass("hidden");
                item.appendTo(".contentList ul");
            })
        }
    });
   $("#todayBtn").click(function() {
        $("html,body").scrollTop(0);
        date = new Date();
        $(".dayShow").html(date.pattern("yyyy-MM-dd"));
        var dayCount = "今天";
        $(".dayCount").html(dayCount);
        var dateString = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        $.ajax({
            url: "/data/" + dateString + ".txt",
            type: "GET",
            success: function(result) {
                $(".contentList ul").empty();
                result = JSON.parse(result);
                $.each(result[dateString], function(i) {
                    if(i===0){
                        var textObj = {
                            text: this.Y+"年的今天,"+this.C+" 更多今日历史信息，请点击："+shareUrl,
                            image: "1",
                            url:shareUrl,
                            pureText:this.Y+"的今天,"+this.C,
                            prefix:"更多今日历史信息，请点击："
                        };
                        // $(".shareLink").attr("href","protocol://share:" + encodeURI(JSON.stringify(textObj)));
                    }
                    var item = $(".tempList .item:first").clone();
                    item.find(".year").html(this.Y);
                    item.find(".title").html(this.C);
                    item.removeClass("hidden");
                    item.appendTo(".contentList ul");
                })
            }
        });
        if(date.getFullYear()===date.getFullYear()&&dateNow.getMonth()===date.getMonth()&&dateNow.getDate()===date.getDate()){
            $("#todayBtn").css("visibility","hidden");
            // location.href="protocol://today#0";
        }
        else{
            $("#todayBtn").css("visibility","visible");
            // location.href="protocol://today#1";
        }
    });
    $("#preveBtn").click(function() {
        $("html,body").scrollTop(0);
        date.setDate(date.getDate() - 1);
        $(".dayShow").html(date.pattern("yyyy-MM-dd"));

        var dayInterval = Math.ceil((new Date(date.getFullYear(),date.getMonth(),date.getDate()) - new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate())) / (1000 * 3600 * 24));
        if (dayInterval == 0) {
            dayCount = "今天";
        }
		else if (dayInterval == 1) {
            dayCount = "明天";
        }
		else if (dayInterval > 1) {
            dayCount = dayInterval + "天后";
        }
		else if (dayInterval == -1) {
            dayCount = "昨天";
        }
		else if (dayInterval < -1) {
            dayCount = -dayInterval + "天前";
        }
        $(".dayCount").html(dayCount);

        var dateString = (parseInt(date.getMonth()) + 1 < 10 ? "0" + (parseInt(date.getMonth()) + 1) : parseInt(date.getMonth()) + 1) + "" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        $.ajax({
            url: "/data/" + dateString + ".txt",
            type: "GET",
            success: function(result) {
                $(".contentList ul").empty();
                result = JSON.parse(result);
                $.each(result[dateString], function(i) {
                    if(i===0){
                        var textObj = {
                            text: this.Y+"年的今天,"+this.C+" 更多今日历史信息，请点击："+shareUrl,
                            image: "1",
                            url:shareUrl,
                            pureText:this.Y+"的今天,"+this.C,
                            prefix:"更多今日历史信息，请点击："
                        };
                        // $(".shareLink").attr("href","protocol://share:" + encodeURI(JSON.stringify(textObj)));
                    }
                    var item = $(".tempList .item:first").clone();
                    item.find(".year").html(this.Y);
                    item.find(".title").html(this.C);
                    item.removeClass("hidden");
                    item.appendTo(".contentList ul");
                })
            }
        });
        if(date.getFullYear()===date.getFullYear()&&dateNow.getMonth()===date.getMonth()&&dateNow.getDate()===date.getDate()){
            $("#todayBtn").css("visibility","hidden");
            // location.href="protocol://today#0";
        }
        else{
            $("#todayBtn").css("visibility","visible");
            // location.href="protocol://today#1";
        }
    });
    $("#nextBtn").click(function() {
        $("html,body").scrollTop(0);
        date.setDate(date.getDate() + 1);
        $(".dayShow").html(date.pattern("yyyy-MM-dd"));

        var dayInterval = Math.ceil((new Date(date.getFullYear(),date.getMonth(),date.getDate()) - new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate())) / (1000 * 3600 * 24));
        if (dayInterval == 0) {
            dayCount = "今天";
        }
		else if (dayInterval == 1) {
            dayCount = "明天";
        }
		else if (dayInterval > 1) {
            dayCount = dayInterval + "天后";
        }
		else if (dayInterval == -1) {
            dayCount = "昨天";
        }
		else if (dayInterval < -1) {
            dayCount = -dayInterval + "天前";
        }
        $(".dayCount").html(dayCount);

        var dateString = (parseInt(date.getMonth()) + 1 < 10 ? "0" + (parseInt(date.getMonth()) + 1) : parseInt(date.getMonth()) + 1) + "" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        $.ajax({
            url: "/data/" + dateString + ".txt",
            type: "GET",
            success: function(result) {
                $(".contentList ul").empty();
                result = JSON.parse(result);
                $.each(result[dateString], function(i) {
                    if(i===0){
                        var textObj = {
                            text: this.Y+"年的今天,"+this.C+" 更多今日历史信息，请点击："+shareUrl,
                            image: "1",
                            url:shareUrl,
                            pureText:this.Y+"的今天,"+this.C,
                            prefix:"更多今日历史信息，请点击："
                        };
                        // $(".shareLink").attr("href","protocol://share:" + encodeURI(JSON.stringify(textObj)));
                    }
                    var item = $(".tempList .item:first").clone();
                    item.find(".year").html(this.Y);
                    item.find(".title").html(this.C);
                    item.removeClass("hidden");
                    item.appendTo(".contentList ul");
                })
            }
        });
        if(date.getFullYear()===date.getFullYear()&&dateNow.getMonth()===date.getMonth()&&dateNow.getDate()===date.getDate()){
            $("#todayBtn").css("visibility","hidden");
            // location.href="protocol://today#0";
        }
        else{
            $("#todayBtn").css("visibility","visible");
            // location.href="protocol://today#1";
        }
    })
});
function appCallback_today(){
    $("#todayBtn").trigger("click");
    return 1;
}
function appCallback_share(){
    $(".clickContent").trigger("click");
    return 1;
}
//日期自定义格式化函数
//fmt：格式     如yyyy-MM-dd
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};