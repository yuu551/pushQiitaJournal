const line = require("@line/bot-sdk");
require("dotenv").config();
const getJournals = require("./getJournals");
const makeMessages = require("./makeMessages");
const { excludeExistedJournals, writeSendJournals } = require("./useFirestore");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

exports.helloPubSub = async (event, context) => {
  const journals = await getJournals();
  //読んだことがある記事か確認
  const fillteredJournals = await excludeExistedJournals(journals);
  const journalsMessages = makeMessages(fillteredJournals);
  const messages = [
    {
      type: "text",
      text: `本日の上位記事${journalsMessages.length}件です！`,
    },
    ...journalsMessages,
  ];

  try {
    //Lineにメッセージを送信
    await client.broadcast(messages);
    console.log("送信に成功しました！");
    //読み込んだ後FireStoreに書き込み
    writeSendJournals(fillteredJournals);
  } catch (error) {
    console.log(`エラー: ${error.statusMessage}`);
    console.log(error.originalError.response.data);
  }
};
