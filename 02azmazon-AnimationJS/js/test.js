var timer; //设计定时器变量

//启动定时器函数定义
function startTimer(speed) {
    timer = window.setInterval(changeNum, speed);
}
//调节定时器，使程序一开始就执行变化
startTimer(1000);

//获取div#images元素
var images1 = document.querySelector('#images');
var images2 = document.getElementById('images');
console.log(images1);
console.log(images2);
console.log(images2.children[3]);

//设置当前变化的号码变量及初值
var currentNo = 1;

//定义变化数字函数，0~9，到达9后变化到0
function changeNum() {
    if (currentNo < 8) { currentNo++; }
    else { currentNo = 1;}
    h2Obj.innerHTML ='<img src="images/0'+currentNo+'.jpg" alt="">';
    // console.log(currentNo);
}
// console.log(timer);

//获取控制按钮
var btnObj = document.getElementById('btnObj');
// console.log(btnObj);

//定义启动定时器函数，函数功能为启动定时器的同时改变按钮的显示文本
function starChange() {
    startTimer(1000);
    btnObj.textContent = "停止";
}

//定义停止定时器函数，函数功能为停止定时器的同时改变按钮的显示文本
function stopChange() {
    window.clearInterval(timer);
    btnObj.textContent = "启动";
}

//为按钮添加鼠标移入移出事件
btnObj.addEventListener('mouseover', stopChange);
btnObj.addEventListener('mouseout', starChange);