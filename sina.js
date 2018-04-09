/*
滚动新闻 sina UI&UE Dept.
mengjia 201207
*/
var sina = {
    $ : function(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}},
    isIE : navigator.appVersion.indexOf("MSIE")!=-1?true:false,

    //Event
    addEvent : function(obj,eventType,func){if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}else{obj.addEventListener(eventType,func,false)}},
    delEvent : function(obj,eventType,func){
        if(obj.detachEvent){obj.detachEvent("on" + eventType,func)}else{obj.removeEventListener(eventType,func,false)}
    },
    //Cookie
    readCookie : function(l){var i="",I=l+"=";if(document.cookie.length>0){var offset=document.cookie.indexOf(I);if(offset!=-1){offset+=I.length;var end=document.cookie.indexOf(";",offset);if(end==-1)end=document.cookie.length;i=document.cookie.substring(offset,end)}};return unescape(i)},

    writeCookie : function(O,o,l,I){var i="",c="";if(l!=null){i=new Date((new Date).getTime()+l*3600000);i="; expires="+i.toGMTString()};if(I!=null){c=";domain="+I};document.cookie=O+"="+escape(o)+i+c},
    //Style
    readStyle:function(i,I){if(i.style[I]){return i.style[I]}else if(i.currentStyle){return i.currentStyle[I]}else if(document.defaultView&&document.defaultView.getComputedStyle){var l=document.defaultView.getComputedStyle(i,null);return l.getPropertyValue(I)}else{return null}},
    absPosition : function(obj,parentObj){ //位置
        var left = obj.offsetLeft;
        var top = obj.offsetTop;
        var tempObj = obj.offsetParent;
        try{
            while(tempObj.id!=document.body && tempObj.id!=document.documentElement && tempObj != parentObj && tempObj!= null){
                sss += tempObj.tagName + " , ";
                tempObj = tempObj.offsetParent;
                left += tempObj.offsetLeft;
                top += tempObj.offsetTop;
            };
        }catch(e){};
        return {left:left,top:top};
    },
    cutString : function(str,len){ //截取
        if(typeof(str) != "string"){return null};
        if(!(/^[0-9]*[1-9][0-9]*$/).test(len)){return str};
        if(len == 0){return str};
        var sum = 0,newStr = "";
        for(var i=0;i<str.length;i++){
            if(str.charCodeAt(i) > 255){
                sum += 2;
            }else{
                sum ++;
            };
            if(sum <= len - 2){
                newStr += str.charAt(i);
            }else{
                if(i==str.length-1){
                    newStr += str.charAt(i);
                }else{
                    newStr += "..";
                };
                break;
            };
        };
        return newStr;
    },
    _getJsData : function(url,dispose){
        var scriptNode = document.createElement("script");
        scriptNode.type = "text/javascript";
        scriptNode.onreadystatechange = scriptNode.onload = function(){
            if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete"){
                if(dispose){dispose()};
                scriptNode.onreadystatechange = scriptNode.onload = null;
                scriptNode.parentNode.removeChild(scriptNode);
            }
        };
        scriptNode.src = url;
        document.getElementsByTagName("head")[0].appendChild(scriptNode);
    },
    getHashValue : function(name){
        var nameRegExp = new RegExp("(?:\#|&|^)"+ name + "=([^&]*)");
        var value = location.hash.match(nameRegExp);
        try{
            return value===null?'':decodeURI(value[1]);
        }catch(e){
            return '';
        }
    },
    style : {
        setOpacity : function(obj,opacity){
            if(typeof(obj.style.opacity) != 'undefined'){
                obj.style.opacity = opacity;
            }else{
                obj.style.filter = 'Alpha(Opacity=' + (opacity*100) + ')';
            };
        }
    },
    extend : {
        show : function(obj,timeLimit){
            if(sina.readStyle(obj,'display') === 'none'){
                obj.style.display = 'block';
            };
            sina.style.setOpacity(obj,0);
            if(!timeLimit){
                timeLimit = 200;
            };
            var opacity = 0,step = timeLimit / 20;
            clearTimeout(obj._extend_show_timeOut);
            obj._extend_show_timeOut = setTimeout(function(){
                if(opacity >= 1){
                    return;
                };
                opacity += 1/step;
                sina.style.setOpacity(obj,opacity);
                obj._extend_show_timeOut = setTimeout(arguments.callee,20);

            },20);
        },
        hide : function(obj,timeLimit){
            if(!timeLimit){
                timeLimit = 200;
            };
            sina.style.setOpacity(obj,1);
            var opacity = 1,step = timeLimit / 20;
            clearTimeout(obj._extend_show_timeOut);
            obj._extend_show_timeOut = setTimeout(function(){
                if(opacity <= 0){
                    obj.style.display = 'none';
                    sina.style.setOpacity(obj,1);
                    return;
                };
                opacity -= 1/step;
                sina.style.setOpacity(obj,opacity);
                obj._extend_show_timeOut = setTimeout(arguments.callee,20);

            },20);
        },
        actPX : function(obj,key,start,end,speed,endFn,u){
            if(typeof(u) == 'undefined'){u = 'px'};
            clearTimeout(obj['_extend_actPX' + key.replace(/\-\.\=/,'_') + '_timeOut']);
            if(start > end){
                speed = - Math.abs(speed);
            }else{
                speed = Math.abs(speed);
            };
            var now = start;
            var length = end - start;
            obj['_extend_actPX' + key.replace(/\-\.\=/,'_') + '_timeOut'] = setTimeout(function(){
                now += speed;
                //debugger;
                var space = end - now;
                if(start < end){
                    if(space < length/3){
                        speed = Math.ceil(space/3);
                    };
                    if(space <= 0){ //end
                        obj[key] = end + u;
                        if(endFn){endFn()};
                        return;
                    };
                }else{
                    if(space > length/3){
                        speed = Math.floor(space/3);
                    };
                    if(space >= 0){ //end
                        obj[key] = end + u;
                        if(endFn){endFn()};
                        return;
                    };
                };

                obj[key] = now + u;
                obj['_extend_actPX' + key.replace(/\-\.\=/,'_') + '_timeOut'] = setTimeout(arguments.callee,20);

            },20);
        }
    }
};

//模拟Select mengjia 2008.12.30
function DivSelect(id,divId,className,contentId,listUp){
    this.id = id;
    this.divId = divId;
    this.divClassName = className;
    this.contentId = contentId;
    this.listUp = listUp; //向上展开列表

    this.selectObj = sina.$(this.id);
    if(!this.selectObj){return};

    var tempThis = this;
    this.status = "close";

    this.parentObj = this.selectObj.parentNode;
    while(sina.readStyle(this.parentObj,"display") != "block"){
        if(this.parentObj.parentNode){this.parentObj = this.parentObj.parentNode}else{break};
    };

    this.parentObj.style.position = "relative";

    this.selectObjWidth = this.selectObj.offsetWidth;
    this.selectObjHeight = this.selectObj.offsetHeight;
    this.selectPosition = sina.absPosition(this.selectObj,this.parentObj);

    this.selectObj.style.visibility = "hidden";

    //创建结构
    this.divObj = document.createElement("div");
    this.divObj.id = this.divId;
    if(this.divClassName){this.divObj.className = this.divClassName};

    if(sina.$(this.contentId)){
        sina.$(this.contentId).appendChild(this.divObj);
    }else{
        this.parentObj.appendChild(this.divObj);
    };
    this.divObj.style.width = this.selectObjWidth + "px";
    this.divObj.style.position = "absolute";
    this.divObj.style.left = this.selectPosition.left + "px";
    this.divObj.style.top = this.selectPosition.top + "px";
    this.divObj.onclick = function(){tempThis.click()};

    this.divObj_cont = document.createElement("div");
    this.divObj.appendChild(this.divObj_cont);
    this.divObj_cont.className = "ds_cont";

    this.divObj_title = document.createElement("div");
    this.divObj_cont.appendChild(this.divObj_title);
    this.divObj_title.className = "ds_title";

    this.divObj_button = document.createElement("div");
    this.divObj_cont.appendChild(this.divObj_button);
    this.divObj_button.className = "ds_button";

    this.divObj_list = document.createElement("div");
    this.divObj.appendChild(this.divObj_list);
    this.divObj_list.className = "ds_list";
    this.divObj_list.style.display = "none";

    this.divObj_listCont = document.createElement("div");
    this.divObj_list.appendChild(this.divObj_listCont);
    this.divObj_listCont.className = "dsl_cont";

    this.list = [];
    var temp;
    for(var i=0;i<this.selectObj.options.length;i++){
        temp = document.createElement("p");
        this.list.push(temp);
        this.divObj_listCont.appendChild(temp);

        temp.innerHTML = this.selectObj.options[i].innerHTML;
        if(this.selectObj.selectedIndex == i){
            this.divObj_title.innerHTML = temp.innerHTML;
        };
        temp.num = i;
        temp.onmouseover = function(){tempThis.showSelectIndex(this.num)};
        temp.onclick = function(){tempThis.select(this.innerHTML)};
    };

    this.selectObj.setIndex = function(num){
        tempThis.setIndex(num);
    };
};
DivSelect.prototype = {
    showSelectIndex : function(num){
        if(typeof(num) === 'undefined'){
            num = this.selectObj.selectedIndex;
        };
        if(num<0){num=0};
        if(typeof(this.showIndex) !== 'undefined'){
            this.list[this.showIndex].className = '';
        };
        this.showIndex = num;
        this.list[this.showIndex].className = 'selected';
    },
    select : function(txt){
        for(var i=0;i<this.selectObj.options.length;i++){
            if(this.selectObj.options[i].innerHTML == txt){
                this.selectObj.selectedIndex = i;
                if(this.selectObj.onchange){
                    this.selectObj.onchange();
                };
                this.divObj_title.innerHTML = txt;
                break;
            };
        };
    },
    setIndex : function(num){
        if(this.selectObj.selectedIndex != num){
            this.selectObj.selectedIndex = num;
            if(this.selectObj.onchange){
                this.selectObj.onchange();
            };
        };

        this.divObj_title.innerHTML = this.selectObj.options[num].innerHTML;
    },
    clickClose : function(e){
        var thisObj = e.target?e.target:event.srcElement;
        var tempThis = this;
        do{
            if(thisObj == tempThis.divObj){return};
            if(thisObj.tagName == "BODY"){break;};
            thisObj = thisObj.parentNode;
        }while(thisObj.parentNode);
        tempThis.close();
    },
    open : function(){
        var tempThis = this;
        this.showSelectIndex();
        this.divObj_list.style.height = 0;
        this.divObj_list.style.display = "block";
        if(this.listUp){
            sina.extend.actPX(this.divObj_list.style,'height',0,this.divObj_listCont.offsetHeight,10);
            //sina.extend.actPX(this.divObj_listCont.style,'marginTop',-this.divObj_listCont.offsetHeight,0,10);
        }else{
            sina.extend.actPX(this.divObj_list.style,'height',0,this.divObj_listCont.offsetHeight,10);
            sina.extend.actPX(this.divObj_listCont.style,'marginTop',-this.divObj_listCont.offsetHeight,0,10);
        };

        this.status = "open";
        this.tempFunction = function(e){tempThis.clickClose(e)};
        sina.addEvent(document,"click",this.tempFunction);
    },
    close : function(){
        var tempThis = this;
        if(this.listUp){
            sina.extend.actPX(this.divObj_list,'height',this.divObj_listCont.offsetHeight,0,10,function(){tempThis.divObj_list.style.display='none'});
            //sina.extend.actPX(this.divObj_listCont,'marginTop',-this.divObj_listCont.offsetHeight,0,10);
        }else{
            sina.extend.actPX(this.divObj_list,'height',this.divObj_listCont.offsetHeight,0,10,function(){tempThis.divObj_list.style.display='none'});
            sina.extend.actPX(this.divObj_listCont,'marginTop',0,-this.divObj_listCont.offsetHeight,10);
        };
        sina.extend.hide(this.divObj_list,100);
        this.status = "close";
        sina.delEvent(document,"click",this.tempFunction);
    },
    click : function(){
        if(this.status == "open"){
            this.close();
        }else{
            this.open();
        };
    }
};

