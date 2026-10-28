/**
 * Telegram AutoBot for POS & IT System Alerts
 * -------------------------------------------
 * Features:
 * - Sends instant alerts when a POS workstation starts up or goes offline
 * - Daily sales/cashier closing summary notification
 * - Quick response commands (/status, /printer, /help)
 *
 * Setup:
 * 1. Create a bot with @BotFather on Telegram to get your BOT_TOKEN.
 * 2. Get your CHAT_ID using @userinfobot or channel ID.
 * 3. Run: node telegram-pos-bot.js
 */

const https = require('https');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

/**
 * Send message to Telegram Chat / Group
 * @param {string} text
 */
function sendTelegramMessage(text) {
  if (BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN') {
    console.log('[Notice] Please provide your real TELEGRAM_BOT_TOKEN to send messages.');
    console.log('Message preview:', text);
    return;
  }

  const payload = JSON.stringify({
    chat_id: CHAT_ID,
    text: text,
    parse_mode: 'HTML',
  });

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      console.log('Telegram response status:', res.statusCode);
    });
  });

  req.on('error', (err) => {
    console.error('Error sending Telegram alert:', err.message);
  });

  req.write(payload);
  req.end();
}

// Example usage: POS Startup Alert
function notifyStationOnline(stationName) {
  const time = new Date().toLocaleString();
  const message = `🟢 <b>POS Station Online</b>\nStation: <code>${stationName}</code>\nStatus: Printers & Software Active\nTime: ${time}`;
  sendTelegramMessage(message);
}

// Example usage: Daily Cashier Closing Summary
function notifyDailyClose(stationName, totalSales, invoiceCount) {
  const time = new Date().toLocaleDateString();
  const message = `📊 <b>Daily Shift Summary</b>\nStation: ${stationName}\nDate: ${time}\nInvoices: ${invoiceCount}\nTotal Sales: <b>$${totalSales}</b>`;
  sendTelegramMessage(message);
}

// Export for integration into other scripts
module.exports = {
  sendTelegramMessage,
  notifyStationOnline,
  notifyDailyClose,
};

if (require.main === module) {
  console.log('Testing Telegram Bot Notification:');
  notifyStationOnline('Station 1 - Restaurant POS');
}
