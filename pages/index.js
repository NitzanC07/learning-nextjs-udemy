import path from "path";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * * Section 9 - API Routes
 * * Create POST and GET requests with API and write and read data from a file.
 */

function HomePage(props) {
  const { products } = props;

  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    /**
     * ! הפונקציה הזאת מופעלת לאחר שליחת המידע שמוזן לטופס.
     * ! היא אוספת את הנתונים בשלב הראשון (1), מארגנת אותם במבנה מסודר (2),
     * ! שולחת בקשת שרת עם הפרמטרים הרלוונטיים (3), ומקבלת תגובה חזרה (4)
     */
    event.preventDefault();

    const enteredEmailUser = emailInputRef.current.value; // *1
    const enteredFeedbackUser = feedbackInputRef.current.value;

    const dataForm = { email: enteredEmailUser, text: enteredFeedbackUser }; // *2

    fetch("/api/feedback", {
      // *3
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) // *4
      .then((data) => console.log(data)); // *4
  }

  function loadFeedbackHandler() {
    /**
     * ! הפונקציה מופעלת כאשר יש בקשה מצד הלקוח לקרוא את הנתונים.
     * ! בעת הרצת הפונקציה נשלחת בקשת קריאה, שהיא ברירת המחדל, לכן אין הכרח
     * ! לציין זאת בגוף הבקשה, אלא רק לציין את הנתיב של הבקשה.
     */
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback))
  }

  return (
    <main>
      <h1>Home Pgae</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button type="submit">Send feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {
          feedbackItems.map(item => (
            <li key={item.id}>{item.text}</li>
          ))
        }
      </ul>
    </main>
  );
}

export default HomePage;
