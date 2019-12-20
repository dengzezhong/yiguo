const mainShop = document.querySelectorAll('.main-shop');

function ajax(obj) {
    //判断数据类型，将对象类型拼接成含& = 的字符串,方便使用；
    function objTostring(obj) {
        if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
            let objArr = [];
            for (let i in obj) {
                objArr.push(i + '=' + obj[i]);
            }
            return objArr.join('&');
        }
    }

    //创建promise实例
    let promise = new Promise((resolve, reject) => {
        //1,获得ajax对象
        let xhr = new XMLHttpRequest();



        if (!obj.url) {
            throw new Error('接口地址不能为空');
        }

        //判断是否异步，如同步就无需onreadystatechange事件进行监听
        if (obj.async === 'false' || obj.async === false) {
            obj.async = false;
        } else {
            obj.async = true;
        }

        obj.type = obj.type || 'get'; //设置默认请求方式为get，


        //数据存在（对象类型数据，将其转换成适合（& =）的字符串类型，方便使用）
        if (obj.data) {
            if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
                obj.data = objTostring(obj.data);
            } else {
                obj.data = obj.data;
            }
        }



        //get请求，通过地址栏传输数据
        if (obj.data && obj.type === 'get') {
            obj.url += '?' + obj.data;
        }

        //2,open()建立连接
        xhr.open(obj.type, obj.url, obj.async);


        //3,send()发送数据
        //post请求，通过send（）和设置请求头传输数据
        if (obj.data && obj.type === 'post') {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); //设置请求头
            xhr.send(obj.data);
        } else {
            xhr.send();
        }

        //4,异步通过onreadystatechange事件进行监听，同步无需事件监听（利用回调函数将数据传输出来）
        if (obj.async) { //异步
            // console.log('异步');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let objdata = null;
                    if (obj.dataType == 'json') { //判断需要获得的数据是不是要转为json对象
                        objdata = JSON.parse(xhr.responseText);
                    } else {
                        objdata = xhr.responseText;
                    }
                    resolve(objdata); //成功状态输出数据
                } else if (xhr.readyState == 4 && (!(xhr.status == 200))) {
                    reject('接口地址有误'); //失败状态处理
                }
            }
        } else { //同步
            // console.log('同步');
            if (xhr.status == 200) {
                let objdata = null;
                if (obj.dataType == 'json') { //判断需要获得的数据是不是要转为json对象
                    objdata = JSON.parse(xhr.responseText);
                } else {
                    objdata = xhr.responseText;
                }
                resolve(objdata); //成功状态输出数据
            } else {
                reject('接口地址有误'); //失败状态处理
            }
        }
    })

    return promise; //函数被调用，返回promise实例，有promise实例才能用其方法（then(),catch()....）
}

// 页面渲染render
function render() {
    ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://127.0.0.1:8080/h5/yiguo/php/getData.php',

        })
        .then(data => {
            let itmer = '';
            itmer = `
                <div>
                <a href="http://127.0.0.1:8080/h5/yiguo/src/html/details.html?sid=0">
                <img src="${data[0].url}" alt="">
                </a>
                <a href="http://127.0.0.1:8080/h5/yiguo/src/html/details.html?sid=1">
                <img src="${data[1].url}" alt="">
                </a>
                <a href="http://127.0.0.1:8080/h5/yiguo/src/html/details.html?sid=2">
                <img src="${data[2].url}" alt="">
                </a> 
                </div>
                <div>
                <a href="http://127.0.0.1:8080/h5/yiguo/src/html/details.html?sid=3">
                <img src="${data[3].url}" alt="">
                </a>
                <a href="http://127.0.0.1:8080/h5/yiguo/src/html/details.html?sid=4">
                <img src="${data[4].url}" alt="">
                </a>
                <a href="http://127.0.0.1:8080/h5/yiguo/src/html/details.html?sid=5">
                <img src="${data[5].url}" alt="">
                </a> 
                </div>
            `;
            Array.from(mainShop).forEach(elm => {
                elm.innerHTML += itmer;
            });

        })
}

// 轮播图效果
function banner() {
    var bannerImg = document.querySelectorAll('.banner>img');
    setInterval(function() {
        var i = 0;
    }, 1000);
}

export { render }; //导出模块