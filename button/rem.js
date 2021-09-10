// 适配移动端 100px = 1rem
(function (doc, win) {
    let docEle = doc.documentElement;
    let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let resizeCalc = function () {
        let clientWidth = docEle.clientWidth;
        if (!clientWidth) return false;
        if (clientWidth >= 750) {
            docEle.style.fontSize = '100px';
        } else {
            docEle.style.fontSize = 100 * (clientWidth / 750) + 'px';
        }
    }
    if (!doc.addEventListener) return false;
    win.addEventListener(resizeEvent, resizeCalc, false);
    doc.addEventListener('DOMContentLoaded', resizeCalc, false);
})(document, window);