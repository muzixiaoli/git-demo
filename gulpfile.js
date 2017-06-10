'use strict';
var gulp=require("gulp");
var browserSync=require('browser-sync').create();
var $ = require("gulp-load-plugins")();
var app = {
	srcPath:"src/",
	distPath:"dist/",
	proName:"itany"
}
//1、html的拷贝
gulp.task("html",function(){
	gulp.src(app.srcPath+"**/*.html")
		.pipe($.htmlmin({
			collapseBooleanAttributes:true,
			removeEmptyAttributes:true
		}))
		.pipe(gulp.dest(app.distPath))
		.pipe(browserSync.stream());
})
//2、less 编译拷贝压缩重命名合并
gulp.task("less",function(){
	gulp.src(app.srcPath+"**/*.less")
		.pipe($.less())
		.pipe($.concat(app.proName+".css"))
		.pipe(gulp.dest(app.distPath+"css"))
		.pipe($.cssmin())
		.pipe($.rename({
			suffix:".min"
		}))
		.pipe(gulp.dest(app.distPath+"css"))
		.pipe(browserSync.stream());
})
//3、js的拷贝压缩混淆合并
gulp.task("js",function(){
	gulp.src(app.srcPath+"js/**/*.js")
		.pipe($.concat(app.proName+".js"))
		.pipe(gulp.dest(app.distPath+"js"))
		.pipe($.uglify())
		.pipe($.rename({
			suffix:".min"
		}))
		.pipe(gulp.dest(app.distPath+"js"))
		.pipe(browserSync.stream());
})
//4、utilJs的拷贝
gulp.task("utilsJs",function(){
	gulp.src(app.srcPath+"utilsJs/**/*.js")
		.pipe(gulp.dest(app.distPath+"js"))
		.pipe(browserSync.stream());
});
//5.清空
gulp.task("clean",function(){
	gulp.src(app.distPath)  //指定需要清除的目录   直接清除dist/下的所有文件
		.pipe($.clean())  //  直接执行 清除任务，不需要再去指定目标目录
		.pipe(browserSync.stream());
});

//任务合并
gulp.task("mytask",['html','less','js','utilsJs']);
//watch
gulp.task("watch",['html','less','js','utilsJs'],function(){
	gulp.watch(app.srcPath+"**/*.html",['html']);
	gulp.watch(app.srcPath+"**/*.less",['less']);
	gulp.watch(app.srcPath+"js/**/*.js",['js']);
	gulp.watch(app.srcPath+"utilsJs/**/*.less",['less']);
})
//浏览器同步静态服务器
//gulp 默认启动服务
//default  是gulp的默认启动任务
gulp.task("default",['watch'],function(){
	browserSync.init({
		server:{
			baseDir:app.distPath
		},
		port:8080
	});
});
