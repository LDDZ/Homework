
// 商品类
class Product {
  constructor(id, titile, unitPrice, imgSrc) {
    // 商品类成员
    this.id = id;
    this.titile = titile;
    this.unitPrice = unitPrice;
    this.imgSrc = imgSrc;
  }
}

//订单类
class Order {
  constructor(product, qty, selectStatus) {
    // 订单类成员
    this.id = product.id;
    this.titile = product.titile;
    this.unitPrice = product.unitPrice;
    this.imgSrc = product.imgSrc;
    this.qty = qty;
    this.selectStatus = selectStatus;
  }
}
// class Order {
//   constructor(product, qty,selectStatus) {
//     // 订单类成员
//     this.product= product;
//     this.qty = qty;
//     this.selectStatus=selectStatus;
//   }
// }

// 购物车数据类---确定格式
class CartData {
  // 数据成员 订单列表 总样本 总件数 总金额
  constructor() {
    this.orderList = new Array();
    this.units = 0;
    this.totalQty = 0;
    this.totaAmount = 0;
  }
}

// 购物车操作类
class ShoppingCart {
  // 将购物车数据写入本地存储
  setDataToLocalSatorge(cartData) {
    // 清空原有存储写入新列表
    localStorage.removeItem('test');
    // let cartDataString=JSON.stringify(cartData);
    // localStorage.setItem('test',cartDataString);
    localStorage.setItem('test', JSON.stringify(cartData));
  }
  // 从本地存储中获取购物车数据
  getDataFromLocalSatorge() {
    let test = localStorage.getItem('test');
    if (test == null || test == '') {
      return new CartData();
    } else {
      return JSON.parse(test);
    }
  }
  // 加入购物车(写入localStorage)
  addToCart(order) {
    // 读取本地存储中的购物车数据
    this.getDataFromLocalSatorge();
    var flag = true; //假设当前状态是新商品
    for (var i = 0; i < cartData.orderList.length; i++) {
      if (order.id == cartData.orderList[i].id) {
        flag = false; // 修改状态，是老商品
        cartData.orderList[i].qty += order.qty;
        break;
      }
    }
    if (flag) {
      // order是购物车中的新商品，给样本数++
      cartData.orderList.push(order);
      cartData.units++;
    }

    cartData.totalQty += order.qty;
    cartData.totaAmount += order.unitPrice * order.qty;
    // 将新购物车数据写入本地存储
    this. setDataToLocalSatorge(cartData);
  }
}










// 函数定义---将某个订单加入购物车
function addToCart(order) {
  cartData=this.getDataFromLocalSatorge();
  var flag = true; //假设当前状态是新商品
  for (var i = 0; i < myCart.orderList.length; i++) {
    if (order.id == myCart.orderList[i].id) {
      flag = false; // 修改状态，是老商品
      myCart.orderList[i].qty += order.qty;
      break;
    }
  }
  if (flag) {
    // order是购物车中的新商品，给样本数++
    myCart.orderList.push(order);
    myCart.units++;
  }

  myCart.totalQty += order.qty;
  myCart.totaAmount += order.unitPrice * order.qty;
}