var cart = new ShoppingCart();
// console.log(cart);
// console.log(cart.getDataFromLocalSatorge());

// 显示购物车所有订单列表
function displayOrderList() {

    // if (cartData.orderList.length == 0) return;

    // 获取订单列表父元素
    let cartListNode = document.querySelector('#cartList');
    // console.log(cartListNode);
    
    // 获取样本节点
    let exmapleNode=document.querySelector('#orderExample');

    let cartData = cart.getDataFromLocalSatorge();
    //获取订单列表数据
    let orderList = cartData.orderList;

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
        let selectNode=node.querySelector('[data-operator="checkItem"]');
        selectNode.checked=order.selectStatus;
        console.log(selectNode);

        // 图像地址
        let imgNode=node.querySelector('[data-name="imgSrc"]');
        imgNode.src=order.imgSrc;
        console.log(imgNode);

        // 商品标题
        let titleNode=node.querySelector('[data-name="title"]');
        titleNode.textContent=order.titile;

        // 单价
        let unitPriceNode=node.querySelector('[data-name="unitPrice"]');
        unitPriceNode.textContent=order.unitPrice;

        // 单项订单数量
        let qtyNode=node.querySelector('[data-name="qty"]');
        qtyNode.textContent=order.qty;

        node.classList.remove('d-none');
    }
}
displayOrderList();