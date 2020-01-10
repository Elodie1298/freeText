
let initContactListPage = new Promise(resolve => {
    $('#contact-list-page').load('components/contact-list-page/contact-list-page.html', _ => {

        initFooter('contact-list-page')
            .then(_ => resolve(true));
    });
});

function findallContacts() {
    return new Promise(resolve => {
        let options = new ContactFindOptions();
        options.filter = '';
        options.multiple = true;
        let fields = [
            navigator.contacts.fieldType.id,
            navigator.contacts.fieldType.name,
            navigator.contacts.fieldType.photos
        ];
        navigator.contacts.find(fields,
            contacts => {
                loadContact(contacts, 0)
                    .then(_ => resolve(true));
            },
            error => console.log(error),
            options);
    });
}

function loadContact(contacts, i) {
    return new Promise(resolve => {
        if (i < contacts.length) {
            if (contacts[i].displayName == null) {
                resolve(loadContact(contacts, i + 1));
            } else {
                resolve(initContactItem(contacts[i])
                    .then(_ => loadContact(contacts, i + 1)));
            }
        }
        resolve(true);
    });
}
