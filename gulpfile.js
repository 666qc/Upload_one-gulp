let {src,pipe,dest,series,parallel,watch  } = require('gulp');
let del = require('del'); //删除文件夹和文件
var sass = require('gulp-sass')(require('sass'));  //编译css
let cssmin = require('gulp-cssmin'); //压缩
let rename = require('gulp-rename'); //重命名
const autoprefixer = require('gulp-autoprefixer'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify'); 
var babel = require('gulp-babel'); //es6转为es5
const htmlmin = require('gulp-htmlmin'); 
var browserSync = require('browser-sync'); 


function packHtml(){
     //压缩html
    return  src('./src/index.html')
           
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(dest('./dist'))
}

// 把scss编译成css
function  packCss(){
    return src('./src/*.scss')   //原目录
            .pipe(sass()) 
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
              }))
            .pipe(cssmin())  //压缩
            .pipe(rename({
                suffix: ".min"  //压缩之后重命名文件
            }))
            .pipe(dest('./dist/css/'))   //编译到新的指定目录
            .pipe(browserSync.stream())  //把结果同步给浏览器
}

// 合并js
function packJs(){
    return src('./src/*.js')
            .pipe(concat('all.js'))
            .pipe(babel(
                {
                    presets: ['@babel/preset-env']
                }
            ))
            .pipe( uglify())
            .pipe(dest('./dist/js/'))
            .pipe(browserSync.stream())  //把结果同步给浏览器
}


function clean(){
    //清除构建目录dist
    return del(['./dist/']);
}


function watchFile(){
     //启动一个服务器，
    browserSync.init({
        ///指定根目录
        server:"./dist"
    })

    watch('./src/scss/*.scss',packCss);   //热加载
    watch('./src/js/*.js',packJs);   //热加载
    watch('./src/index.html',packHtml).on('change',browserSync.reload)     //页面刷新
}

exports.packJs = packJs
exports.cleanTask= clean;
exports.watchFile= watchFile;


//开发阶段 
exports.serve = parallel(packHtml,packCss,packJs,watchFile)

//部署阶段
exports.build = series(clean, parallel(packHtml,packJs,packCss))