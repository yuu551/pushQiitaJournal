const baseMessage = require("./flexMessage.json");

const makeMessages = (journals) => {
  const flexMessages = journals.map((journal) => {
    const flexMessage = Object.assign(
      {},
      JSON.parse(JSON.stringify(baseMessage))
    );
    //flexMessage.body.contents[0].contents[0].contents[0].url = "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/563635/436ff1372bda97307d3438c4e67df5599bf74d6d/large.png?1578460821"
    flexMessage.body.contents[0].contents[1].contents[0].contents[2].text =
      journal.title;
    flexMessage.action.uri = journal.url;
    return {
      type: "flex",
      altText: "#",
      ...flexMessage,
    };
  });
  return flexMessages;
};

module.exports = makeMessages;
