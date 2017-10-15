const sheet = document.createElement('style'),
    $rangeInput = $('.range input'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
document.head.appendChild(sheet);
const getTrackStyle = function (el) {
    const curVal = el.value;
    const val = (curVal - 2015) * 1.176470588;
    let style = '';
    $('.range-labels li').removeClass('active selected');
    $('rect').removeClass('active-year selected-year');
    const curLabel = $('.range-labels').find('li:nth-child(' + (curVal - 2010) / 5 + ')');
    curLabel.addClass('active selected');
    curLabel.prevAll().addClass('active selected');
    const curYear = $("svg").find('rect:nth-child(' + (curVal - 2005) / 5 + ')');
    curYear.addClass('active-year selected-year');
    curYear.prevAll().addClass('selected-year');
    for (let i = 0; i < prefs.length; i++) {
        style += '.range {background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #fff ' + val + '%, #fff 100%)}';
        style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
    }
    return style;
};
$rangeInput.on('input', function () {
    sheet.textContent = getTrackStyle(this);
    render();
});
$('.range-labels li').on('click', function () {
    const index = $(this).index();
    $rangeInput.val(index * 5 + 2015).trigger('input');
});
$("#country-input").change(function () {
    drawBar(nameToValues[$("#country-input").val()]);
});