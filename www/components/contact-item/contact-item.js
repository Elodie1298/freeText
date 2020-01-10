function initContactItem(contact) {
    return new Promise(resolve => {
        let contactList = document.getElementById('contact-list');

        let item = document.createElement('li');
        item.setAttribute('id', 'contact-' + contact.id);

        contactList.appendChild(item);

        $('#contact-' + contact.id)
            .load('components/contact-item/contact-item.html', _ => {
                let image = item.getElementsByTagName('img')[0];
                image.setAttribute('src',
                    contact.photos == null ? 'img/logo.png' : contact.photos[0].value);

                let name = item.getElementsByClassName('name')[0];
                name.innerText = contact.displayName;

                resolve(true);
            });
    });
}
