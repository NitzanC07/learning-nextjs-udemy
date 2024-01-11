import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";
// import { MongoClient } from "mongodb";

/**
 * ! הפונקציה הזאת היא למעשה משתמשת בהכנה מראש של העמוד, מושכת המידע ומכינה את העמוד
 * ! מראש (#1). לאחר מכן היא אוספת את המידע כמאפיינים (#2)  ובונה את העמוד איתם (#3).
 *
 * ! הכפתור "הצגת פרטים" (#4) מריץ את הפונקציה שאחראית על ניתוב דינמי, כדי להציג פריט אחד
 * ! רצוי. בעת לחיצה על הכפתור נשלח גם סימן הזיהוי של הפריט כפרמטר, אשר בפרמטר הזה הפונקציה
 * ! משתמשת כדי לאתחל את הניתוב הדינמי (#5), ולקבל חזרה את המידע ולעדכן את הסטייט (#6).
 */

function FeedbackPage(props /* #2 */) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`) // #5
      .then((response) => response.json())
      .then((data) => 
        setFeedbackData(data.feedback)
        ); // #6
  }

  return (
    <ul>
      {feedbackData && <p>{feedbackData.email}</p>}
      {/** #3 */}
      {
          props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadFeedbackHandler(item.id)}>
              {" "}
              {/* #4 */}
              Show details
            </button>
          </li>
        ))
      }
    </ul>
  );
}

// #1
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  // const client = await MongoClient.connect('mongodb+srv://nitzancohen:jqRbYV7bsBPdi1pS@clusternitzanlearn.nwagouk.mongodb.net/');
  // const db = client.db();
  // const allFeedbackDB = await db.collection('feedbacks').find().toArray();
  // console.log(allFeedbackDB);

  return {
    props: { feedbackItems: data },
  };
}

export default FeedbackPage;
