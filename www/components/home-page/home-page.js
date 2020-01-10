let conversations = [
    {
        id: 1,
        title: 'Boubou',
        lastMessage: {
            author: 'Victor',
            content: 'Coucou toi !',
            time: 1573828263001
        },
        participants: [
            {
                name: 'Victor',
                thumbnail: 'img/logo.png'
            }
        ]
    },
    {
        id: 2,
        title: 'Boubou',
        lastMessage: {
            author: 'Victor',
            content: 'Coucou toi !',
            time: 1573828263001
        },
        participants: [
            {
                name: 'Victor',
                thumbnail: 'img/logo.png'
            }
        ]
    },
    {
        id: 3,
        title: 'Boubou',
        lastMessage: {
            author: 'Victor',
            content: 'Coucou toi !',
            time: 1573833902257
        },
        participants: [
            {
                name: 'Victor',
                thumbnail: 'img/logo.png'
            }
        ]
    },
    {
        id: 4,
        title: 'Boubou',
        lastMessage: {
            author: 'Victor',
            content: 'Coucou toi !',
            time: 1573828263001
        },
        participants: [
            {
                name: 'Victor',
                thumbnail: 'img/logo.png'
            }
        ]
    },
    {
        id: 5,
        title: 'Boubou',
        lastMessage: {
            author: 'Victor',
            content: 'Coucou toi !',
            time: 1573828263001
        },
        participants: [
            {
                name: 'Victor',
                thumbnail: 'img/logo.png'
            }
        ]
    },
];

let initHomePage = new Promise(resolve => {
    $('#home-page').load('components/home-page/home-page.html', _ => {
        // TODO: get conversations from server
        let conversationList = conversations.sort(((a, b) => b.lastMessage.time - a.lastMessage.time));

        addConversation(0, conversationList)
            // .then(_ => initFooter('home-page'))
            .then(_ => resolve(true));
    });

    let addConversation = (id, list) => {
        return new Promise(resolve1 => {
            if (id < list.length) {
                let conversationList = document.getElementById('conversation-list');
                let conversation = list[id];
                let listElement = document.createElement('li');
                listElement.setAttribute('id', 'conversation-item-'+conversation.id);
                conversationList.appendChild(listElement);
                resolve1(initConversationItem(conversation)
                    .then(_ => addConversation(id + 1, list)));
            } else {
                resolve1(true);
            }
        });
    }
});
