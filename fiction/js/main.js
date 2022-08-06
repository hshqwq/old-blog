const headBgList = [
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/35e8602bc83642f290d61f3fd60be214/6d85a2b9629ca4cb08dd52971d9092fb/1654430502466_LF-Sr.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/ee112643123e4896ac43a014df02da2a/8f75309d6298a3f606b8564763d400b9/1651814322000_O5nws.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/2aba199c37154f1293e50dff57b61d8e/0a4ec1f962933e30075c80002dc4bed0/1653719935865_hqWkP.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/6e9d666d00ca47248cdf3f46bb054049/0a4ec1f9627a41b302e4a9d80b04a0b2/1652105867887_SNa9H.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/45e2a07fb6974c0bbf77337eacdf60f7/d4107ab1624bb60904e00dfc00b886bc/1649128711370_PFxTR.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/a9b0f91ddc2448d7bb4f4f464c8cae01/efbc6d716243116a02b8c8ee1f397f71/1648558262329_2h5Fn.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/95e75a65d88f4e05a6e66157005e2e0c/41ae62ef622cc1760beb5466401c3693/1647075998889_CTuSr.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/9381dc36056c4e4ea1a68b3d9da77a2c/54ad1eea62064e470ee7fe5a17aefab4/1644566729767_m4UIn.mp4',
    '//zh.res.livewallpaper.giantapp.cn/livewallpaper/upload/wallpapers/44ea745671324c63bb32717ddf4a9509/bf4a0bf261d2f9a802635fcc78410cf6/1641216252585_eYxTR.mp4'
];

function createHeadPic() { // 生成随机头图
    $('#head-bg').remove();
    $('#head').prepend(`<video id="head-bg" autoplay loop muted src="${window.location.protocol + headBgList[Math.round(Math.random() * (headBgList.length - 1 + 0.4999999999999999) - 0.5)]}"></video>`);
    $(window).unbind('click keydown').one('click keydown', () => {
        $('#head-bg')[0].play();
    });
}
function load(url) {
    if (url === 'fiction/directory.html') {
        $('a#home').attr('href', '/').text('< 返回主页');
        window.history.replaceState({}, '', '');
    } else {
        $('a#home').attr('href', '/fiction').text('< 返回目录');
        window.history.replaceState({
            path: '?path=' + url
        }, '', '?path=' + url);
    }
    $('#body').load(url);
    createHeadPic();
}

$(() => {
    if (/^\?.*path=.*/g.test(window.location.search)) {
        let urls = window.location.search, url = 'fiction/directory.html';

        urls = urls.slice(1, urls.length);
        urls = urls.split(',');
        for (i in urls) {
            const _url = urls[i];
            
            if (/^path=/g.test(_url)) {
                url = _url.slice(5, _url.length);
                break;
            }
        }
        load(url);
    } else {
        load('fiction/directory.html');
    }
});