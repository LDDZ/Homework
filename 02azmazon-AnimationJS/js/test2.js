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



// 获取一组带图像的超链接
var imagesA=document.getElementById('images').children;
// console.log(imagesA);

//获取一组li文本
var infoList=document.querySelectorAll(".txtItem");

//初始化当前显示的图片/文本编号
var currentNo=0;
//获取图片/文本数量
    const nodeLength=8;
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


    //或者
    // for(const item of imagesA){
    //     item.className="hiddenImg";
    // }

    // 排他原理2，再突出自己，当前图像透明度为1
    imagesA[currentNo].className="displayImg";
    // 排他原理，文本高亮
    infoList[currentNo].className="txtItem heighlight"

    if(currentNo<7) {currentNo++;}
    else {currentNo=0;}
    // console.log(currentNo);
}

function leftImg(){
    if(currentNo>0) {currentNo--;}
    else {currentNo=7;}
}
function righImg(){
    if(currentNo<7) {currentNo++;}
    else {currentNo=0;}
}


//网页加载后启动计时器，每隔一秒调用changeImg()换片
var timer = window.setInterval(changeImg, 1000);

//抓取整个轮播图div
var sliderDiv=document.querySelector('.slider');
// console.log(sliderDiv);

//定义启动定时器函数，函数功能为启动定时器
function starChange() {
    timer = window.setInterval(changeImg, 1000);
}

//定义停止定时器函数，函数功能为停止定时器
function stopChange() {
    window.clearInterval(timer);
}

//为轮播图添加鼠标移入移出事件
sliderDiv.addEventListener('mouseover', stopChange);
sliderDiv.addEventListener('mouseout', starChange);


// 为所有文本li注册鼠标移入事件，移入之后，当前li高亮，跳转到对应图片
for(var i=0;i<infoList.length;i++){
    infoList[i].addEventListener('mouseover',gotoImg);
    //添加自定义属性no 记录当前li的编号
    infoList[i].no=i;
}

function gotoImg(){
    // 获得当前显示的图像的编号/文本的编号 this 是当前时间发生的本体
    console.log(this.no);
    currentNo=this.no;
    // 调用更换图片/文本函数
    changeImg();
}
var leftBtn =document.querySelector('.leftButton');
// console.log(leftBtn);
var rightBtn=document.querySelector('.rightButton');
// console.log(rightBtn);

leftBtn.addEventListener('click',leftImg);
rightBtn.addEventListener('click',righImg);