var newsList = {
    //dataAPI : 'http://roll.news.sina.com.cn/interface/rollnews_out_interface.php',
    dataAPI : 'http://roll.news.sina.com.cn/interface/rollnews_ch_out_interface.php',
    news : [],
    ch : '', //频道id
    updateTime : null,
    isAppleMobile : false,
    last_time : 0,
    toolStatus : 1,
    offset_page : 0 , //搜索时回传
    offset_num : 0, //搜索时回传
    init : function(){
        this.resumeHash(); //恢复参数

        this.time.init();
        this.channel.init();
        this.page.init();
        //this.order.init();
        this.type.init();
        this.date.init();
        this.search.init();
        this.autoReload.init();

        this.review.init();

        this.help.init(); //帮助提示

        this.toolbar.init();

        this.request();

        /*sina.$('resetAll').onclick = function(){
            tempThis.reset();
            this.blur();
            return false;
        };*/

        var testAppleMobile = /\((iPhone|iPad|iPod)/i;
        if(testAppleMobile.test(navigator.userAgent)){
            this.isAppleMobile = true;
        };

        this.iPad.init();
    },
    htmlEncode: function(str) {
        if (!str) {
            return str;
        }
        str = str + '';
        return str.replace(/&|<|>|\'|\"/g, function(c) {
            switch (c) {
                case '&':
                    c = '&amp;';
                    break;
                case '<':
                    c = '&lt;';
                    break;
                case '>':
                    c = '&gt;';
                    break;
                case "'":
                    c = '&#39;';
                    break;
                case '"':
                    c = '&quot;';
                    break;
                default:
                    break;
            }
            return c;
        });
    },
    resumeHash : function(){ //从cookie和hash中恢复信息，hash优先
        //从cookie中恢复
        //c_(频道)_ps_(页数)_tl_(时限)_tp_(类型)_ar_(自动刷新时长)
        var userSet = sina.readCookie('newsList').match(/c_(.*?)_ps_(.*?)_tl_(.*?)_tp_(.*?)_ar_(.*?)_ah_(.*)/i);
        var isNum = /^[\-\d]+$/;
        if(userSet){
            this.channel.userSet = userSet[1];
            if(isNum.test(userSet[2])){
                newsList.page.pageSize = userSet[2];
            };
            /*if(userSet[3] === '' || userSet[3] === 'day' || userSet[3] === 'month' || userSet[3] === 'week'){
                newsList.date.value = userSet[3];
            };*/

            //newsList.type.value = userSet[4];

            if(isNum.test(userSet[5])){
                this.autoReload.cdsSize = userSet[5];
            };
            if(userSet[6] === 'true'){
                newsList.toolbar.autoHide = true;
            };
            if(userSet[6] === 'false'){
                newsList.toolbar.autoHide = false;
            };
        };

        //ch id
        var ch = location.search.match(/(?:\?|&)ch=(\d+)/i);
        if(ch){
            this.ch = ch[1];
        };

        //从hash中恢复
        var col = sina.getHashValue('col');
        if(col !== ''){this.channel.col = col};
        //var ch = sina.getHashValue('ch');
        //if(ch !== ''){this.channel.ch = ch};
        var spec = sina.getHashValue('spec');
        if(spec !== ''){this.channel.spec = spec};
        var pageSize = sina.getHashValue('num');
        if(pageSize !== ''){this.page.pageSize = pageSize};
        var pageIndex = sina.getHashValue('page');
        if(pageIndex !== ''){this.page.index = pageIndex};

        //this.order.value = sina.getHashValue('asc');
        var type = sina.getHashValue('type');
        if(type !== ''){this.type.value = type};

        this.search.key = sina.getHashValue('k');
        var date = sina.getHashValue('date');
        if(date !== ''){
            this.date.value = date;
            if((/(\d{4})-(\d{1,2})-(\d{1,2})/).test(this.date.value)){
                this.review.selectDate = this.date.value;
            };
        };

    },
    reset : function(){
        //this.time.reset();
        this.channel.reset();
        this.page.reset();
        //this.order.reset();
        this.type.reset();
        this.date.reset();
        this.search.reset();
        this.autoReload.reset();
        this.request();
        this.saveCookie();
    },
    request : function(type){
        var tempThis = this;
        var str = '';

        //str += '&ch=' + this.channel.ch + '&col=' + this.channel.col + '&spec=' + this.channel.spec;
        if(this.search.key===''){ //搜索时在全频道
            //ch col spec
            //str += 'ch=' + this.channel.ch + '&col=' + this.channel.col + '&spec=' + this.channel.spec;
            if(this.channel.col == '' && this.channel.spec == ''){
                str += 'col=' + this.channel.allId + '&spec=';
            }else{
                str += 'col=' + this.channel.col + '&spec=' + this.channel.spec;
            };
            //type
            str += '&type=' + this.type.value;

        }else{
            //str += 'date=month'; //搜索时间是1个月
        };
        if(type != 'refurbish'){
            if(this.date.value === '' || this.date.value === 'day' || this.date.value === 'month' || this.date.value === 'week'){
                if(this.search.key!==''){
                    str += '&date=' + this.date.value;
                };
            }else{
                str += '&date=' + this.date.value;
            };
        }else{
            str += '&date=';
        };

        //ch
        str += '&ch=' + this.ch;

        //k
        str += '&k=' + this.search.key;
        str += '&offset_page=' + this.offset_page;
        str += '&offset_num=' + this.offset_num;


        //num , pageSize
        str += '&num=' + this.page.pageSize + '&asc=' + this.order.value;

        //page
        str += '&page=' + this.page.index;

        //刷新
        if(type == 'refurbish' && this.last_time != null){
            str += '&last_time=' + this.last_time
        }else{
            window.location.hash = str; //路径记录
        };

        //清空数据
        jsonData = {serverSeconds : null, last_time : null, path : [ ], count : -1, list : [] };

        if(type != 'refurbish'){
            var contHeight = sina.$('d_list').offsetHeight - 12;
            contHeight = contHeight<300?300:contHeight;
            this.setHTML('<div style="height:' + (contHeight) + 'px;" class="loading"></div>');
            sina.$('vBody').scrollTop = 0;
        };

        this.__requestTimeout = setTimeout(function(){
            newsList.autoReload.resetAuto(); //重置自动刷新
        },10 * 1000);
        sina._getJsData(this.dataAPI + "?" + str + '&r=' + Math.random(),function(){tempThis.showHTML(type)});
    },
    showHTML : function(type){
        clearTimeout(this.__requestTimeout);

        this.updateTime = jsonData.serverSeconds;

        this.offset_page = jsonData.offset_page;
        this.offset_num = jsonData.offset_num;


        this.time.setServerTime(jsonData.serverSeconds);

        this.review.setNowDateObj(new Date(this.time.dateObj)); //设置回顾的现在时间

        if(jsonData.count !== -1){
            this.page.setCount(jsonData.count);
        };

        newsList.autoReload.resetAuto(); //重置自动刷新


        if(jsonData.list.length != 0){this.last_time = jsonData.last_time;};

        if(type == 'refurbish'){
            this.showAddTxt(); //刷新，添加动作
        }else{
            this.showTxt();
            this.showPath(); //显示路径
        };
    },
    showPath : function(){
        var html = '', title = '',titleLink = "",titleDate = '';
        if(jsonData.path.length == 0){
            if(newsList.channel.spec + newsList.channel.ch + newsList.channel.col == ''){
                html = '&nbsp;&gt; 全部';
                title = '';
            }else{
                html = '&nbsp;&gt; 定制';
                title = '定制';
            };
        }else{
            for(var i=0;i<jsonData.path.length;i++){
                html += ' &gt; <a href="javascript:void(0)" onclick="newsList.channel.setChannel(\'' + jsonData.path[i].cType +'\',\'' + jsonData.path[i].id +'\');return false;">' + jsonData.path[i].title + '</a>';
            };
            title = jsonData.path[0].title;
        };

        if(this.date.value.indexOf('-') != -1){
            var dateInfo = this.date.value.match(/(\d+)\-0?(\d+)\-0?(\d+)/)
            title += dateInfo[1] + '年' + dateInfo[2] + '月' + dateInfo[3] + '日 滚动新闻回顾';
            titleLink = '<a href="javascript:void(0)" onclick="newsList.review.preDay();return false;" id="reviewPre">前一日</a><a href="javascript:void(0)" onclick="newsList.review.nextDay();return false;" id="reviewNext">后一日</a> <a href="javascript:void(0)" onclick="newsList.review.toToday();return false;" id="returnNow">返回今日</a>';
            //回顾隐藏刷新
            sina.$('reloadSwitch').style.display = 'none';
            sina.$('reloadButton').style.display = 'none';
        }else{
            titleDate = newsList.time.dateObj.getFullYear() + '年' + (newsList.time.dateObj.getMonth()+1) + '月' + newsList.time.dateObj.getDate() + '日 ';
            title += '滚动新闻';
            //回顾隐藏刷新
            sina.$('reloadSwitch').style.display = 'block';
            sina.$('reloadButton').style.display = 'block';
        };

        sina.$('pL_PathInfo').innerHTML = html;

        //设置标题
        sina.$('pL_Title').innerHTML = titleDate + title + titleLink;
        //document.title = title + '_新浪网';

        //显示临时频道选项
        this.channel.setTempChannel();
    },
    showAlert : function(txt,s){ //txt:提示内容 s:显示时间
        var tempThis = this;
        if(!this.alertDivObj){
            this.alertDivObj = document.createElement('div');
            this.alertDivObj.className = 'showAlert';
        };
        sina.$('pL_Main').appendChild(this.alertDivObj);
        if(!s){s=5};
        this.alertDivObj.innerHTML = txt;
        sina.extend.show(this.alertDivObj);
        clearTimeout(this._showAlertT);
        this._showAlertT = setTimeout(function(){sina.extend.hide(tempThis.alertDivObj);},s*1000);
    },
    showAddTxt : function(){ //添加动作
        if(jsonData.list.length == 0){
            this.showAlert('无新闻更新',3)
            return;
        };
        var sum=0,ul,li,html='',height = 0;
        ul = sina.$('d_list').getElementsByTagName('ul')[0];

        if(!ul){
            ul = document.createElement('ul');
            sina.$('d_list').appendChild(ul);
            height += 12;
        };
        var video_class = '';
        for(var i=jsonData.list.length - 1;i>=0;i--){
            if(ul.getElementsByTagName('li').length == 5){ //创建新的ul
                ul = document.createElement('ul');
                sina.$('d_list').insertBefore(ul,sina.$('d_list').firstChild);
                height += 12;
            };

            html = '';
            li = document.createElement('li');
            li.onmouseover = function(){this.className='hover'};
            li.onmouseout = function(){this.className=''};

            if(jsonData.list[i].channel){ //channel
                html += '<span class="c_chl">['
                if(jsonData.list[i].channel.url){
                    html += '<a href="' + jsonData.list[i].channel.url +'"' + (this.isAppleMobile?'':' target="_blank"') + '>' + jsonData.list[i].channel.title + '</a>';
                }else if(jsonData.list[i].channel.id){
                    html += '<a href="javascript:void(0)" onclick="newsList.channel.setChannel(\'' + jsonData.list[i].channel.cType +'\',\'' + jsonData.list[i].channel.id +'\');return false;">' + jsonData.list[i].channel.title + '</a>';
                }else{
                    html += jsonData.list[i].channel.title;
                };
                html += ']</span>';
            };
            video_class = '';
            if (jsonData.list[i].type == '3' || jsonData.list[i].type == '5') {
                video_class = 'class="videoNewsLeft" ';
            }
            html += '<span class="c_tit"><a '+video_class+'href="' + jsonData.list[i].url + '" target="_blank">' + this.search.showKey(jsonData.list[i].title) + '</a></span>';
            html += '<span class="c_time" s="' + jsonData.list[i].time + '">' + this.time.getTimeZoneTime(jsonData.list[i].time) + '</span>';

            if(ul.firstChild){
                ul.insertBefore(li,ul.firstChild);
            }else{
                ul.appendChild(li);
            };
            li.innerHTML = html;
            height += 24;
        };

        sina.$('d_list').style.marginTop = (-height) + 'px';

        //动作
        var sp = 3,st = 20,_st=10;
        while(height>=0){
            if(height <= 5){
                sp = 2;
                st = 10 * (7-height);
            };
            height -= sp;
            _st += st;
            setTimeout("sina.$('d_list').style.marginTop = '" + (-height) + "px'",_st);
        };

        this.limitList();
    },
    limitList : function(){
        var li = sina.$('d_list').getElementsByTagName('li');
        while(li.length>newsList.page.pageSize){
            var l = li[li.length-1];
            var u = l.parentNode;
            u.removeChild(l);
            if(u.getElementsByTagName('li').length==0){
                u.parentNode.removeChild(u);
            };
        };
    },
    showTxt : function(){ //显示列表
        var html = '';
        var sum = 0;
        var video_class = '';
        for(var i=0;i<jsonData.list.length;i++){
            if(sum==0){
                html += '<ul>';
            };
            html += '<li onmouseover="this.className=\'hover\'" onmouseout="this.className=\'\'">';
            if(jsonData.list[i].channel){ //channel
                html += '<span class="c_chl">['
                if(jsonData.list[i].channel.url){
                    html += '<a href="' + jsonData.list[i].channel.url +'" target="_blank">' + jsonData.list[i].channel.title + '</a>';
                }else if(jsonData.list[i].channel.id){
                    html += '<a href="javascript:void(0)" onclick="newsList.channel.setChannel(\'' + jsonData.list[i].channel.cType +'\',\'' + jsonData.list[i].channel.id +'\');return false;">' + jsonData.list[i].channel.title + '</a>';
                }else{
                    html += jsonData.list[i].channel.title;
                };
                html += ']</span>';
            };
            video_class = '';
            if (jsonData.list[i].type == '3' || jsonData.list[i].type == '5') {
                video_class = 'class="videoNewsLeft" ';
            }

            html += '<span class="c_tit"><a '+video_class+'href="' + jsonData.list[i].url + '" target="_blank">' + this.search.showKey(jsonData.list[i].title) + '</a></span>';
            html += '<span class="c_time" s="' + jsonData.list[i].time + '">' + this.time.getTimeZoneTime(jsonData.list[i].time) + '</span>';
            html += '</li>';
            sum ++;
            if(sum == 5){
                sum = 0;
                html += '</ul>';
            };
        };
        if(sum != 5){
            html += '</ul>';
        };

        html += this.page.getPageList();

        if(html == '</ul>'){
            var searchKeyEncoded = this.htmlEncode(newsList.search.key);
            html = '<div style="padding:100px 0 150px;text-align:center;font-size:14px;">按标题搜索未找到符合条件的新闻！<a href="http://search.sina.com.cn/?q='+ searchKeyEncoded +'&c=news"' + (this.isAppleMobile?'':' target="_blank"') + ' style="text-decoration:underline;">请点击这里按全文搜索更多 <span class="cF00">'+ searchKeyEncoded +'</span> 的相关新闻</a>，或 <a href="javascript:void(0)" onclick="newsList.search.clear();return false;" style="text-decoration:underline;">清除搜索条件</a>。</div>';
            newsList.autoReload.setAuto(false);
        };
        this.setHTML(html);
    },
    setHTML : function(str){
        var html = '<div class="d_tit">\
					<div class="d_tit_01">栏目</div>\
					<div class="d_tit_02">标题</div>\
					<div class="d_tit_03">时间</div>\
				</div>\
				<div style="overflow:hidden">\
				<div class="d_list_txt" id="d_list" style="width:100%;">';
        html += str;
        html += '</div></div>';
        sina.$('pL_Main').innerHTML = html;
    },
    saveCookie : function(){
        sina.writeCookie('newsList','c_'+ this.channel.userSet + '_ps_' + this.page.pageSize + '_tl_' + this.date.value + '_tp_' + this.type.value + '_ar_' + newsList.autoReload.cdsSize + '_ah_' + newsList.toolbar.autoHide,365*24); //c_(频道)_ps_(页数)_tl_(时限)_tp_(类型)_ar_(自动刷新时长)
    }
};

