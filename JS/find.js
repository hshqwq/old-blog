window.addEventListener('load', () => {
    const findbox = document.querySelector('#findBox');
    const find = document.querySelector('#find');
    findbox.value = ' 搜索';
    findbox.style.color = 'black';
    findbox.style.border = '1px solid black';
    findbox.addEventListener('focus', () => {
        if(findbox.value == ' 搜索'){
            findbox.value = '';
        }
        findbox.style.color = 'dodgerblue';
        findbox.style.border = '1px solid dodgerblue';
    });
    findbox.addEventListener('blur', () => {
        if(findbox.value == ''){
            findbox.value = ' 搜索';
        }
        findbox.style.color = 'black';
        findbox.style.border = '1px solid black';
    });
    find.addEventListener('click', () => {
        if(findbox.value != ' 搜索' && findbox.value != ''){
            window.open('http://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&wd=' + findbox.value);
            findbox.value = ' 搜索';
        }
    });
});