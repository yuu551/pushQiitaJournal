const line = require("@line/bot-sdk");
require("dotenv").config();
const accessQiita = require("./accessQiita");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

exports.helloPubSub = async (event, context) => {
  const journals = await accessQiita();
  const journalsMessages = journals.map((journal) => {
    return {
      type: "text",
      text: "タイトル：" + journal.title + "URL:" + journal.url,
    };
  });
  const messages = [
    {
      type: "text",
      text: "本日の上位記事4件です！",
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
