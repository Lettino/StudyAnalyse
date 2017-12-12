function change(url) {
    $("#myFrame").attr("src", url);
}
/*
         FileReader共有4种读取方法：
         1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
         2.readAsBinaryString(file)：将文件读取为二进制字符串
         3.readAsDataURL(file)：将文件读取为Data URL
         4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'

*/

var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串

function getExcel(obj,para1,para2,para3) {//导入
    if(!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        if(rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        //对data进行操作
        var Data = JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
        // console.log(Data)
        // console.log(para1)
        // console.log(para2)
        // console.log(para3)
        //向数据库导入信息
        $.ajax({
            type :"GET",
            url :"http://localhost:3003/addstudent_mysql",
            dataType: 'jsonp',
            data :{
                school_id:para1,
                grade_id:para2,
                class_id:para3,
                string_excel:JSON.stringify([{"考号":"11111","姓名":"王琛超","性别":"0","城乡":"1"},{"考号":"22222","姓名":"周家勇","性别":"0","城乡":"1"},{"考号":"33333","姓名":"陈冲","性别":"0","城乡":"1"}])
            },
            jsonp:"callback",
            jsonpCallback:"callback",
            success :function(data){
                alert("插入成功")
            },
            error:function () {
                alert("请检查网络状态")
            }

        });

    };
    if(rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

function fixdata(data) { //文件流转BinaryString
    var o = "",
        l = 0,
        w = 10240;
    for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
