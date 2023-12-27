import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    /**
     * ! בשלב הראשון הפונקציה בודקת את שיטת הבקשה.
     * * POST, GET or something else.
     * ! בשלב הבא אחרי שהיא ווידאה זאת הפונקציה אוספת את המידע ושומרת במשתנים.
     */
    const email = req.body.email;
    const feedbackText = req.body.text;

    /**
     * ! בשלב הבא הפונקציה אורזת את המידע שהתקבל בתוך אובייקט מסודר.
     * ! בשלב זה גם רצוי להוסיף למידע איזה שהוא סימן ייחודי כדי להבדיל אותו משאר הפרטים הקיימים במאגר.
     * * id
     */
    const newFeedback = {
      id: new Date().toString(),
      email: email,
      text: feedbackText,
    };

    /**
     * ! בשלב זה הפונקציה מאחסנת את המידע שהתקבל במאגר נתונים או בקובץ.
     * ! הדוגמא שלהלן שומרת את המידע בקובץ נפרד בתוך הפרויקט.
     */
    const filePath = path.join(process.cwd(), "data", "feedback.json"); // יוצר נתיב לקובץ שאליו אנחנו רוצים לכתוב
    const fileData = fs.readFileSync(filePath); // קורא את הקובץ שאליו אנחנו רוצים להוסיף מידע חדש.
    const data = JSON.parse(fileData); // הופך את המידע שהתקבל לאובייקט מסוג JSON.
    data.push(newFeedback); // מוסיף את המידע החדש שהתקבל.
    fs.writeFileSync(filePath, JSON.stringify(data)); // כותב מחדש לתוך הקובץ עם המידע המעודכן.
    res.status(201).json({ message: "Success", feedback: newFeedback }); // שולח תגובה שהתהליך הצליח.
  } else {
    res.status(200).json({ message: "This works!" });
  }
}

export default handler;
