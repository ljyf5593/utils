/**
 * 使用js更新地址中某个参数的值
 * @param string 需要替换的url地址 
 * @param string name 需要替换的参数名称 
 * @param {string} value 要替换的值 
 */
function updateUrlQuery(url, name, value) {
  var replaceStr = name + "=" + value;
  // 如果更改的值和原值一样则直接返回
  if (url.match(name + "=" + value)) {
    return url;
  } else {
    var old_url = url;
    var reg = new RegExp(name + "=([^#&]*)", "gi");
    url = url.replace(reg, replaceStr);
    if (url == old_url) {
      var spilt = url.indexOf("?") < 0 ? "?" : "&";
      url += spilt + replaceStr;
    }
    return url;
  }
}

/*获取网址参数*/
function getURL(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return  r[2]; return null;
}

/*获取全部url参数,并转换成json对象*/
function getUrlAllParams (url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

    /*删除url指定参数，返回url*/
function delParamsUrl(url, name)
{
    var baseUrl = url.split('?')[0] + '?';
    var query = url.split('?')[1];
    if (query.indexOf(name)>-1) {
        var obj = {}
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    }else{
        return url;
    }
}
