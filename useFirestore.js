const Firestore = require("@google-cloud/firestore");
const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;
require("dotenv").config();

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_FILE_NAME,
});

/**
 * 一度送信したことがある記事を除外して、3件のみ返却する。
 * @module excludeExistedJournals
 * @param {List} journals - 取得した記事の一覧
 */
const excludeExistedJournals = async (journals) => {
  //FireStoreから記事の一覧を取得
  const snapshot = await db.collection("journals").get();
  const existedjournals = snapshot.docs
    .map((doc) => {
      return doc.data();
    })
    .map((journal) => journal.id);

  //記事が0件ならそのまま３件返却する。
  if (existedjournals.length === 0) return journals.slice(0, 3);

  return journals
    .filter((journal) => {
      return existedjournals.includes(journal.id) === false;
    })
    .slice(0, 3);
};

/**
 * FireStoreに送信した記事を追加する。
 * @module writeSendJournals
 * @param {List} journals - 書き込みたい記事の一覧
 */
const writeSendJournals = async (journals) => {
  journals.forEach(async (journal) => [
    await db.collection("journals").add({
      id: journal.id,
      created_at: FieldValue.serverTimestamp(),
    }),
  ]);
};

module.exports = {
  excludeExistedJournals: excludeExistedJournals,
  writeSendJournals: writeSendJournals,
};
