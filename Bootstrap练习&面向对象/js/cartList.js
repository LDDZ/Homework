var cart = new ShoppingCart();
// console.log(cart);
// console.log(cart.getDataFromLocalSatorge());

// 显示购物车所有订单列表
function displayOrderList() {

    // 获取订单列表父元素
    let cartListNode = document.querySelector('#cartList');
    // console.log(cartListNode);

    // 获取样本节点
    let exmapleNode = document.querySelector('#orderExample');

    // 获取购物车数据
    let cartData = cart.getDataFromLocalSatorge();
    //获取订单列表数据
    let orderList = cartData.orderList;
    if(orderList.length==0) ;

    for (const i in orderList) {
        // 当前订单数据
        let order = orderList[i];

        //克隆样本节点形成当前订单节点
        let node = exmapleNode.cloneNode(true);
        // console.log(node);
        // 将订单节点挂接到父节点下
        cartListNode.appendChild(node);

        // 设置数据
        // 节点id
        node.id = order.id;

        // 商品状态
        let selectNode = node.querySelector('[data-operator="checkItem"]');
        selectNode.checked = order.selectStatus;
        console.log(selectNode);

        // 图像地址
        let imgNode = node.querySelector('[data-name="imgSrc"]');
        imgNode.src = order.imgSrc;
        console.log(imgNode);

        // 商品标题
        let titleNode = node.querySelector('[data-name="title"]');
        titleNode.textContent = order.titile;

        // 单价
        let unitPriceNode = node.querySelector('[data-name="unitPrice"]');
        unitPriceNode.textContent = (order.unitPrice).toFixed(2);


        // 单项订单数量
        let qtyNode = node.querySelector('[data-name="qty"]');
        qtyNode.textContent = order.qty;

        // 小计
        let subPrice = node.querySelector('[data-name="subPrice"]');
        subPrice.textContent = (qtyNode.textContent * unitPriceNode.textContent).toFixed(2);

        node.classList.remove('d-none');

        console.log(node);
    }
}

// 显示商品样本数
// 显示已选中商品的总数和总价格
function displaySelectedTotal() {
    // 获取购物车数据
    let cartData = cart.getDataFromLocalSatorge();

    // 获取样本数节点并修改数据
    let units = document.querySelector('[data-name="units"]');
    units.textContent = cartData.units;
    // 获取选中商品数量节点并修改数据
    let selectedQty = document.querySelector('[data-name="selectedQty"]')
    selectedQty.textContent = cart.getSelectedQty();

    // 获取选中商品的总价格节点并修改数据
    let selectedAmount = document.querySelector('[data-name="selectedAmount"]');
    selectedAmount.textContent = (cart.getSelectedAmount()).toFixed(2);
}

// 为相关节点注册事件
function regEvent() {
    // 获取清空购物车节点
    let element = document.querySelector('[data-operator="clearAll"]');
    console.log(element);
    // 注册单机事件,事件触发函数
    element.onclick = clearAllEventFun;

    // 获取一组单项订单删除节点
    element = document.querySelectorAll('[data-operator="deleteItem"]');
    console.log(element);
    // 为每个删除节点注册单机事件,事件触发函数
    for (const i in element) {
        element[i].onclick = deleteItemEventFun;
    }
    
}

// 清空事件触发函数
function clearAllEventFun() {
    cart.clearShoppingCart();
    // 获取订单根节点
    let cartListNode =document.querySelector('#cartList');
    //保留样本节点
    let ExampleNode = (document.querySelector('#orderExample')).cloneNode(true);
    //清除订单根节点的所有元素
    cartListNode.innerHTML = "";
    //将样本节点挂接回列表根节点
    cartListNode.appendChild(ExampleNode);
    // 更新商品总数据
    displaySelectedTotal();
}

//删除单项订单事件触发函数
function deleteItemEventFun() {
    // 获取订单根节点
    let cartListNode =document.querySelector('#cartList');
    // 获取当前订单节点
    let node=this.parentNode.parentNode;
    // 调用购物车类删除订单函数
    cart.deleteItem(node.id);
    // 删除节点
    cartListNode.removeChild(node);
    // 修改各种总数据
    displaySelectedTotal();
}

// 初始化函数
function init() {
    // 显示购物车所有订单列表
    displayOrderList();
    // 显示商品样本数
    // 显示已选中商品的总数和总价格
    displaySelectedTotal();
    // 为相关节点注册事件
    regEvent();
}

init();