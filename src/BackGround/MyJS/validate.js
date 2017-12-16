// 验证
function Validate(schoolID,teacherID,teacherpass) {
    console.log(schoolID+" "+teacherID+" "+teacherpass)
        $.ajax(
        {
            type:'GET',
            url : 'http://localhost:3003/login_mysql/',
            dataType : 'jsonp',
            jsonp:"jsoncallback",
            jsonpCallback:"callback",
            data:{
                 school_id : schoolID , account : teacherID , password : teacherpass
            },
            success:function(data) {
                if(JSON.stringify(data)!="false"){
                    alert("登陆成功");
                    //cookiesb保存
                    $.cookie('schoolID', schoolID, { expires: 7 ,path:'/'});
                    $.cookie('teacherID', teacherID, { expires: 7 ,path:'/'});
                    $.cookie('teacherpass', teacherpass, { expires: 7 ,path:'/'});
                    window.sessionStorage.clear();
                    window.sessionStorage.setItem("teacherInfo",JSON.stringify(data));
                    //判断用户信息
                    //如果是教师
                    window.location.href="../BackGround/dashboard.html"
                    //如果是管理员
                }else {
                    alert("检查账户名或密码是否正确");
                }
            },
            error:function() {
                alert("登陆失败，请检查网络连接");
                // window.localStorage.clear();
                // window.localStorage.setItem("teacherInfo",JSON.stringify(teacherInfo));
                // window.location.href="../BackGround/dashboard.html"
            }
        }
    );
}

function Register() {
    //判断密码是否一致
    var teacherPass = $("#password").val()
    var teacherPass2 = $("#password2").val()
    if(checkStrEqual(teacherPass,teacherPass2)){
        var schoolID = $("#schoolList").val()
        var teacherID = $("#login_field").val()
        var teacherName = $("#login_name").val()
        var teacherPass = $("#password").val()
        console.log(schoolID+" "+teacherID+" "+teacherName+" "+teacherPass)
        console.log(typeof schoolID);
        console.log(typeof teacherID);
        console.log(typeof teacherPass);
        $.ajax(
            {
                type :"GET",
                url :"http://localhost:3003/register_mysql/",
                dataType: 'jsonp',
                data :{
                    teacher_name : teacherName,
                    account  	 : teacherID,
                    passwd       : teacherPass,
                    school_id    : schoolID
                },
                jsonp:"callback",
                jsonpCallback:"callback",
                success:function(data) {;
                    if(data=="true"){
                        alert("注册成功")
                    }else {
                        alert("账号已存在，注册失败");
                    }
                },
                error:function() {
                    alert("注册失败，请检查网络连接");
                }
            }
        );
    }else {
        alert("您输入的两次密码不一致，请重新输入")

    }
}
function getUserDate() {
    var schoolID, teacherID,teacherpass;
    schoolID = $.cookie('schoolID');
    teacherID = $.cookie('teacherID');
    teacherpass = $.cookie('teacherpass');
    alert(schoolID);
    $.ajax(
        {
            type:'GET',
            url : 'http://localhost:3003/login_mysql/',
            dataType : 'jsonp',
            jsonp:"jsoncallback",
            jsonpCallback:"callback",
            async: false,
            data:{
                school_id : schoolID , account : teacherID , password : teacherpass
            },
            success:function(data) {
                if(JSON.stringify(data)!="false"){
                    window.sessionStorage.clear();
                    window.sessionStorage.setItem("teacherInfo",JSON.stringify(data));
                    //判断用户信息

                    //如果是管理员
                }else {
                    alert("检查账户名或密码是否正确");
                }
            },
            error:function() {
                alert("登陆失败，请检查网络连接");
                // window.localStorage.clear();
                // window.localStorage.setItem("teacherInfo",JSON.stringify(teacherInfo));
                // window.location.href="../BackGround/dashboard.html"
            }
        }
    );
}