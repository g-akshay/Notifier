var notifier = {};
var helper = (function() {
    var showInitState,
        hideInitState,
        openModal,
        setModalData,
        getModalData,
        manageRadio,
        generateTemplate,
        initializeMasonry,
        initializeComponents;

    showInitState = function() {
        $('#firstNotifier').show();
        $('.options-fab').hide();
    };

    hideInitState = function() {
        $('#firstNotifier').hide();
        $('.options-fab').show();
    };

    openModal = function(state) {
        // TODO: store the opened notification id somewhere
        switch (state) {
            case 'create':
                $('#create').openModal();
                helper.manageRadio();
                break;

            case 'edit':
                $('#create').openModal();
                // add manage radio insode data setter
                break;

            default:
                break;
        }
    };

    setModalData = function() {

    };

    getModalData = function() {

    };

    manageRadio = function(name) {

        $('.frequency-selector').addClass('hidden');

        var selector = '';

        switch (name) {
            case 'daily':
                selector = '#time';
                break;

            case 'weekly':
                selector = '#weekDay, #time';
                break;

            case 'monthly':
                selector = '#monthFrequency, #days, #time';
                break;

            case 'oneTime':
                selector = '#date, #time';
                break;

            case 'minHour':
            default:
                selector = '#timeCombo';
                break;
        }

        $(selector).removeClass('hidden');
    };

    generateTemplate = function(templateName, dataArray, outputSelector) {
        $("#templates").load("templates.html #" + templateName, function() {
            var template = document.getElementById(templateName).innerHTML;

            $.each(dataArray, function(i, data) {
                var finalHtml = $(Mustache.render(template, data));
                $(outputSelector).append(finalHtml).masonry('appended', finalHtml);
            });
            //$("#cards-con").masonry(); // to reload layouting
        });
    };

    initializeMasonry = function() {
        notifier.$cardGrid = $('#cards-con').masonry({
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
    };
    initializeComponents = function() {
        // mneu collapse
        $(".button-collapse").sideNav();

        // combo box
        $('select').material_select();

        // modal init
        $('.modal-trigger').leanModal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: 0.5, // Opacity of modal background
            in_duration: 200, // Transition in duration
            out_duration: 150, // Transition out duration
            ready: function() {}, // Callback for Modal open
            complete: function() {} // Callback for Modal close
        });

        // date picker
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

        //time picker
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
    };

    return helper = {
        showInitState: showInitState,
        hideInitState: hideInitState,
        openModal: openModal,
        setModalData: setModalData,
        getModalData: getModalData,
        manageRadio: manageRadio,
        generateTemplate: generateTemplate,
        initializeMasonry: initializeMasonry,
        initializeComponents: initializeComponents
    };

})();

$(document).ready(function() {
    /* SPLASH SCREEN */
    setTimeout(function() {
        $('#mainCon').show();
        $('#splashScreen').fadeOut();
    }, 3000);

    $('#splashScreen').show();

    helper.initializeComponents();
    helper.initializeMasonry();

    var dummyData = [{
        title: 'notification titel',
        message: 'message body',
        frequency: 'repeats daily'
    }];

    helper.generateTemplate('card', dummyData, '#cards-con');
});

// EVENT BINDINGS

$('body').on('click', '#firstNotifier, #addNotification', function() {

    helper.openModal('create');

}).on('click', '.edit', function(e) {

    e.preventDefault();
    e.stopPropagation();
    helper.openModal('edit');

}).on('click', '.disable', function(e) {

    e.preventDefault();
    e.stopPropagation();

}).on('click', '.delete', function(e) {

    e.preventDefault();
    e.stopPropagation();

}).on('change', 'input[type=radio][name=frequency]', function() {

    helper.manageRadio($(this).val());

});
