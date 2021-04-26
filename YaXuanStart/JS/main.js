function startTime() {
    function checkTime(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
    const clock = document.querySelector('#clock');
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    // 在小于10的数字前加一个‘0’
    m = checkTime(m);
    clock.innerHTML = h + ":" + m;
    // console.log(h + ':' + m + ':' + checkTime(today.getSeconds()));
    t = setTimeout(function () { startTime() }, 1000 * 5);
};

function search(engine){
    const search = document.querySelector('#search');
    if(search.value != ''){
        if(engine == 'BD'){
            window.open('http://www.baidu.com/s?ie=utf-8&word=' + search.value);
        }else if(engine == 'GL'){
            window.open('http://www.goolge.com/search?ie=UTF-8&q=' + search.value);
        }else if(engine == 'BY-CH'){
            window.open('http://cn.bing.com/search?q=' + search.value);
        }
        if(engine == 'BD' || engine == 'GL'|| engine == 'BY-CH'){
        search.value = '';
        }
    }
}

// main
window.addEventListener('load', () => {
    // init var
    const liveBg = document.querySelector('#liveBg');
    liveBg.style.opacity = 1;
    const imgBgBox = document.querySelector('#imgBgBox');
    imgBgBox.style.display = 'none';
    const bodyBox = document.querySelector('#bodyBox');
    bodyBox.style.marginTop = '20vh'
    const search = document.querySelector('#search');
    search.value = ' search ';
    search.style.color ='#555';
    const searchEngineBox = document.querySelector('#searchEngineBox');
    let focusAt = 'none';
    // search
    search.addEventListener('mouseover', () => {
        if (focusAt != 'search') {
            bodyBox.style.marginTop = '24vh';
        }
    });
    search.addEventListener('mouseout', () => {
        if(focusAt != 'search') {
            bodyBox.style.marginTop = ''
    }
    });
    search.addEventListener('focus', () => {
        if(search.value == ' search '){
            search.value = '';
        }
        focusAt = 'search';
        bodyBox.style.marginTop = '15vh'
        searchEngineBox.style.display = 'block';
        search.style.color = 'black';
        search.style.width = '30%';
        search.addEventListener('keydown', (event) => {
            if(event.keyCode == 13 && search.value != ''){
                window.open('http://www.baidu.com/s?ie=utf-8&word=' + search.value);
                search.value = ''
            }
        })
    });
    search.addEventListener('focusout', () => {
        if(search.value == ''){
            search.value = ' search ';
            searchEngineBox.style.display = 'none';
        }
        focusAt = 'none';
        bodyBox.style.marginTop = ''
        search.style.color = '#555';
        search.style.width = '';
    });
});

// clock
window.addEventListener('load',() => {
    startTime();
});
