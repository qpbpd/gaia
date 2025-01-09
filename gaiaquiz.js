const axios = require("axios");
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getCurrentMoscowTime = () => {
    const date = new Date();
    // Получаем время UTC+3
    const moscowTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    return moscowTime.toISOString().replace('T', ' ').substring(0, 19);
};

;(async () => {
    try {
        console.log('Goyda Net By [Cryptohomo Industries]\n\n');
        const addressList = await fs.readFileSync('keyword.txt', 'utf-8');
        const addressListArray = await addressList.split('\n');

        for (let index = 11; index < addressListArray.length; index++) {
            const Wallet = addressListArray[index];
            console.log("Content Chat: " + Wallet + "\n");

            try {
                const response = await axios.post(
                    'https://.us.gaianet.network/v1/chat/completions',
                    {
                        'messages': [
                            {
                                'role': 'system',
                                'content': 'You are a helpful assistant.'
                            },
                            {
                                'role': 'user',
                                'content': `${Wallet}`
                            }
                        ]
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log("Response: [" + response.data.choices[0].message.content + "]\n");
                
                
                console.log("Last message sent at (MSK, UTC+3): " + getCurrentMoscowTime() + "\n");

                                
                await delay(10);

            } catch (postError) {
                console.error("Error during axios post: ", postError);
            }
        }
    } catch (error) {
        console.error("Error: ", error);
    }
})();
