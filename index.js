const line = require("@line/bot-sdk");
require("dotenv").config();
const getJournals = require("./getJournals");
const makeMessages = require("./makeMessages")

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

exports.helloPubSub = async (event, context) => {
  const journals = await getJournals();
  const journalsMessages = makeMessages(journals)
  const messages = [
    {
      type: "text",
      text: "本日の上位記事3件です！",
    },
    ...journalsMessages,
  ];

  try {
    const res = await client.broadcast(messages);
    console.log(res);
  } catch (error) {
    console.log(`エラー: ${error.statusMessage}`);
    console.log(error.originalError.response.data);
  }
};