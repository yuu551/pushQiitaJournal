//基本パラメータ
//後で変更できるように外出ししておく。
const PAGE = 1;
const PER_PAGE = 4;
const STOCKS = 10;
const axios = require("axios");

const getJournals = async () => {
  const targetDate = new Date();
  //今日の日付から一週間前を設定
  targetDate.setDate(targetDate.getDate() - 7);
  //YYYY-MM-DD部分だけ抽出
  const weekBeforeDay = targetDate.toISOString().split("T")[0];
  const qiitaURL = `https://qiita.com/api/v2/items?page=${PAGE}&per_page=${PER_PAGE}&query=created:>${weekBeforeDay}+stocks:>${STOCKS}`;

  const result = await axios.get(qiitaURL);
  const journalList = result.data.map((journal) => {
    return {
      title: journal.title,
      url: journal.url,
    };
  });
  return journalList;
};

module.exports = getJournals;
