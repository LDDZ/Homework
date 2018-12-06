// create a variable to store the products 'database' in
var products;

// use XHR to retrieve it, setting the responseType as json, and report any errors
// that occur in the XHR operation. If the respnse is successful, set products to equal
// request.response, then run the initialize() function
var request = new XMLHttpRequest();
request.open('GET', 'products.json');
request.responseType = 'json';

request.onload = function() {
  if(request.status === 200) {
    products = request.response;
    // 调用初始化函数
    initialize();
  } else {
    console.log('Network request for products.json failed with response ' + request.status + ': ' + request.statusText)
  }
};

request.send();

// sets up the app logic, declares required variables, contains all the other functions
function initialize() {
  // grab the UI elements that we need to manipulate
  var category = document.querySelector('#category');
  var searchTerm = document.querySelector('#searchTerm');
  var searchBtn = document.querySelector('button');
  var main = document.querySelector('main');

  // 最近一次搜索的类别
  var lastCategory = category.value;
  // 最近一次搜索关键字，并设置初值为空串
  var lastSearch = '';

  // 定义类别数组存放某类商品
  var categoryGroup;
  // 定义最终数组存放最后检索到的结果（某类下某个关键字）
  var finalGroup;

  // 初始状态下最终结果就是所有商品
  finalGroup = products;

// 调用更新显示函数
  updateDisplay();

  // 页面更新之后设置两个数组为空
  categoryGroup = [];
  finalGroup = [];

  // 搜索按钮注册单击事件
  searchBtn.onclick = selectCategory;

  function selectCategory(e) {
    // 阻止按钮的默认事件
    e.preventDefault();

    // 清空类别数组和最终数组
    categoryGroup = [];
    finalGroup = [];

    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function
    if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      // 如果最后一次分类下拉列表框的值和搜索框的值都各自与当前的值相等，就将函数返回
      return;
    } else {
      // 更新类别和关键字
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();
      // In this case we want to select all products, then filter them by the search
      // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
      if(category.value === 'All') {
        // 若类别为 全部 则将类别数组设置为所有商品
        categoryGroup = products;
      } else {
        var lowerCaseType = category.value.toLowerCase();
        for(var i = 0; i < products.length ; i++) {
          if(products[i].type === lowerCaseType) {
            categoryGroup.push(products[i]);
          }
        }
      }
      selectProducts();
    }
  }

  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tnered search term (if one has bene entered)
  function selectProducts() {
    // 如果关键字为空
    if(searchTerm.value.trim() === '') {
      // 最终数组就是类别数组
      finalGroup = categoryGroup;
    } else {
      // Make sure the search term is converted to lower case before comparison. We've kept the
      // product names all lower case to keep things simple
      var lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      // For each product in categoryGroup, see if the search term is contained inside the product name
      // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the product
      // onto the finalGroup array
      for(var i = 0; i < categoryGroup.length ; i++) {
        if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }
    }
    // 调用更新显示函数
    updateDisplay();
  }

  // start the process of updating the display with the new set of products
  function updateDisplay() {
    // 清空原来的内容
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // main.innerHTML="";
    // if no products match the search term, display a "No results to display" message
    if(finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    // for each product we want to display, pass its product object to fetchBlob()
    } else {
      for(var i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  // fetchBlob uses XHR to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it
  function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    var url = 'images/' + product.image;
    // Use XHR to fetch the image, as a blob
    // Again, if any errors occur we report them in the console.
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';

    request.onload = function() {
      if(request.status === 200) {
          // Convert the blob to an object URL — this is basically an temporary internal URL
          // that points to an object stored inside the browser
          var blob = request.response;
          var objectURL = URL.createObjectURL(blob);
          // invoke showProduct
          showProduct(objectURL, product);
      } else {
        console.log('Network request for "' + product.name + '" image failed with response ' + request.status + ': ' + request.statusText);
      }
    };

    request.send();
  }

  // Display a product inside the <main> element
  function showProduct(objectURL, product) {
    // create <section>, <h2>, <p>, and <img> elements
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var image = document.createElement('img');

    // give the <section> a classname equal to the product "type" property so it will display the correct icon
    section.setAttribute('class', product.type);

    // Give the <h2> textContent equal to the product "name" property, but with the first character
    // replaced with the uppercase version of the first character
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    // Give the <p> textContent equal to the product "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.
    para.textContent = '$' + product.price.toFixed(2);

    // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
    image.src = objectURL;
    image.alt = product.name;

    // append the elements to the DOM as appropriate, to add the product to the UI
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}
