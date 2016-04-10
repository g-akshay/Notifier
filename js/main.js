$(document).ready(function() {
    $(".button-collapse").sideNav();
});

var m = $('.cards-con').masonry({
    itemSelector: '.card',
    columnWidth: 100,
    fitWidth: true,
    gutter: 3,
    originLeft: true,
    resize: true,
    transitionDuration: '0.2s',
    containerStyle: {
        position: 'relative'
    }
});
