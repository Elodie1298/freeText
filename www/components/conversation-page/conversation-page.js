conv = {
    title: 'Victor',
    messages: [
        {
            author: 'Victor',
            content: 'Coucou toi !',
            time: 1573828263001
        },
        {
            author: 'Boubou',
            content: 'Hey !',
            time: 1573833902257
        },
        {
            author: 'Victor',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis urna ligula, non volutpat felis pretium eget. Curabitur non consequat dolor. Praesent pretium vestibulum tortor, vel viverra nisi malesuada convallis. Phasellus vel libero laoreet, commodo augue a, tristique dolor. Suspendisse potenti. Curabitur sed sollicitudin libero. Integer venenatis blandit lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur et nibh eu leo aliquet ultrices sit amet in velit. Vestibulum tincidunt commodo metus at dignissim.\n' +
                '\n' +
                'Cras pellentesque dapibus tempus. Praesent lobortis nibh eros, nec pharetra turpis finibus at. Curabitur vitae erat orci. Curabitur iaculis lorem in lectus aliquam, quis viverra ipsum porta. Sed convallis ultricies blandit. Sed sit amet nunc sed odio consectetur vulputate vitae eu nulla. Curabitur viverra ipsum vulputate imperdiet imperdiet. Donec vel efficitur mi. Fusce et arcu iaculis, efficitur dui ut, gravida nulla. Aliquam aliquam est enim, non dignissim nulla pellentesque vel. Fusce iaculis condimentum mauris, ac pulvinar mauris auctor volutpat. Aliquam mi velit, rutrum ut velit vitae, ultrices posuere augue.',
            time: 1573853902257
        },
        {
            author: 'Victor',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis urna ligula, non volutpat felis pretium eget. Curabitur non consequat dolor. Praesent pretium vestibulum tortor, vel viverra nisi malesuada convallis. Phasellus vel libero laoreet, commodo augue a, tristique dolor. Suspendisse potenti. Curabitur sed sollicitudin libero. Integer venenatis blandit lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur et nibh eu leo aliquet ultrices sit amet in velit. Vestibulum tincidunt commodo metus at dignissim.\n' +
                '\n' +
                'Cras pellentesque dapibus tempus. Praesent lobortis nibh eros, nec pharetra turpis finibus at. Curabitur vitae erat orci. Curabitur iaculis lorem in lectus aliquam, quis viverra ipsum porta. Sed convallis ultricies blandit. Sed sit amet nunc sed odio consectetur vulputate vitae eu nulla. Curabitur viverra ipsum vulputate imperdiet imperdiet. Donec vel efficitur mi. Fusce et arcu iaculis, efficitur dui ut, gravida nulla. Aliquam aliquam est enim, non dignissim nulla pellentesque vel. Fusce iaculis condimentum mauris, ac pulvinar mauris auctor volutpat. Aliquam mi velit, rutrum ut velit vitae, ultrices posuere augue.',
            time: 1573863902257
        }
    ],
    participants: [
        {
            name: 'Victor',
            thumbnail: 'img/logo.png'
        }
    ]
};

function initConversationPage(conversationId) {
    return new Promise(resolve => {
        $('#conversation-page').load('components/conversation-page/conversation-page.html', _ => {
            // TODO: get conversation from server

            let messageList = conv.messages.sort(((a, b) => b.time - a.time));

            addMessage(0, messageList)
                .then(_ => resolve(true));
        });

        function addMessage(id, list) {
            return new Promise(resolve1 => {
                if (id < list.length) {
                    let messageList = document.getElementById('message-list');
                    let message = list[id];
                    let listElement = document.createElement('li');
                    listElement.setAttribute('id', 'message-' + message.time);
                    messageList.appendChild(listElement);
                    resolve1(initMessage(message, isUserMessage(message))
                        .then(_ => addMessage(id + 1, list)));
                } else {
                    resolve1(true);
                }
            });
        }

        function isUserMessage(message) {
            for (let person of conv.participants) {
                if (person.name === message.author) {
                    return false;
                }
            }
            return true;
        }
    });
}
