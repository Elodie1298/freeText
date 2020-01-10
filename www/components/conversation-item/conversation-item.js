function initConversationItem(conversation) {

    let getConversationItemContentMessage = function() {
        let content = '';
        content += conversation.lastMessage.author;
        content += ' : ';
        content += conversation.lastMessage.content;
        return  content;
    };

    return new Promise(resolve => {
        $('#conversation-item-' + conversation.id)
            .load('components/conversation-item/conversation-item.html', _ => {
                const item = document.getElementById('conversation-item-' + conversation.id);

                const img = item.getElementsByClassName('thumbnail')[0];
                // TODO: recover the good avatar / thumbnail
                img.setAttribute('src', 'img/logo.png');

                const title = item.getElementsByClassName('title')[0];
                title.innerText = conversation.title;

                const content = item.getElementsByClassName('content')[0];
                content.innerText = getConversationItemContentMessage(conversation);

                const link = item.getElementsByTagName('a')[0];
                link.addEventListener('click', _ => goToConversation(conversation.id));

                resolve(true);
            });
    })
}

function goToConversation(id) {
    initConversationPage(id)
        .then(_ => window.location = '#conversation-page');
    // FIXME: only the first load it shown the right way
}
