$(document).ready(function() {
    $(".button-collapse").sideNav();

    $('.modal-trigger').leanModal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: 0.5, // Opacity of modal background
        in_duration: 200, // Transition in duration
        out_duration: 150, // Transition out duration
        ready: function() {}, // Callback for Modal open
        complete: function() {} // Callback for Modal close
    });

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 5,
        min: new Date(),
        closeOnSelect: true,
        closeOnClear: true,
        today: 'Today',
        clear: 'Clear',
        close: 'Close',
        onSet: function(context) {
            setTimeout(function() {
                $('#oneTime').focus();
            }, 100);
        }
    });

    $('.timepicker').pickatime({
        closeOnSelect: true,
        closeOnClear: true,
        interval: 60,
        formatLabel: function(time) {
            var hours = (time.pick - this.get('now').pick) / 60,
                label = hours < 0 ? ' !hours to now' : hours > 0 ? ' !hours from now' : 'now'
            return 'h:i a <sm!all>' + (hours ? Math.abs(hours) : '') + label + '</sm!all>'
        },
        onSet: function(context) {
            setTimeout(function() {
                $('#daily').focus();
            }, 100);
        },
        clear: 'clear'
    });

    $('select').material_select();

    /*setTimeout(function() {
        $('#mainCon').show();
        $('#splashScreen').fadeOut();
    }, 1500);*/

    $('#splashScreen').hide();

});

$('body').on('click', '#firstNotifier, #addNotification', function() {
    // TODO: store the opened notification id somewhere
    $('#create').openModal();
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
