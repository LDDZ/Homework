// 创建变量用于存储商品数据
var products;

// 1.0创建请求对象
var request = new XMLHttpRequest();
// 2.0设置请求对象
// 2.1用open() 方法来指定从网络请求资源的 HTTP request method , 以及URL。
request.open('GET', 'data/products.json');
// 2.2设置响应类型 （返回什么类型的数据）
request.responseType = 'json';
// 2.3注册请求成功事件，事件发生后请求的响应数据response可用
request.onload = function() {
  if(request.status === 200) {
    //   将json获取到的数据存到变量products中
    products = request.response;
    // 调用初始化函数
    displayProducts();
  } else {
    //  如果获取文件失败，则向控制台提供错误信息
    console.log('网络请求products.json 失败，响应信息：' + request.status + ': ' + request.statusText);
  }
};
// 3.0发送请求
request.send();


function displayProducts(){
    // console.log(products[2]);
    // 获取商品列表父节点
    let productListNode=document.querySelector('#productList');
    // console.log(productListNode);

    // 获取商品样本节点
    let productExampleNode=document.querySelector('#productExample');
    // console.log(productExampleNode);
    
    for (const key in products) {
        // 当前商品数据
        let product=products[key];

        // 克隆样本节点形成当前商品节点
        let node=productExampleNode.cloneNode(true);

        // 将商品节点挂接到父节点下
        productListNode.appendChild(node);

        // 设置数据
        // 商品节点id
        node.id=product.id;

        // 商品标题
        let example=node.querySelector('[data-name="title"]');
        example.textContent=product.titile;
        // 商品单价
        example=node.querySelector('[data-name="unitPrice"]');
        example.textContent="¥ "+product.unitPrice.toFixed(2);
        // 图像地址
        example=node.querySelector('[data-name="imgSrc"]');
        example.src="images/"+product.imgSrc;

        // 去除隐藏
        node.classList.remove('d-none');
    }
}