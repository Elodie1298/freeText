function initMessage(message, isUserMessage) {
    return new Promise(resolve => {
        $('#message-' + message.time)
            .load('components/message/message.html', _ => {
                const messageElement = document.getElementById('message-' + message.time);

                if (isUserMessage) {
                    messageElement.classList.add('user');
                }

                const content = messageElement.getElementsByClassName('content')[0];
                content.innerText = message.content;

                const information = messageElement.getElementsByClassName('information')[0];
                information.innerText = message.author + ' - ' + new Date(message.time).toLocaleString();

                resolve(true);
            });
    });
}
