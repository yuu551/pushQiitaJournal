const axios = require("axios");

const DEFAULT_PARAMS = {
  PAGE: 1,
  PER_PAGE: 3,
  STOCKS: 10,
};

const getJournals = async (params = DEFAULT_PARAMS) => {
  const targetDate = new Date();
  //今日の日付から一週間前を設定
  targetDate.setDate(targetDate.getDate() - 7);
  //YYYY-MM-DD部分だけ抽出
  const dateBeforeWeek = targetDate.toISOString().split("T")[0];
  const qiitaURL = `https://qiita.com/api/v2/items?page=${params.PAGE}&per_page=${params.PER_PAGE}&query=created:>${dateBeforeWeek}+stocks:>${params.STOCKS}`;
  try {
    const result = await axios.get(qiitaURL);
    const journalList = result.data.map((journal) => {
      return {
        title: journal.title,
        url: journal.url,
        profile_image_url: journal.user.profile_image_url,
        likes_count: journal.likes_count,
        stocks_count: journal.stocks_count,
        name: journal.user.name,
      };
    });
    return journalList;
  } catch (error) {
    console.log(`エラー: ${error.statusMessage}`);
    console.log(error.originalError.response.data);
  }
};

module.exports = getJournals;
