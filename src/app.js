/**
		created by cc on 10/18
**/

var express = require("express");
var bodyParser = require("body-parser");

//下面这个是用mysql查询数据库
var LoginRouter_mysql = require("../routers_mysql/LoginRouter.js");
var PaperAnalyseRouter_mysql = require("../routers_mysql/PaperAnalyseRouter.js");
var StudentAnalyseRouter_mysql = require("../routers_mysql/StudentAnalyseRouter.js");
var ClassAnalyseRouter_mysql = require("../routers_mysql/ClassAnalyseRouter.js");
var MultipleAnalyseRouter_mysql = require("../routers_mysql/MultipleAnalyseRouter.js");
var ImportInterface_mysql = require("../routers_mysql/ImportInterface.js");
var RegisterRouter_mysql = require("../routers_mysql/RegisterRouter.js");
var AllocateClassSubjectRouter_mysql = require("../routers_mysql/AllocateClassSubjectRouter.js");
var InforListRouter_mysql = require("../routers_mysql/InforListRouter");
var AddStudentRouter_mysql = require("../routers_mysql/AddStudentRouter");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/src" , express.static(__dirname));
app.get('/', function (req,res) {
	//onsole.log(__dirname);
   res.redirect('../src/login.html');
});




//
app.get("/getLoginSchool_mysql",LoginRouter_mysql.getAllSchool);
app.get("/login_mysql" , LoginRouter_mysql.login);
app.get("/subject_mysql" ,PaperAnalyseRouter_mysql.search_subject);
app.get("/papers_mysql" , PaperAnalyseRouter_mysql.search_papers);
app.get("/grade_classification_mysql" , PaperAnalyseRouter_mysql.search_grade_classification_mysql);
app.get("/all_student_mysql" ,StudentAnalyseRouter_mysql.search_student);
app.get("/studentanalyse_mysql" , StudentAnalyseRouter_mysql.studentanalyse);
app.get("/classanalyse_mysql" , ClassAnalyseRouter_mysql.class_analyse);
app.get("/multiple_analyse_mysql" , MultipleAnalyseRouter_mysql.multipleAnalyse_mysql);
app.get("/getSchool", ImportInterface_mysql.getSchool);
/*app.get("/getGrade",ImportInterface_mysql.getGrade);
app.get("/getClass",ImportInterface_mysql.getClass);
app.get("/getSubject",ImportInterface_mysql.getSubject);*/
app.get("/getAllSchool_mysql",ImportInterface_mysql.getAllSchool);
app.get("/getAllGrade_mysql",ImportInterface_mysql.getAllGrade);
app.get("/getAllClass_mysql",ImportInterface_mysql.getAllClass);
app.get("/getAllSubject_mysql",ImportInterface_mysql.getAllSubject);
app.get("/register_mysql" , RegisterRouter_mysql.register);
app.get("/allocatesubject_mysql", AllocateClassSubjectRouter_mysql.search_teacher_infor);
app.get("/addstudent_mysql",AddStudentRouter_mysql.addStudent);
app.get("/inforList_mysql",InforListRouter_mysql.inforList);

var server = app.listen(3003 , function(){

	console.log("app is listening on port 3003!");
});