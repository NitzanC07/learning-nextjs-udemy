import { buildFeedbackPath, extractFeedback } from ".";

/**
 * * ניתוב דינמי לקבלת מידע מהשרת.
 * ! ראשית, הפונקציה אוספת את סימן הזיהוי של הפריט המסוים שאותו אנחנו רוצים לשלוף (#1), לאחר מכן
 * ! היא ניגשת לנתיב של הקובץ עם כל המידע וקוראת את כל המידע הקיים בו (#2). ואז היא שולפת את
 * ! את הפריט הרצוי לפי סימן הזיהוי הייחודי שלו (#3). לבסוף הפונקציה מחזירה תגובה בתור אובייקט
 * ! ג'ייסון חזרה לצד הלקוח (#4).
 */

function handler(req, res) {
  const feedbackId = req.query.feedbackId; // #1
  const filePath = buildFeedbackPath(); // #2
  const feedbackData = extractFeedback(filePath); // #2

  // #3
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
