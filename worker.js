addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const { message } = await request.json();
    const telegramResponse = await sendToTelegram(message);
    return new Response(JSON.stringify(telegramResponse), {
        headers: { 'Content-Type': 'application/json' }
    });
}

async function sendToTelegram(message) {
    const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });

    return response.json();
}
