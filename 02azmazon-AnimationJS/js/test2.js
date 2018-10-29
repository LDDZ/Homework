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

// 行内样式实现换显示样式
// 图像1隐藏
// imagesA[0].style.display="none";
// 图像5显示
// imagesA[4].style.display="block";


// 通过更换css类名来实现更换样式
// 图像1隐藏
// imagesA[0].className="hiddenImg";
// 图像5显示
// imagesA[4].className="displayImg";

// 利用计时器间隔1S，显示1张图像，其余图像隐藏
var currentNo=0;
function changeImg(){
    // 排他原理，先去掉同类
    for(var i=0;i<imagesA.length;i++){
        imagesA[i].className="hiddenImg";
        console.log(imagesA[i]);
    }
    //或者
    // for(const item of imagesA){
    //     item.className="hiddenImg";
    // }

    // 再突出自己
    imagesA[currentNo].className="displayImg";


    if(currentNo<7) {currentNo++;}
    else {currentNo=0;}
    // console.log(currentNo);
}
var timer = window.setInterval(changeImg, 1000);

//抓取整个轮播图div
var imagesG=document.querySelector('#images');
console.log(imagesG);

//定义启动定时器函数，函数功能为启动定时器
function starChange() {
    timer = window.setInterval(changeImg, 1000);
}

//定义停止定时器函数，函数功能为停止定时器
function stopChange() {
    window.clearInterval(timer);
}

//为轮播图添加鼠标移入移出事件
imagesG.addEventListener('mouseover', stopChange);
imagesG.addEventListener('mouseout', starChange);