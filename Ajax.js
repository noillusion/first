//Ajax函数
function ajax(url, options) {
    var xhr;
    var method;
    var value = '';
    var set = false;
    var dataString;
    var sendString = '';
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = ActiveXObject('Microsoft.XMLHTTP');
    }
    method = options.type || 'GET';
    function format(data){
        if(typeof (data) == 'string'){
            value = data;
        }else{
            for(p in data){
                value += p + '=' + data[p] + '&';
            }
            value = value.substr(0,value.length-1);
        }
        return value;
    }
    dataString = format(options.data);
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200){
            options.onsuccess(xhr.responseText,xhr);
        }
    }
    if(method == 'GET'){
        url = url + '?' + dataString;
        set = true;    
    }
    xhr.open(method,url,true);
    if(!set){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        sendString = dataString;
    }   
    xhr.send(sendString);
}
// 使用示例：
ajax(
    'http://localhost/ajax/ajaxtest.php', 
    {
        type:'POST',
        data: {
            name: 'lisi',
            password: '123456',
            age: '24'
        },
        //data:'name=lisi&password=123456&age=34',
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
