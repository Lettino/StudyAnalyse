//获取登陆页面的信息
$(function () {
   //判断是否有session信息
    //有则读取
    //没有则返回登陆页面
})

function checkSchool(schoolName) {
    $.ajax({

        type :"GET",
        url :"http://localhost:3003/addschool_mysql/",
        dataType: 'jsonp',
        data:{
            school_name : schoolName
        },
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            console.log(data)
            if(data.value==true){
                alert("学校添加成功")
            }
            if (data.value==false){
                alert("学校已经存在，请重新输入学校名称")
            }
        }
    });

}
function checkGrade() {}
function checkClass() {}
function checkSubject() {}
function checkTeacher(teacherNum) {
    $.ajax({

        type :"GET",
        url :"http://localhost:3003/allocatesubject_mysql/",
        dataType: 'jsonp',
        data :{
            account :teacherNum
        },
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){

            alert(JSON.stringify(data));

        }

    });
}
