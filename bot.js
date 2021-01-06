const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const dotenv = require('dotenv')

dotenv.config({path:'.env'})

const token = process.env.token

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text
if(text !== '/kurs'){
  bot.sendMessage(chatId, 'Valyuta kursini bilish uchun /kurs buyrugini yuboring')}
})

bot.onText(/\/kurs/, (msg, match) => {

  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Kerakli valyutani tanlang', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '€ - EUR',
            callback_data: 'EUR'
          }, {
            text: '$ - USD',
            callback_data: 'USD'
          }, {
            text: '₽ - RUB',
            callback_data: 'RUB'
          }, {
            text: '₿ - GBP',
            callback_data: 'GBP'
          },
          {
            text: 'CAD',
            callback_data:'CAD'
          },
        //   {
        //     text: 'AED',
        //     callback_data: 'AED'
        //   },{
        //     text: 'AUD',
        //     callback_data: 'AUD'
        //   }, 
             //{
        //     text: 'CHF',
        //     callback_data:'CHF'
        //   }, {
        //     text: 'CNY',
        //     callback_data: 'CNY'
        //   }, {
        //     text: 'DKK',
        //     callback_data: 'DKK'
        //   }, {
        //     text: 'EGP',
        //     callback_data: 'EGP'
        //   }, {
        //     text: 'ISK',
        //     callback_data: 'ISK'
        //   }, {
        //     text: 'JPY',
        //     callback_data: 'JPY'
        //   }, {
        //     text: 'KRW',
        //     callback_data: 'KRW'
        //   }, {
        //     text: 'KWD',
        //     callback_data: 'KWD'
        //   },{
        //     text: 'KZT',
        //     callback_data: 'KZT'
        //   },
        //   {
        //     text: 'LBP',
        //     callback_data: 'LBP'
        //   },{
        //     text: 'MYR',
        //     callback_data: 'MYR'
        //   },{
        //     text: 'NOK',
        //     callback_data: 'NOK'
        //   },{
        //     text: 'PLN',
        //     callback_data: 'PLN'
        //   },{
        //     text: 'SEK',
        //     callback_data: 'SEK'
        //   },{
        //     text: 'SGD',
        //     callback_data: 'SGD'
        //   },{
        //     text: 'TRY',
        //     callback_data: 'TRY'
        //   }, {
        //     text: 'UAH',
        //     callback_data: 'UAH'
        //   }

          
        ]
      ]
    }
  })
})

bot.on('callback_query', query => {
  const id = query.message.chat.id;
//https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5
    
request('https://nbu.uz/en/exchange-rates/json/', function (error, response, body) {
    const data = JSON.parse(body);
    const result = data.filter(item => item.code === query.data)[0];
    const flag = {
      'EUR': '🇪🇺',
      'USD': '🇺🇸',
      'RUB': '🇷🇺',
      'UZB': '🇺🇿',
      'CAD': '🇨🇦',
      'GBP': '🇬🇧',
    //   'AED': '🇦🇪',
    //   'AUD': '🇦🇺',
    //   'CHF': '🇨🇭',
    //   'CNY': '🇨🇳',
    //   'DKK': '🇩🇰',
    //   'EGP': '🇪🇬',
    //   'ISK': '🇮🇸',
    //   'JPY': '🇯🇵',
    //   'KRW': '🇰🇷',
    //   'KWD': '🇰🇼',
    //   'KZT': '🇰🇿',
    //   'LBP': '🇱🇧',
    //   'MYR': '🇲🇾',
    //   'NOK': '🇳🇴',
    //   'PLN': '🇵🇱',
    //   'SEK': '🇸🇪',
    //   'SGD': '🇸🇬',
    //   'TRY': '🇹🇷',
    //   'UAH': '🇺🇦',

    }
    let md = `
      *${flag[result.code]} ${result.code} 💱 UZB 🇺🇿*
      Central bank price: _${result.cb_price}_
    `
    bot.sendMessage(id, md, {parse_mode: 'Markdown'});
  })
})