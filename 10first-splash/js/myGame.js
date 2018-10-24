var randomNumber=Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);

var guessField=document.querySelector('.guessField');
// console.log(guessField);
var guesses = document.querySelector('.guesses');
// console.log(guesses);
var lastResult=document.querySelector('.lastResult');
// console.log(lastResult);
var lowOrHi=document.querySelector('.lowOrHi');
// console.log(lowOrHi);
var guessSubmit=document.querySelector('.guessSubmit');
// console.log(guessSubmit);

var guessCount=1;
//设置重置按钮变量
var resetButton;
//猜数输入区获得焦点
guessField.focus();

function checkGuess(){
    var userGuess=Number(guessField.value);
    // console.log(typeof userGuess);
    // console.log(userGuess);
    if(guessCount===1){
        guesses.textContent='上次猜的数：';
    }
    guesses.textContent += guessField.value+' ';
    if(userGuess===randomNumber){
        lastResult.textContent='恭喜你猜对了！';
        lastResult.style.backgroundColor='green';
        lowOrHi.textContent='';
        setGameOver();
    }else if(guessCount===10){
        lastResult.textContent='Game Over!!!';
        lowOrHi.textContent='';
        setGameOver();
    }else{
        lastResult.textContent='你猜错了！';
        lastResult.style.backgroundColor='red';
        if(userGuess>randomNumber){
            lowOrHi.textContent='你猜高了';
        }else if(userGuess<randomNumber){
            lowOrHi.textContent='你猜低了';
        }
    }
   //猜数自增
   guessCount++; 
   //清空猜数输入区
   guessField.value='';
   //猜数输入区获得焦点
   guessField.focus();
}

// checkGuess();

guessSubmit.addEventListener('click',checkGuess);

// function setGameOver(){
    // 阻止玩家继续猜测
    // 显示控件允许玩家重新开始游戏
//     var resetButton=document.querySelector('div.resultParas p:last-child');
//     console.log(resetButton);
//     resetButton.style.display='block';
// }

// 设置游戏结束状态
function setGameOver(){
    // 禁用文本输入框
    guessField.disabled=true;
    // 禁用确定按钮
    guessSubmit.disabled=true;
    // 创建button元素，button为HTML按钮的标签名
    resetButton=document.createElement('button');
    // console.log(resetButton);
    // 为新生成的元素resetButton设置文本内容
    resetButton.textContent="开始新游戏";
    // 将resetButton作为body的小孩加入页面
    // console.log(resetButton);
    document.body.appendChild(resetButton);
    // 为resetButton设置单击事件监侦听器
    resetButton.addEventListener('click',resetGame);
}
//重置游戏
function resetGame() {
    // 重置游戏次数
    guessCount = 1;
    // 获取结论区所有p元素
    var resetParas = document.querySelectorAll('.resultParas p');
    // 使用循环将所有结论区的p元素文本内容重置为空串
    for(var i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    // 重置猜数值
    randomNumber = Math.floor(Math.random() * 100) + 1;
}