//工具条
newsList.toolbar = {
    height : 41,
    autoHide : false,
    _bodyHeight : 0,
    status : 'show',
    init : function(){
        var tempThis = this;
        sina.$('tool1_tit').onclick = sina.$('tool2_tit').onclick = function(){
            tempThis.openTool();
        };
        sina.$('tool1_tit').onmouseover = sina.$('tool2_tit').onmouseover = function(){
            this.className = 'hover';
        };
        sina.$('tool1_tit').onmouseout = sina.$('tool2_tit').onmouseout = function(){
            this.className = '';
        };

        //检测apple移动设备
        var testAppleMiddle = /\((iPhone|iPad|iPod)/i;
        if(testAppleMiddle.test(navigator.userAgent)){
            //if(typeof(window.ontouchstart) !== 'undefined'){ //支持触屏
            var iOSVer = navigator.userAgent.match(/OS (\d+)_/i);
            if(iOSVer){iOSVer = parseInt(iOSVer[1])}
            sina.$('autoHideToolBar').style.display = "none";
            this.iOSVer = iOSVer;

            setInterval(function(){tempThis._touchHeight()},100);
            if(this.iOSVer > 4){
                //iOS 5+
                sina.$('bottomBar').style.position = 'fixed';
                sina.$('bottomBar').style.bottom = '0px';
            }
        }else{
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            sina.$('vBody').style.overflowY = "scroll";
            sina.$('vBody').style.overflowX = "hidden";
            sina.$('vBody').style.paddingBottom = '0';
            sina.$('vBody').style.marginBottom = '41px';
            this._resetHeight();
            window.onresize = function(){
                tempThis._resetHeight();
            };

            this.changeCheckBox(this.autoHide);
            if(this.autoHide === true){
                this.hide(true); //直接隐藏
            };

            sina.$('autoHideToolBar').onclick = function(){
                tempThis.changeCheckBox();
                newsList.help.close();
                return false;
            };
            sina.addEvent(document,'mousemove',function(e){
                tempThis.mousemove(e);
            });
        };
    },
    _touchHeight : function(){
        if(this.iOSVer > 4){
            //iOS 5+
            sina.$('bottomBar').style.bottom = '0px';
        }else{
            sina.$('bottomBar').style.top = window.innerHeight + window.pageYOffset - 41 + 'px';
        }
    },
    mousemove : function(e){
        if(this.autoHide === false){return};
        e = window.event?event:e;
        var mouseY = e.clientY;
        var hotArea;
        if(this.status == 'hide'){//响应高度：隐藏时10，显示时60
            hotArea = 10;
        }else{
            hotArea = newsList.review.status === 'open'?220:60; //回顾打开时为220
        };
        if(this._bodyHeight - mouseY < hotArea){
            if(this.status == 'show'){return;};
            this.show();
        };
        if(this._bodyHeight - mouseY > hotArea){
            if(this.status == 'hide'){return;};
            this.hide();
        };
    },
    show : function(noAct){ //显示
        this.status = 'show';
        this.height = 41;
        if(noAct){//无动作
            sina.$('bottomBar').style.bottom = '-1px';
            sina.$('vBody').style.height = this._bodyHeight - 40 + 'px';
        }else{
            sina.extend.actPX(sina.$('bottomBar').style,'bottom',-36,-1,8);
            sina.extend.actPX(sina.$('vBody').style,'height',sina.$('vBody').offsetHeight,this._bodyHeight - this.height + 1,8);
        };
    },
    hide : function(noAct){ //显示
        this.status = 'hide';
        this.height = 5;
        if(noAct){//无动作
            sina.$('bottomBar').style.bottom = '-36px';
            sina.$('vBody').style.height = this._bodyHeight - 5 + 'px';
        }else{
            sina.extend.actPX(sina.$('bottomBar').style,'bottom',-1,-36,8);
            sina.extend.actPX(sina.$('vBody').style,'height',sina.$('vBody').offsetHeight,this._bodyHeight - 5,8);
        };
        newsList.review.close();
    },
    changeCheckBox : function(status){
        if(status !== true && status !== false){
            status = !this.autoHide;
            this.autoHide = status;
            newsList.saveCookie();
        };
        this.autoHide = status;
        sina.$('autoHideToolBar').className = status?'checked':'';
    },
    openTool : function(){
        var start = sina.$('tool_2').offsetWidth,end;
        if(this.toolStatus == 2){
            this.toolStatus = 1;
            end = 316;
            sina.$('tool_2').className = '';
        }else{
            this.toolStatus = 2;
            end = 764;
            sina.$('tool_2').className = 'open';
        };
        newsList.help.close();
        sina.extend.actPX(sina.$('tool_2').style,'width',start,end,80);
    },
    _resetHeight : function(force){//刷新高度
        if(this._bodyHeight == document.body.offsetHeight && !force){
            return;
        };
        this._bodyHeight = document.body.offsetHeight;
        sina.$('vBody').style.height = this._bodyHeight - this.height + 1 + 'px';
    }
};

newsList.autoReload = {
    auto : false,
    _timeout : null,
    cds : 0, //倒计时
    cdsSize : 60,
    init : function(){
        sina.$('reloadSwitch').onclick = function(){
            newsList.autoReload.clickCheck();
        };

        if(newsList.page.index == 1){
            this.setAuto(true);
        };

        sina.$('reloadButton').onclick = function(){
            newsList.autoReload.mReload();
        };

        this.showSize();
    },
    reset : function(){
        this.resetAuto();
        this.cdsSize = 60;
        this.showSize();
    },
    resetAuto : function(){
        if(newsList.page.index == 1 && newsList.order.value == '' && newsList.date.value.indexOf('-') == -1){
            this.setAuto(true);
        }else{
            this.setAuto(false);
        };
    },
    setCdsSize : function(value){
        this.cdsSize = value;
        this.cds = value;
        this.showSize();
        newsList.saveCookie();
    },
    showSize : function(){
        var html = '';
        if(this.cdsSize == 30){
            html += '<span class="selected">30秒</span> ';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.autoReload.setCdsSize(30);return false;">30秒</a> ';
        };
        if(this.cdsSize == 60){
            html += '<span class="selected">60秒</span> ';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.autoReload.setCdsSize(60);return false;">60秒</a> ';
        };
        if(this.cdsSize == 90){
            html += '<span class="selected">90秒</span> ';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.autoReload.setCdsSize(90);return false;">90秒</a> ';
        };
        sina.$('reloadTimeout').innerHTML = html;
    },
    clickCheck : function(){
        if(this.auto === true){
            this.setAuto(false);
        }else{
            this.setAuto(true);
        };
    },
    setAuto : function(value){
        this.auto = value;
        if(value === true){
            this.cds = this.cdsSize;
            this._countDown();
            sina.$('reloadSwitch').className = 'on';
        }else{
            clearTimeout(this._timeout);
            sina.$('countDownNum').innerHTML = '00';
            sina.$('reloadSwitch').className = 'off';
        };
    },
    mReload : function(){ //手动刷新
        if(newsList.order.value == '1'){
            newsList.page.index = 1;
            newsList.order.setOrder('');
            return;
        };
        if(newsList.page.index != 1){ //非第1页自动跳回第1页
            newsList.page.goTo(1);
            return;
        };
        clearTimeout(this._timeout);
        newsList.request('refurbish');
        sina.$('countDownNum').innerHTML = '00';
    },
    _countDown : function(){
        var tempThis = this;
        this.cds --;
        sina.$('countDownNum').innerHTML = this.cds>9?this.cds:'0' + this.cds;

        if(this.cds <= 0){
            this.mReload();
            return;
        };
        if(this.auto === true){
            clearTimeout(this._timeout);
            this._timeout = setTimeout(function(){tempThis._countDown()},1000);
        };
    }
};
newsList.page = {
    index : 1,
    pageSize : '60',
    pageCount : 1,
    count : 1,
    init : function(){
        if(this.index === ''){
            this.index = 1;
        };
        if(this.pageSize == ''){
            this.pageSize = '40';
        };
        this.showPageSize();
    },
    reset : function(){
        this.pageSize = '60';
        this.showPageSize();
        this.index = 1;
    },
    setCount : function(num){
        this.count = num;
        this.pageCount = Math.ceil(this.count/this.pageSize);
    },
    goTo : function(num){
        if(num < 0){return};
        if(num > this.pageCount){return};
        if(num != this.index){
            this.index = num;
            newsList.request();
        };
    },
    setPageSize : function(size){
        this.pageSize = size;
        newsList.page.index = 1;
        this.showPageSize();
        newsList.saveCookie();
        newsList.request(); //重新请求内容
    },
    showPageSize : function(){
        var html = '';
        if(this.pageSize === '40'){
            html += '<span class="selected">40条</span> ';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.page.setPageSize(\'40\');return false;">40条</a> ';
        };
        if(this.pageSize === '60'){
            html += '<span class="selected">60条</span> ';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.page.setPageSize(\'60\');return false;">60条</a> ';
        };
        if(this.pageSize === '80'){
            html += '<span class="selected">80条</span> ';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.page.setPageSize(\'80\');return false;">80条</a> ';
        };
        sina.$('pL_Limit').innerHTML = html;
    },
    getPageList : function(){
        if(this.pageCount <= 1){return ''};
        var sum = 1;
        var html = '<div class="pagebox">';
        if(this.index == 1){
            html += ' <span class="pagebox_pre_nolink">上一页</span>';
        }else{
            html += ' <span class="pagebox_pre"><a href="javascript:void(0)" onclick="newsList.page.pre();return false;">上一页</a></span>';
        };
        if(this.pageCount > 11 && this.index > 6){
            html += ' <span class="pagebox_num"><a href="javascript:void(0)" onclick="newsList.page.goTo(1);return false;">1</a></span> <span class="pagebox_num_ellipsis">..</span>';
        };

        var right = this.pageCount - this.index + 1;
        if(right > 6){
            right = 6;
        };
        var index = this.index - 11 + right;
        if(index<=0){index = 1};
        while(sum<12){
            if(sum > this.pageCount){break;};
            if(index==this.index){
                html += ' <span class="pagebox_num_nonce">' + index + '</span>';
            }else{
                html += ' <span class="pagebox_num"><a href="javascript:void(0)" onclick="newsList.page.goTo(' + index + ');return false;">' + index + '</a></span>';
            };
            sum++;
            index ++;
        };
        if(this.pageCount > 11 && this.pageCount - this.index > 5){
            html += ' <span class="pagebox_num_ellipsis">..</span> <span class="pagebox_num"><a href="javascript:void(0)" onclick="newsList.page.goTo(' + (this.pageCount) + ');return false;">' + (this.pageCount) + '</a></span>';
        };
        if(this.index == this.pageCount){
            html += ' <span class="pagebox_pre_nolink">下一页</span>';
        }else{
            html += ' <span class="pagebox_pre"><a href="javascript:void(0)" onclick="newsList.page.next();return false;">下一页</a></span>';
        };
        return html;
    },
    pre : function(){
        this.goTo(parseInt(this.index) - 1);
    },
    next : function(){
        this.goTo(parseInt(this.index) + 1);
    }
};
newsList.search = {
    key : '',
    init : function(){
        this.clearDiv = document.createElement('div');
        this.clearDiv.id = 'searchClear';
        this.clearDiv.innerHTML = '<a href="javascript:void(0)" onclick="newsList.search.clear();return false;" title="清除">×</a>';
        document.searchForm.appendChild(this.clearDiv);

        document.searchForm.onsubmit = function(){

            if(this.type.value === 'content'){
                if(this.key.value === '输入关键字，多关键字以空格分隔' || this.key.value === ''){
                    window.open('http://search.sina.com.cn/');
                }else{
                    document.searchForm.target = "_blank";
                    document.searchIask.q.value = this.key.value;
                    document.searchIask.time.value = sina.$('dateLimitSelect').value.substr(0,1);
                    document.searchIask.range.value = "all";
                    document.searchIask.submit();
                };
            }else{

                if(this.key.value === '输入关键字，多关键字以空格分隔' || this.key.value === ''){
                    window.open('http://search.sina.com.cn/');
                }else{
                    document.searchForm.target = "_blank";
                    document.searchIask.q.value = this.key.value;
                    document.searchIask.time.value = sina.$('dateLimitSelect').value.substr(0,1);
                    document.searchIask.range.value = "title";
                    document.searchIask.submit();
                };
                //newsList.search.setKey(this.key.value);
            };
            return false;
        };
        document.searchForm.key.onfocus = function(){if(this.value=='输入关键字，多关键字以空格分隔'){this.value='';};this.style.color = '#333';};
        document.searchForm.key.onblur = function(){if(this.value==''){this.value='输入关键字，多关键字以空格分隔';this.style.color = '#999';}};
        if(this.key !== ''){
            document.searchForm.key.value = this.key;
            this.clearDiv.style.display = "block";
            sina.$('searchType').setIndex(0);
        };
    },
    reset : function(){
        this.key = '';
        document.searchForm.key.value = '输入关键字，多关键字以空格分隔';
        this.clearDiv.style.display = "none";
        sina.$('searchType').setIndex(0);
    },
    clear : function(){
        this.reset();
        newsList.request();
    },
    showKey : function(str){ //高亮Key
        if(str == ""){return "";};
        if(this.key == ""){return str};
        var keyList = this.key;
        keyList = keyList.replace(/(\!|\?|\:|\(|\)|\[|\]|\+|\*|\.|\{|\}|\|)/g,'\\$1');
        keyList = keyList.replace(/(\s+|　+)/g,'|');

        str = str.replace(new RegExp("(" + keyList + ")","ig"),"<span style=\"color:#f00;\">$1</span>");
        return str;
    },
    setKey : function(key){
        if(key == '输入关键字，多关键字以空格分隔'){key=''};
        //
        newsList.page.index = 1;
        this.key = key;
        if(this.key !== ''){this.clearDiv.style.display = "block";}
        newsList.review.toToday(); //返回今天 包含newsList.request()
        //newsList.request();
        //;
    }
};
newsList.order = {
    value : '', //排序方式 1 为正序，空为倒序
    reset : function(){
        this.value = '';
        this.showOrderHTML();
    },
    init : function(){
        this.showOrderHTML();
    },
    setOrder : function(order){
        this.value = order;
        this.showOrderHTML();
        newsList.request(); //重新请求内容
    },
    showOrderHTML : function(){
        var html = '<span class="c777">排序：</span>';
        if(this.value === ''){
            html += '<span class="selected">最新</span> <a href="javascript:void(0)" onclick="newsList.order.setOrder(\'1\');return false;">最早</a>';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.order.setOrder(\'\');return false;">最新</a> <span class="selected">最早</span>';
        };
        sina.$('pL_Order').innerHTML = html;
    }
};
newsList.date = { //按时间
    value : '', //日期时间： now - 当天，day - 近24小时，week - 近一周，month - 近一月
    init : function(){
        //验证
        if(this.value != '' && this.value != 'day' && this.value != 'month' && this.value != 'week' && this.value != 'now'){
            if(!(/^\d{4}\-\d{2}\-\d{2}$/).test(this.value)){ //不是日期格式
                this.value = 'day';
            };
        };

        this.showHTML();

        sina.$('dateLimitSelect').onchange = function(){
            newsList.date.set(this.value,true,true); //只设置，不请求
        };
    },
    reset : function(){
        this.value = '';
        this.showHTML();
        newsList.review.set(this.value);
    },
    set : function(type,noSetReview,noRequest){

        this.value = type;

        this.showHTML();
        newsList.page.index = 1;
        newsList.saveCookie();

        if(!noSetReview){
            newsList.review.set(this.value);
        };
        if(!noRequest){
            newsList.request(); //重新请求内容
        };
        newsList.help.close();
    },
    showHTML : function(){
        if(sina.$('dateLimitSelect').value != this.value){
            sina.$('dateLimitSelect').value = this.value;
            if(sina.$('dateLimitSelect').selectedIndex == -1){sina.$('dateLimitSelect').selectedIndex = 0};
            sina.$('dateLimitSelect').setIndex(sina.$('dateLimitSelect').selectedIndex);
        };
    }
};
newsList.type = {
    value : '', //1-文字，2-图文，3-视频，4-音频（目前没有用到），空为全部
    init : function(){
        if(this.value !== '' && this.value !== "1" && this.value !== "2" && this.value !== "3" && this.value !== "4"){
            this.value = '';
        };
        this.showHTML();
    },
    reset : function(){
        this.value = '';
        this.showHTML();
    },
    setType : function(type){
        this.value = type;
        this.showHTML();
        newsList.page.index = 1;
        newsList.search.reset();
        newsList.saveCookie();
        newsList.request(); //重新请求内容
    },
    showHTML : function(){
        var html = '';
        if(this.value === ''){
            html += '<span class="selected">全部</span>';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.type.setType(\'\');return false;">全部</a>';
        };
        /*if(this.value === '1'){
            html += '<span class="selected">文字</span>';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.type.setType(\'1\');return false;">文字</a>';
        };*/
        if(this.value === '2'){
            html += '<span class="selected">图片</span>';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.type.setType(\'2\');return false;">图片</a>';
        };
        if(this.value === '3'){
            html += '<span class="selected">视频</span>';
        }else{
            html += '<a href="javascript:void(0)" onclick="newsList.type.setType(\'3\');return false;">视频</a>';
        };
        sina.$('newsType').innerHTML = html;
    }
};
newsList.channel = {
    objs : [],
    tempObj : null,
    col : '',
    ch : '',
    spec : '',
    userSet : '',
    initId : '', //从Cookie恢复回的ID列表
    allId : '', //全部时使用的id
    init : function(){
        //取出所有a，压入数组，防止a数量发生变化时出错
        var temp = sina.$('channelList').getElementsByTagName('a');
        for(var i=0;i<temp.length;i++){
            this.objs.push(temp[i]);
        };

        //hash信息
        this.initId = this.col + ',' + this.ch + ',' + this.spec;
        if(this.initId == ',,'){
            this.initId = '';
        };

        if(this.initId == ''){
            this.initId = this.userSet; //cookie信息
        };

        for(var i=0;i<this.objs.length;i++){
            if(this.objs[i].getAttribute('s_type') == 'all'){
                this.allId = this.objs[i].getAttribute('s_id');
            };
            this.formatObj(this.objs[i]);
        };
        this.reCountId();
    },
    reset : function(){
        this.col = '';
        this.ch = '';
        this.spec = '';
        for(var i=0;i<this.objs.length;i++){
            if(this.objs[i].s_type == 'all'){
                this.objs[i].checked = true;
                this.objs[i].className = 'checked';
            }else{
                this.objs[i].checked = false;
                this.objs[i].className = '';
            };
        };
        this.userSet = '';
    },
    setTempChannel : function(){
        var obj=null,aObj;
        if(this.tempObj){
            this.tempObj.parentNode.removeChild(this.tempObj);
            this.tempObj = null;
        };
        if(jsonData.path.length > 0){
            for(var i=0;i<this.objs.length;i++){
                this.objs[i].setStatus(false);
                if(this.objs[i].s_id == jsonData.path[jsonData.path.length-1].id){
                    obj = this.objs[i];
                }
            };
            if(!obj){
                /*var tempTitle = "";
                for(var i=0;i<jsonData.path.length;i++){
                    tempTitle += tempTitle == ''?'':' &gt; ';
                    tempTitle += jsonData.path[i].title;
                };

                aObj = document.createElement("a");
                aObj.href = 'javascript:void(0)';
                aObj.id = 'info';
                aObj.innerHTML = tempTitle;

                sina.$('channelCheckboxs').appendChild(aObj);

                aObj.setAttribute("s_id",jsonData.path[jsonData.path.length-1].id);
                aObj.setAttribute("s_type",jsonData.path[jsonData.path.length-1].cType);

                this.tempObj = aObj;

                this.formatObj(aObj);

                aObj.setStatus(true);*/

            }else{
                obj.setStatus(true);
            };
        };
    },
    reCountId : function(){
        this.col = this.ch = this.spec = '';
        for(var i=0;i<this.objs.length;i++){
            if(this.objs[i].checked === true && this.objs[i].s_type != 'all'){
                if(this[this.objs[i].s_type] !== ''){
                    this[this.objs[i].s_type] += ',';
                };
                this[this.objs[i].s_type] += this.objs[i].s_id;
            }
        };
    },
    setChannel : function(type,id){
        this.col = this.ch = this.spec = '';
        this[type] = id;
        newsList.search.reset(); //搜索重置
        newsList.page.index = 1; //重置页数
        newsList.request();
    },
    formatObj : function(obj){
        var tempThis = this;
        obj.s_id = obj.getAttribute('s_id');
        obj.s_type = obj.getAttribute('s_type');

        if(this.initId !== ''){
            var idReg = new RegExp('(^|,)' + obj.s_id + '(,|$)');

            if(idReg.test(this.initId)){
                obj.className = 'checked';
            }else{
                obj.className = '';
            };
        };
        if(obj.className == 'checked'){
            obj.checked = true;
        }else{
            obj.checked = false;
        };
        obj.onclick = function(){
            if(this.checked === true){
                if(this.s_type == 'all'){return}; //全部不能取消

                this.checked = false;
                this.className = '';
            }else{
                this.checked = true;
                this.className = 'checked';
            };
            tempThis.onuserchange(this); //用户操作
            return false;
        };
        obj.setStatus = function(status){
            if(status){
                this.checked = true;
                this.className = 'checked';
            }else{
                this.checked = false;
                this.className = '';
            };
        };
    },
    onuserchange : function(obj){
        var allObj;
        this.col = this.ch = this.spec = this.userSet = '';
        if(obj.s_type == 'all'){ //点选全部
            if(obj.checked === true){
                for(var i=0;i<this.objs.length;i++){
                    if(this.objs[i].s_type != 'all'){
                        this.objs[i].setStatus(false);
                    };
                };
            };
            this.userSet = '';
        }else{ //点选其它
            //生成新串，并找到all对象
            for(var i=0;i<this.objs.length;i++){
                if(this.objs[i].checked === true && this.objs[i].s_type != 'all'){
                    if(this[this.objs[i].s_type] !== ''){
                        this[this.objs[i].s_type] += ',';
                    };
                    this[this.objs[i].s_type] += this.objs[i].s_id;
                    if(this.userSet !== ''){
                        this.userSet += ',';
                    };
                    this.userSet += this.objs[i].s_id;
                }else if(this.objs[i].s_type == 'all'){
                    allObj = this.objs[i];
                };
            };
            //全为空则选中全部
            if(this.col + this.ch + this.spec == ''){
                allObj.setStatus(true);
            }else{
                allObj.setStatus(false);
            };
        };
        newsList.search.reset(); //搜索重置
        newsList.page.index = 1; //重置页数
        newsList.request(); //重新请求内容
        newsList.saveCookie();
        newsList.help.close();
    }

};

newsList.time = { //时间对象
    timeAPI : "http://counter.sina.com.cn/time?fm=JS&vn=ServerSeconds&fn=b",//时间服务器接口
    maxDifference : 60, //允许最大误差(秒)
    year : 2008, //年
    month : 1, //月
    date : 1, //日
    hours : 0, //小时
    minutes : 0, //分钟
    seconds : 0, //秒
    monthTwoBit : 1, //月 两位
    dateTwoBit : 1, //日 两位
    hoursTwoBit : "00",//小时 两位
    minutesTwoBit : "00",//分钟 两位
    secondsTwoBit : "00", //秒 两位
    dateObj : null, //Date 对象
    _tryNum : 0,
    timeZone : 8,
    init : function(){ //开始执行
        var tempThis = this;
        //首先使用以系统时间
        this._systemObj = new Date();
        this.dateObj = this._systemObj;
        //this._analyse();
        this._responeNet((new Date()).getTime()/1000);
        this._listen();
        this._listenTimeObj = setInterval(function(){tempThis._listen()},200);

        /*var tempThis = this;

        //时区更改事件
        sina.$('date_typeSelect').onchange = function(){
            tempThis.setTimeZone(this.value);
        };
        this.setTimeZone(sina.$('date_typeSelect').value);*/
    },
    reset : function(){
        this.setTimeZoneIndex(0);
    },
    setTimeZoneIndex : function(num){
        sina.$('date_typeSelect').setIndex(num);
        sina.$('date_typeSelect').onchange();
    },
    _systemObj : {},
    _listenTimeObj : null,
    _difference : 0,//秒
    _requestNet : function(){ //请求网络时间
        var thisTemp = this;
        this._tryNum ++;
        if(this._tryNum >= 3){return};
        sina._getJsData(this.timeAPI+'&r='+Math.random(),function(){thisTemp._responeNet()});
    },
    setServerTime : function(s){ //设置服务器时间
        this._responeNet(s);
    },
    setTimeZone : function(value){
        this.timeZone = value;
        if(sina.$('timeZoneAlert')){
            sina.$('timeZoneAlert').innerHTML = sina.$('date_typeSelect').options[sina.$('date_typeSelect').selectedIndex].innerHTML;
        };
        this.resetListTime();
        newsList.saveCookie();
    },
    resetListTime : function(){ //重设新闻列表中的时间
        var spanAll = sina.$('d_list').getElementsByTagName('span');
        for(var i=0;i<spanAll.length;i++){
            if(spanAll[i].className == 'c_time'){
                spanAll[i].innerHTML = this.getTimeZoneTime(spanAll[i].getAttribute('s'));
            };
        };
    },
    _responeNet : function(s){ //请求网络时间回应
        if(s){
            ServerSeconds = s;
        };
        if(typeof(ServerSeconds) == 'undefined'){
            this._responeNet();
            return;
        };
        this.dateObj.setTime(ServerSeconds * 1000);

        this._difference = ServerSeconds - (new Date()).getTime()/1000; //服务器时间与系统时间差(秒)
        this._tryNum = 0;
        //this._analyse();
    },
    _listen : function(){ //监听时间变化
        var tempObj = new Date();
        if(tempObj.getSeconds() != this._systemObj.getSeconds()){
            this._systemObj = tempObj;
            this.dateObj.setTime(this.dateObj.getTime()+1000); //加1秒
        };
        if(Math.abs((this.dateObj.getTime() - this._systemObj.getTime())/1000 - this._difference) >= this.maxDifference){
            this._requestNet();
        };
        this._analyse();
    },
    _analyse : function(){ //分解时间
        var seconds = this.dateObj.getTime();
        //时区
        if(this.timeZone == 'loc'){
            seconds = (new Date()).getTime(); //使用本机时间
        }else{
            seconds += (this.timeZone - 8) * 3600000; //服务器时间为+8，所以-8
        };
        var tempTime = new Date(seconds);

        this.year = tempTime.getFullYear();
        this.month = tempTime.getMonth() + 1;
        this.date = tempTime.getDate();
        this.hours = tempTime.getHours();
        this.minutes = tempTime.getMinutes();
        this.seconds = tempTime.getSeconds();

        //两位
        this.monthTwoBit = this.month > 9?this.month.toString():"0" + this.month;
        this.dateTwoBit = this.date > 9?this.date.toString():"0" + this.date;
        this.hoursTwoBit = this.hours > 9?this.hours.toString():"0" + this.hours;
        this.minutesTwoBit = this.minutes > 9?this.minutes.toString():"0" + this.minutes;
        this.secondsTwoBit = this.seconds > 9?this.seconds.toString():"0" + this.seconds;

        var days = ['日','一','二','三','四','五','六'];
        this.weekday = '星期' + days[tempTime.getDay()];

        //显示

        /*var date_time = this.hoursTwoBit + ':' + this.minutesTwoBit;
        if(this.date_time != date_time){

            var nl = this.getNongLi(tempTime);
            sina.$('date_time').innerHTML = date_time;
            this.date_time = date_time;

            sina.$('date_status').innerHTML = this.monthTwoBit + '月' + this.dateTwoBit + '日 ' + this.weekday + ' ' + nl.status;
        }*/

    },
    getTimeZoneTime : function(s){
        if(typeof(s) === 'undefined'){
            s = this.dateObj.getTime();
        }else{
            s = s*1000;
        };
        if(this.timeZone != 'loc'){
            s += (this.timeZone - 8) * 3600000; //服务器时间为+8，所以-8
        };

        var tempTime = new Date(s);
        var year = tempTime.getFullYear();
        var month = tempTime.getMonth() + 1;
        var date = tempTime.getDate();
        var hours = tempTime.getHours();
        var minutes = tempTime.getMinutes();
        var seconds = tempTime.getSeconds();

        //两位
        var monthTwoBit = month > 9?month.toString():"0" + month;
        var dateTwoBit = date > 9?date.toString():"0" + date;
        var hoursTwoBit = hours > 9?hours.toString():"0" + hours;
        var minutesTwoBit = minutes > 9?minutes.toString():"0" + minutes;
        var secondsTwoBit = seconds > 9?seconds.toString():"0" + seconds;

        var str = '';
        if(this.year != year){
            str = year + '-';
        };

        return str + monthTwoBit + '-' + dateTwoBit + ' ' + hoursTwoBit + ':' + minutesTwoBit;
    }
};
newsList.review = {
    startDate : "1999-05-26", //开始时间
    startDateObj : null,
    newDate : '2010-01-01', //新版开始时间
    newDateObj : null,
    oldUrlCode : 'http://news.sina.com.cn/old1000/news1000_$year$month$day.shtml',
    selectDate : "",
    selectDateObj : new Date(),
    showDateObj : null,
    nowDateObj : new Date(),
    yearSelectId : 'yearSelect',
    monthStatusId : 'monthSelect',
    preMonthId : 'preMonth',
    nextMonthId : 'nextMonth',
    dataTableId : 'dateTable',
    status : 'close',
    $ : function(id){return document.getElementById(id)},
    init : function(){

        var tempThis = this;
        //开始日期
        var hDate = this.startDate.match(/(\d{4})-0?(\d{1,2})-0?(\d{1,2})/);
        if(!hDate){throw "日期格式不正确！";};
        this.startDateObj = new Date(parseInt(hDate[1]),parseInt(hDate[2])-1,parseInt(hDate[3]));

        //新版开始时间
        hDate = this.newDate.match(/(\d{4})-0?(\d{1,2})-0?(\d{1,2})/);
        if(!hDate){throw "日期格式不正确！";};
        this.newDateObj = new Date(parseInt(hDate[1]),parseInt(hDate[2])-1,parseInt(hDate[3]));

        if(this.nowDateObj < this.startDateObj){
            return;
        };
        //选中日期
        if(this.selectDate){
            var hDate = this.selectDate.match(/(\d{4})-0?(\d{1,2})-0?(\d{1,2})/);
            if(!hDate){throw "日期格式不正确！";};
            this.selectDateObj = new Date(parseInt(hDate[1]),parseInt(hDate[2])-1,parseInt(hDate[3]));
        };
        this.showDateObj = new Date(this.selectDateObj);

        this.$(this.yearSelectId).innerHTML = "";
        for(var i=this.startDateObj.getFullYear();i<=this.nowDateObj.getFullYear();i++){
            var option = new Option();
            this.$(this.yearSelectId).options.add(option);
            option.innerHTML = i + '年';
            option.value = i;
        };
        this.$(this.yearSelectId).onchange = this.$(this.yearSelectId).onclick = function(){
            tempThis.setYear(this.value);
        };
        this.$(this.monthStatusId).onchange = this.$(this.monthStatusId).onclick = function(){
            tempThis.setMonth(this.value);
        };
        this.$(this.preMonthId).onclick = function(){
            tempThis.preMonth();
            this.blur();
            return false;
        };
        this.$(this.nextMonthId).onclick = function(){
            tempThis.nextMonth();
            this.blur();
            return false;
        };

        this.$('dateListButton').onclick = function(){
            if(tempThis.status == 'open'){
                tempThis.close();
            }else{
                tempThis.open();
            };
        };

        this.show();
    },
    setNowDateObj : function(date){
        if(date.getFullYear() != this.nowDateObj.getFullYear()){
            this.$(this.yearSelectId).innerHTML = "";
            for(var i=this.startDateObj.getFullYear();i<=this.nowDateObj.getFullYear();i++){
                var option = new Option();
                this.$(this.yearSelectId).options.add(option);
                option.innerHTML = i + '年';
                option.value = i;
            };
        };
        if(date.getMonth() != this.nowDateObj.getMonth() || date.getDate() != this.nowDateObj.getDate()){
            this.show();
        };
        this.nowDateObj = date;
    },
    open : function(){
        var tempThis = this;
        this.$('reviewBlk').style.height = 0;
        this.$('reviewBlk').style.top = '10px';
        sina.extend.actPX(this.$('reviewBlk').style,'height',0,180,30);
        sina.extend.actPX(this.$('reviewBlk').style,'top',10,-170,30);
        this.$('reviewBlk').style.display = 'block';

        this.status = "open";
        this.tempFunction = function(e){tempThis.clickClose(e)};
        sina.addEvent(document,"click",this.tempFunction);
        newsList.help.close();
    },
    clickClose : function(e){
        var thisObj = e.target?e.target:event.srcElement;

        var parentDiv = this.$('reviewBlk');
        var buttonDiv = this.$('dateListButton');
        do{
            if(thisObj == parentDiv || thisObj == buttonDiv){return};
            if(thisObj.tagName == "BODY"){break;};
            thisObj = thisObj.parentNode;
        }while(thisObj.parentNode);

        this.close();
    },
    close : function(){

        sina.extend.actPX(this.$('reviewBlk').style,'height',180,0,30);
        sina.extend.actPX(this.$('reviewBlk').style,'top',-170,10,30,function(){sina.$('reviewBlk').style.display = 'none';});
        //sina.extend.hide(this.$('reviewBlk'),100);

        this.status = "close";
        try{
            sina.delEvent(document,"click",this.tempFunction)
        }catch(e){};
    },
    setYear : function(year){
        if(year == this.showDateObj.getFullYear()){
            return;
        };
        this.showDateObj.setYear(year);
        if(this.showDateObj < this.startDateObj){
            this.showDateObj = new Date(this.startDateObj);
        };
        if(this.showDateObj > this.nowDateObj){
            this.showDateObj = new Date(this.nowDateObj);
        };
        this.show();
    },
    setMonth : function(month){
        if(month - 1 == this.showDateObj.getMonth()){
            return;
        };

        this.showDateObj.setMonth(month - 1);
        this.show();
    },
    preMonth : function(){
        this.showDateObj.setMonth(this.showDateObj.getMonth() - 1);
        this.show();
    },
    nextMonth : function(){
        this.showDateObj.setMonth(this.showDateObj.getMonth() + 1);
        this.show();
    },
    show : function(date){
        if(date){
            var hDate = date.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
            if(!hDate){throw "日期格式不正确！";};
            this.showDateObj = new Date(parseInt(hDate[1]),parseInt(hDate[2])-1,parseInt(hDate[3]));
        };

        var year = this.showDateObj.getFullYear();
        var month = this.showDateObj.getMonth();
        var day = this.showDateObj.getDate();

        var isToday = this.selectDateObj.getFullYear() == this.nowDateObj.getFullYear() && this.selectDateObj.getMonth() == this.nowDateObj.getMonth() && this.selectDateObj.getDate() == this.nowDateObj.getDate();//是否今日


        if(year == this.startDateObj.getFullYear() && month == this.startDateObj.getMonth()){
            this.$(this.preMonthId).style.visibility = 'hidden';
        }else{
            this.$(this.preMonthId).style.visibility = 'inherit';
        };
        if(year == this.nowDateObj.getFullYear() && month == this.nowDateObj.getMonth()){
            this.$(this.nextMonthId).style.visibility = 'hidden';
        }else{
            this.$(this.nextMonthId).style.visibility = 'inherit';
        };
        this.$(this.yearSelectId).value = this.showDateObj.getFullYear();

        //month select
        var minMonth = 1,maxMonth = 12;
        if(year == this.startDateObj.getFullYear()){
            minMonth = this.startDateObj.getMonth() + 1;
        };
        if(year == this.nowDateObj.getFullYear()){
            maxMonth = this.nowDateObj.getMonth() + 1;
        };

        this.$(this.monthStatusId).innerHTML = '';
        for(var i=minMonth;i<=maxMonth;i++){
            var tmpOption = new Option();
            this.$(this.monthStatusId).options.add(tmpOption);
            tmpOption.innerHTML = i+'月';
            tmpOption.value = i;
        };
        this.$(this.monthStatusId).value = this.showDateObj.getMonth() + 1;

        var forinDay = new Date(year,month,1);
        var sum;
        var count = sum = forinDay.getDay();
        var tableHTML = '<table cellpadding="0" cellspacing="1" border="0"><tr>';
        for(var i=0;i<sum;i++){
            tableHTML += '<td>&nbsp;</td>'; //补空
        };
        while(forinDay.getMonth() == month){
            if(sum==7){
                tableHTML += '</tr><tr>';
                sum = 0;
            };
            sum ++;
            count ++;
            if(forinDay < this.startDateObj || forinDay > this.nowDateObj){
                tableHTML += '<td><span>' + forinDay.getDate() + '</span></td>';
            }else{

                if(year == this.selectDateObj.getFullYear() && month == this.selectDateObj.getMonth() && forinDay.getDate() == this.selectDateObj.getDate()){
                    tableHTML += '<td><span class="selected">' + forinDay.getDate() + '</span></td>'; //选中日
                }else if(year == this.nowDateObj.getFullYear() && month == this.nowDateObj.getMonth() && forinDay.getDate() == this.nowDateObj.getDate()){
                    tableHTML += '<td><a href="javascript:void(0)" onclick="newsList.review.click('+ year +','+ month +','+ forinDay.getDate() +',true);return false;" class="today">' + forinDay.getDate() + '</a></td>'; //今天
                }else{
                    tableHTML += '<td><a href="javascript:void(0)" onclick="newsList.review.click('+ year +','+ month +','+ forinDay.getDate() +');return false;">' + forinDay.getDate() + '</a></td>'; //普通
                };

            };

            forinDay.setDate(forinDay.getDate()+1);
        };
        for(var i=0;i<42-count;i++){
            if(sum==7){
                tableHTML += '</tr><tr>';
                sum = 0;
            };
            sum ++;
            tableHTML += '<td>&nbsp;</td>'; //补空
        };
        tableHTML += "</tr></table>";
        this.$(this.dataTableId).innerHTML = tableHTML;

        if(isToday === false){
            var year = this.selectDateObj.getFullYear();
            var month = this.selectDateObj.getMonth() + 1;
            var day = this.selectDateObj.getDate();
            sina.$('dateListButton').innerHTML = year + '-' + (month<10?'0'+month:month) + '-' + (day<10?'0'+day:day);
        }else{
            sina.$('dateListButton').innerHTML = '往日回顾';
        };

    },
    set : function(value){
        if((/(\d{4})-(\d{1,2})-(\d{1,2})/).test(value)){
            //跳转到指定日期
            var hDate = this.selectDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
            if(!hDate){throw "日期格式不正确！";};
            this.selectDateObj = new Date(parseInt(hDate[1]),parseInt(hDate[2])-1,parseInt(hDate[3]));
            this.showDateObj = new Date(this.selectDateObj);
        }else{
            //跳转到当前日期
            this.selectDateObj = new Date(this.nowDateObj);
            this.showDateObj = new Date(this.selectDateObj);
        };
        this.show();
    },
    click : function(year,month,date,isToday){
        if(this.onclick){
            this.onclick(year,month+1,date,isToday);
        };
        this.selectDateObj = new Date(year,month,date);
        this.show();
    },
    toToday : function(){ //返回当天
        var day = new Date();
        var year = day.getFullYear();
        var month = day.getMonth();
        var date = day.getDate();
        this.onclick(year,month+1,date,true);

        this.selectDateObj = new Date(year,month,date);
        this.showDateObj = new Date(year,month,date);
        this.show();
    },
    preDay : function(){ //打开前一天
        var day = new Date(this.selectDateObj.getTime() - 24 * 60 * 60 * 1000);
        var year = day.getFullYear();
        var month = day.getMonth();
        var date = day.getDate();
        var isToday = false;
        if(year == this.nowDateObj.getFullYear() && month == this.nowDateObj.getMonth() && date == this.nowDateObj.getDate()){
            isToday = true;
        };
        this.onclick(year,month+1,date,isToday);
        if(year>=2010){ //2010年以前不使用此系统
            this.selectDateObj = new Date(year,month,date);
            this.showDateObj = new Date(year,month,date);
            this.show();

        };
    },
    nextDay : function(){ //打开后一天
        var day = new Date(this.selectDateObj.getTime() + 24 * 60 * 60 * 1000);
        var year = day.getFullYear();
        var month = day.getMonth();
        var date = day.getDate();
        var isToday = false;
        if(year == this.nowDateObj.getFullYear() && month == this.nowDateObj.getMonth() && date == this.nowDateObj.getDate()){
            isToday = true;
        };
        this.onclick(year,month+1,date,isToday);

        if(year>=2010){ //2010年以前不使用此系统
            this.selectDateObj = new Date(year,month,date);
            this.showDateObj = new Date(year,month,date);
            this.show();
        };
    },
    onclick : function(y,m,d,isToday){ //回顾
        var d_m = m<10?'0'+m:m;
        var d_d = d<10?'0'+d:d;
        var date = '';
        var clkDateObj = new Date(y,m-1,d);
        var opUrl = this.oldUrlCode;

        if(clkDateObj < this.newDateObj){
            //旧版
            if(this.oldUrlCode.indexOf('http://news.sina.com.cn/old1000/news1000_') !== false){ //修正总回顾中的bug
                if(('' + y + d_m >= 199908) && ('' + y + d_m <= 200101) && ('' + y + d_m  != 200001)){
                    //199908 - 200101 使用1位月日，除2000-01
                    opUrl = opUrl.replace(/\$year/g,y);
                    opUrl = opUrl.replace(/\$month/g,m);
                    opUrl = opUrl.replace(/\$day/g,d);
                }else{
                    opUrl = opUrl.replace(/\$year/g,y);
                    opUrl = opUrl.replace(/\$month/g,d_m);
                    opUrl = opUrl.replace(/\$day/g,d_d);
                };
            };
            window.open(opUrl);
        }else{;
            //新版
            if(isToday){
                newsList.date.set(sina.$('dateLimitSelect').value,true);
            }else{
                newsList.search.reset(); //清除搜索
                newsList.date.set(y + '-' + d_m + '-' + d_d,true);
            };
        };
        this.close();
    }
};

newsList.help = {
    status : 'close',
    obj : null,
    init : function(){
        var status = sina.readCookie('newsListHelp');
        if(status == '0'){
            this.status = 'close';
        }else{
            this.status = 'open';
        };
        this.setStatus(this.status);
    },
    setStatus : function(status){
        var tempThis = this;
        if(status == 'open'){
            setTimeout(function(){tempThis.open()},1000);
        }else{
            this.close();
        };
    },
    create : function(){
        this.obj = document.createElement('div');
        this.obj.className = 'helpLayer';
        sina.$('tool_layers').appendChild(this.obj);
        this.obj.innerHTML = '<div id="hl_cont">这里可以按需求定制新闻</div><a href="javascript:void(0)" class="close" onclick="newsList.help.close()"></a><div id="hl_arr"></div>';
    },
    open : function(){
        if(!this.obj){
            this.create();
        };
        var left = Math.ceil((document.body.offsetWidth - 950)/2) - 10;
        if(left < 0){
            left = 0;
        }else if(left > 140){
            left = 140;
        };

        this.obj.style.left = '-' + left + 'px';
        sina.$('hl_arr').style.left = (left+10) + 'px';

        sina.extend.show(this.obj);
    },
    close : function(){
        if(!this.obj){
            return;
        };
        sina.extend.hide(this.obj);
        sina.writeCookie('newsListHelp',0,24*30);
    }
};
newsList.iPad = {
    x : 0,
    y : 0,
    lastX : 0,
    lastY : 0,
    status : 'ok',
    alertStatus : 'close',
    init : function(){
        if(!/\((iPhone|iPad|iPod)/i.test(navigator.userAgent)){return};


        sina.addEvent(window,'load',function(){setTimeout('window.scrollTo(0,0)'),500});

        var tempThis = this;

        //new css
        var iPadCSS = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(iPadCSS);
        iPadCSS.textContent = '.secondaryHeader{background:none!important;}\
a{text-decoration:none!important;}\
#pL_Title{line-height:50px;height:50px;}\
.iPadAlert{width:104px;height:120px;padding:60px 20px 0 33px;line-height:20px;background:url(http://www.sinaimg.cn/dy/deco/2010/0529/touch.gif) no-repeat 0 0;text-align:center;color:#333;position:absolute;}\
.wrap{zoom:1.2;}\
.bB_cont{margin-left:30px;width:950px;}\
.iPadAlertPage{width:200px;text-align:center;color:#333;position:absolute;font-size:20px;padding:20px 0;border:2px solid #999;background:#ccc;}\
.searchSubmit{width:auto;color:#000;}\
		';

        var altNum = sina.readCookie('touchAlt');
        if(altNum != 'no'){
            if(altNum == ''){altNum = 1};
            if(altNum <= 3){
                this.showAlert();
                altNum ++;
                sina.writeCookie('touchAlt',altNum,24 * 30);
                setTimeout(function(){tempThis.hideAlert()},15000);
            }
        };

        sina.addEvent(sina.$('pL_Main'),'touchstart',function(e){tempThis._touchstart(e)});
        sina.addEvent(sina.$('pL_Main'),'touchmove',function(e){tempThis._touchmove(e)});
        sina.addEvent(sina.$('pL_Main'),'touchend',function(e){tempThis._touchend(e)});
    },
    showAlert : function(){
        var tempThis = this;
        if(!this.showAlertDiv){
            this.showAlertDiv = document.createElement('div');
            document.body.appendChild(this.showAlertDiv);
            this.showAlertDiv.innerHTML = '支持触摸翻页';
            this.showAlertDiv.onclick = function(){
                sina.writeCookie('touchAlt','no',24 * 30);
                tempThis.hideAlert();
            };
        };
        this.showAlertDiv.className = 'iPadAlert';
        this.showAlertDiv.style.top = window.pageYOffset + window.innerHeight - 200 + 'px';
        this.showAlertDiv.style.right = '170px';
        this.showAlertDiv.style.opacity = 0.7;
        this.showAlertDiv.style.display = 'block';
        this.alertStatus = 'open';
    },
    hideAlert : function(){
        sina.extend.hide(this.showAlertDiv);
        this.alertStatus = 'close';
    },
    showAlertPage : function(num){
        var tempThis = this;
        if(!this.showAlertDivPage){
            this.showAlertDivPage = document.createElement('div');
            document.body.appendChild(this.showAlertDivPage);

            this.showAlertDivPage.onclick = function(){
                tempThis.hideAlert();
            };
        };
        this.showAlertDivPage.className = 'iPadAlertPage';
        this.showAlertDivPage.style.top = window.pageYOffset + Math.round(window.innerHeight/2 - 70) + 'px';
        this.showAlertDivPage.style.left = window.pageXOffset + Math.round(window.innerWidth/2 - 100) + 'px';
        this.showAlertDivPage.style.opacity = 0.7;
        this.showAlertDivPage.style.display = 'block';

        this.showAlertDivPage.innerHTML = '第' + num + '页';

        setTimeout(function(){tempThis.hideAlertPage()},1000);
    },
    hideAlertPage : function(){
        sina.extend.hide(this.showAlertDivPage);
    },
    _touchstart : function(e){

        this.x = e.touches[0].pageX;
        this.scrollX = window.pageXOffset;
        this.scrollY = window.pageYOffset; //用于判断页面是否滚动
    },
    _touchmove : function(e){
        if(e.touches.length > 1){ //多点触摸
            this.status = 'ok';
            return;
        };
        this.lastX = e.touches[0].pageX;
        var cX = this.x - this.lastX;

        if(cX<0){//第一页禁止向左
            if(newsList.page.index == 1){
                return;
            };
        };

        if(this.status == 'ok'){
            if(this.scrollY == window.pageYOffset && this.scrollX == window.pageXOffset && Math.abs(cX)>50){ //横向触摸
                if(cX>0){//最后一页禁止向右
                    if(newsList.page.index == newsList.page.pageCount){
                        return;
                    };
                };

                this.status = 'touch';
            }else{
                return;
            };
        };

        sina.$('d_list').style.marginLeft = - cX + 'px';
        e.preventDefault();
    },
    _touchend : function(e){
        if(this.status != 'touch'){return};
        this.status = 'ok';
        var cX = this.x - this.lastX;
        var tempThis = this;
        if(this.alertStatus == 'open'){this.hideAlert()};
        sina.extend.actPX(sina.$('d_list').style,'marginLeft',sina.$('d_list').offsetLeft,cX>0?-sina.$('d_list').offsetWidth:sina.$('d_list').offsetWidth,200,function(){

            if(cX<0){
                newsList.page.pre();
            }else{
                newsList.page.next();
            };
            window.scroll(0,0);
            tempThis.showAlertPage(newsList.page.index);
            sina.$('d_list').style.marginLeft = 0;
        });
    }
};

window.__nfios = true;