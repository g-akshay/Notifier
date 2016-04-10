chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('main.html', {
            // 'id' serves two purposes: first, it prevents you from opening
            // more than one instance of the app second it will cause the 
            // position/dimensions of the window to be restored when it's reopened.
            'id': 'Notifier',
            'outerBounds': {
                'width': 800,
                'height': 600,
                'minWidth': 600,
                'minHeight': 400
            },
            'resizable': true
        },
        function(appWindow) {
            // callback code
        });
});

chrome.runtime.onInstalled.addListener(function() {
    console.log('app installed');
});

chrome.runtime.onSuspend.addListener(function() {
    console.log('app suspened.');
});


chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    console.log(token);
    // add check for token existance, if not store locally and ask login again at some point

    chrome.syncFileSystem.requestFileSystem(function(fs) {
        // FileSystem API should just work on the returned 'fs'.
        console.log(fs);
        fs.root.getFile('notifier.txt', { create: true });
    });
});


/*(function show(options) {
    var title = "Time for a Walk";

    if (Notification.permission === "granted") {
        new Notification(title, {
            body: 'Time to make the toast.',
            icon: 'icons/48.png',
            tag: 'groupId',
            dir: 'ltr',
            requireInteraction: false // sticky
        });
    }    
})();*/

/*chrome.notifications.create("a", {
    "type": "basic",
    "iconUrl": "icons/48.png",
    "message": "Time to make the toast.",
    "title": "sdf"
});
*/
