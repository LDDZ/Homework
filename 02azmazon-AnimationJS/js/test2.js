// // css选择器
// var img4 =document.querySelector('#images>a:nth-of-type(4)');
// // id
// var img4=document.getElementById('images').children[4];
// // 类名
// var img4=document.getElementsByClassName('hiddenImg')[3];
// // 标签名
// var img4=document.getElementsByTagName('a')[4];


// console.log(img4);

// img4.style.display="block";



// 初始化

// ------------获取相关元素-------------
//抓取整个轮播图div
var sliderDiv=document.querySelector('.slider');
// 获取一组带图像的超链接
var imagesA=document.getElementById('images').children;
//获取一组li文本
var infoList=document.querySelectorAll(".txtItem");
//上一张下一张控制按钮
var leftBtn =document.querySelector('.leftButton');
var rightBtn=document.querySelector('.rightButton');



// -------------初始化控制变量-------------
//初始化当前显示的图片/文本编号
var currentNo=0;
//获取图片/文本数量
const nodeLength=8;



//--------------构建功能函数---------------
//计时器换片函数，间隔1S被调用，显示一张图像，其余图像隐藏。文本轮流高亮
function changeImg(){

    // 排他原理1，先去掉同类
    for(var i=0;i<nodeLength;i++){
        //同类图像透明度0
        imagesA[i].className="hiddenImg";
        //同类文本暗色显示
        infoList[i].className="txtItem normalColor"
        // console.log(imagesA[i]);

    }
    // 排他原理2，再突出自己，当前图像透明度为1
    imagesA[currentNo].className="displayImg";
    // 排他原理，文本高亮
    infoList[currentNo].className="txtItem heighlight"

}

//左向控制编号变化
function leftImg(){
    if(currentNo>0) {currentNo--;}
    else {currentNo=nodeLength-1;}
}
//右向控制编号变化
function rightImg(){
    if(currentNo<nodeLength-1) {currentNo++;}
    else {currentNo=0;}
}

// 切换到定编号文本/图片
function gotoImg(){
    // 获得当前显示的图像的编号/文本的编号 this 是当前时间发生的本体
    // console.log(this.no);
    currentNo=this.no;
    // 调用更换图片/文本函数
    changeImg();
}

// 换向换片/文本
function leftImgGo(){
    leftImg();
    changeImg();
}
function rightImgGo(){
    rightImg();
    changeImg();
}




// ---------启动计时器--------------
//网页加载后启动计时器，每隔一秒调用changeImg()换片
var timer = window.setInterval(rightImgGo, 1000);




// ----------为各元素添加事件------------------
//为轮播图添加鼠标移入移出事件
// “普通”写法
// sliderDiv.addEventListener('mouseover', stopChange);//停止计时器
// sliderDiv.addEventListener('mouseout', starChange);//重启计时器
// 匿名函数写法
// sliderDiv.addEventListener('mouseover', function stopChange() { window.clearInterval(timer);});//停止计时器
// sliderDiv.addEventListener('mouseout', function starChange() {timer = window.setInterval(rightImgGo, 1000);});//重启计时器
// 箭头函数写法
sliderDiv.addEventListener('mouseover', () =>{ window.clearInterval(timer);});//停止计时器
sliderDiv.addEventListener('mouseout', () =>{timer = window.setInterval(rightImgGo, 1000);});//重启计时器


// 为所有文本li注册鼠标移入事件，移入之后，当前li高亮，跳转到对应图片
for(var i=0;i<infoList.length;i++){
    infoList[i].addEventListener('mouseover',gotoImg);
    //添加自定义属性no 记录当前li的编号
    infoList[i].no=i;
}

// 上下一张注册事件
leftBtn.addEventListener('click',leftImgGo);
rightBtn.addEventListener('click',rightImgGo);