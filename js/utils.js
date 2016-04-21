var utils = (function() {

    var writeData,
        readData,
        createAlarm,
        updateAlarm,
        stopAlarm;

    writeData = function(file, data) {
        file.createWriter(function(writer) {

            writer.onwriteend = function(e) {
                console.log('wrote to file');
            };

            writer.onerror = function(e) {
                console.log('error: ' + e);
            };

            var blob = new Blob([data]);
            writer.write(blob);

        });
    };

    readData = function(file) {

        file.file(function(obj) {

            var reader = new FileReader();
            reader.readAsText(obj);

            reader.onloadend = function(data) {
                console.log('file content: ' + this.result);
            };

        });
    };

    createAlarm = function(alarmInfo) {
        chrome.alarms.create(Date.now(), alarmInfo);
    };

    updateAlarm: function() {

    };

    stopAlarm = function() {

    };

    return utils = {
        writeData: writeData,
        readData: readData,
        createAlarm: createAlarm,
        updateAlarm: updateAlarm,
        stopAlarm: stopAlarm
    };
}());
