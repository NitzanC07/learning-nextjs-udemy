import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath); // * #5
  const data = JSON.parse(fileData); // * #6
  return data;
}

async function handler(req, res) {
  /**
   * ! הפונקציה מקבלת בקשות מצד הלקוח ובודקת קודם כל אם זו בקשה לכתיבת נתונים (#1), אם כן
   * ! אז היא אוספת את המידע שהיא מקבלת מגוף הבקשה (#2), מארגנת אותם במבנה מסודר
   * ! של אובייקט ומוסיפה למידע החדש סימן זיהוי הייחודי (#3). לאחר מכן הפונקציה
   * ! משתמשת בנתיב אל הקובץ שבו כל המידע מהטופס נשמר (#4), קוראת את הקובץ והופכת
   * ! את המידע בו למבנה ג'ייסון (#5), מוסיפה את המידע החדש שהתקבל למידע הקיים (#6), וכותבת
   * ! מחדש את המידע המעודכן חזרה לקובץ השמירה (#7). לבסוף הפונקציה מחזירה תגובה שהתהליך
   * ! הסתיים בהצלחה (#8).
   */

  // ! השורה הבאה יוצרת חיבור למאגר הנתונים.
  const client = await MongoClient.connect(
    "mongodb+srv://nitzancohen:jqRbYV7bsBPdi1pS@clusternitzanlearn.nwagouk.mongodb.net/"
  );

  // * #1
  if (req.method === "POST") {
    // ! בקטע הקוד הזה מתבצע איסוף נתונים מתוך בקשת הלקוח.
    const email = req.body.email; // * #2
    const feedbackText = req.body.text; // * #2

    // ! בקטע הקוד המידע שהתקבל מהבקשה מאורגן באובייקט מסודר, כיחידת מידע שלמה.
    const newFeedback = {
      feedbackId: new Date().toString(), // * #3
      email: email,
      text: feedbackText,
    };

    // ! בקטע הקוד הזה מתבצעת כתיבה של הנתונים שהתקבלו בבקשה לתוך הקובץ שיצרנו בתוך הפרויקט.
    const filePath = buildFeedbackPath(); // * #4
    const data = extractFeedback(filePath); // * #5
    data.push(newFeedback); // * #6
    fs.writeFileSync(filePath, JSON.stringify(data)); // * #7

    // ! בקטע הקוד הבא נעשית שליחת של המידע למאגר נתונים של מונגו די בי, מחוץ לאפליקציה.
    const db = client.db();

    await db.collection("feedbacks").insertOne(newFeedback);
    client.close();

    // ! שליחת תגובה מהשרת ללקוח שהמידע התקבל.
    res.status(201).json({ message: "Success", feedback: newFeedback }); // * #8
  } else {
    /**
     * ! אם לא, כלומר בקשת צד הלקוח היא כדי לקרוא נתונים, אז היא צריכה לגשת לקובץ (#1)
     * ! לקרוא אותו (#2) ולהחזיר אותו חזרה לצד הלקוח כמו שהוא בצורת אובייקט ג'ייסון (#3).
     */
    const filePath = buildFeedbackPath(); // * #1
    const data = extractFeedback(filePath); // * #2

    /**
     * ! באופן מציאותי יותר, במקום לשמור את המידע בקובץ פנימי בתוך הפרויקט, אנחנו נשמור
     * ! אותו במאגר נתונים (לדוגמא מונגו די.בי), ונשלוף אותו משם באופן הבא.
     */
    const db = client.db();
    const allFeedback = await db.collection("feedbacks").find().toArray();
    client.close();
    
    res.status(200).json({ feedback: allFeedback }); // * #3
  }
}

export default handler;
