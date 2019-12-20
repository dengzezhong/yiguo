let sid = location.search.slice(5);

// 渲染页面
function render() {
    ajax({
            type: 'get',
            dataType: 'json',
            url: 'http://127.0.0.1:8080/h5/yiguo/php/getData.php'
        })
        .then(data => {
            console.log(data)
            const picPreview = document.querySelector('.pic-preview');
            const summaryName = document.querySelector('.summary-name');
            const price = document.querySelector('.pro-m1 strong');

            let itmer = '';
            let itmerSN = '';
            let imgList = data[sid].urls.split(',');
            itmer = `
            <div class="pic-big">
            <img class="j_product_img" width="500" height="500" src="${imgList[0]}" style="display:  block;">
            </div>
            <div class="pic-thumb">
                <li><img width="85" height="85" src="${imgList[0]}"></li>
                <li><img width="85" height="85" src="${imgList[1]}"></li>
                <li><img width="85" height="85" src="${imgList[2]}"></li>

            </div>
            `;
            itmerSN = `
            <h2>${data[sid].title}</h2>
            <p>${data[sid].text}</p>
            `;
            picPreview.innerHTML = itmer;
            summaryName.innerHTML = itmerSN;
            price.innerHTML = parseFloat(data[sid].price).toFixed(2);
        })

}

// shopImg切换
function shopImg() {

}

export { render };