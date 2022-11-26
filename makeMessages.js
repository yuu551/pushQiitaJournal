const baseMessage = require("./flexMessage.json");

const makeMessages = (journals) => {
  const flexMessages = journals.map((journal) => {
    const flexMessage = Object.assign(
      {},
      JSON.parse(JSON.stringify(baseMessage))
    );
    //user_icon
    flexMessage.body.contents[0].contents[0].contents[0].url =
      journal.profile_image_url;
    //title
    flexMessage.body.contents[0].contents[1].contents[0].contents[2].text =
      journal.title;
    //url
    flexMessage.action.uri = journal.url;
    //likes and stocks
    flexMessage.body.contents[0].contents[1].contents[1].contents[0].text = `${journal.stocks_count} Stocks 🗂️ ${journal.likes_count} Likes 👍`;
    //create_user
    flexMessage.body.contents[0].contents[1].contents[2].contents[0].text = `create by ${journal.name}`;
    return {
      type: "flex",
      altText: "#",
      contents: {
        ...flexMessage,
      },
    };
  });
  return flexMessages;
};

module.exports = makeMessages;
