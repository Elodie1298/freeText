let loadPages = new Promise(resolve => {
    initHomePage
        // .then(_ => initContactListPage)
        .then(_ => {loadAPIs()})
        .then(res => resolve(res));
});

function loadAPIs () {
    return new Promise(resolve => {
        // cordova.plugins.backgroundMode.enable();
        DatabaseService.init();
        // findallContacts()
        //     .then(res => resolve(res));
        resolve(true);
    });
}
