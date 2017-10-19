const sheet = document.createElement('style'),
    $rangeInput = $('.range input'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
document.head.appendChild(sheet);
const getTrackStyle = function (el) {
    const curVal = el.value;
    const val = (curVal - 2015) * 1.176470588;
    var style = '';
    $('.range-labels li').removeClass('active selected');
    $('.year').removeClass('active-year selected-year');
    const curLabel = $('.range-labels').find('li:nth-child(' + (curVal - 2010) / 5 + ')');
    curLabel.addClass('active selected');
    curLabel.prevAll().addClass('active selected');
    const curYear = $("#bar-svg").find('rect:nth-child(' + (curVal - 2005) / 5 + ')');
    curYear.addClass('active-year selected-year');
    curYear.prevAll().addClass('selected-year');
    for (var i = 0; i < prefs.length; i++) {
        style += '.range {background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #fff ' + val + '%, #fff 100%)}';
        style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #0099cb ' + val + '%, #0099cb 100%)}';
    }
    return style;
};
$rangeInput.on('input', function () {
    sheet.textContent = getTrackStyle(this);
    renderMap();
    renderPyramid();
});
$('.range-labels li').on('click', function () {
    const index = $(this).index();
    $rangeInput.val(index * 5 + 2015).trigger('input');
});
$("#country-input").change(function () {
    const name = $("#country-input").val();
    drawBar(nameToValues[name]);
    renderPyramid();
});

$('#type-input').change(function () {
    dataInput();
});
dataInput();