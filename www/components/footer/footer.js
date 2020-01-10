function initFooter(currentPage) {
    return new Promise(resolve => {
        $('#' + currentPage + '-footer').load('components/footer/footer.html', _ => {
            let footer = document.getElementById(currentPage + '-footer');

            let activatedTab = footer.getElementsByClassName('nav-' + currentPage)[0];

            let contactsLink = footer.getElementsByClassName('nav-contact-list-page')[0];
            contactsLink.addEventListener('click', _ => {goToContactListPage()});

            activatedTab.classList.add('ui-btn-active');

            resolve(true);
        })
    })
}

function goToContactListPage() {
    window.location = '#contact-list-page';
}
