import path from "path";
import Link from "next/link";
import { useRef } from "react";

/**
 * * API Routes
 */

function HomePage(props) {
  const { products } = props;

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    /**
     * ! באופן אוטומטי, ברגע שלוחצים על כפתור שליחת הטופס, אז העמוד נטען מחדש.
     * ! כדי למנוע את הטעינה מחדש, אנחנו צריכים להוסיף את שורת הקוד הבאה.
     */
    event.preventDefault();

    /**
     * ! בשלב זה הפונקציה מבצעת איסוף נתונים מתוך הטופס למשתנים מתאימים.
     */
    const enteredEmailUser = emailInputRef.current.value;
    const enteredFeedbackUser = feedbackInputRef.current.value;

    /**
     * ! בשלב זה הפונקציה תארוז את כל הנתונים שהיא אספה ותשלח אותם לשרת.
     * * {email: 'someone@somewhat.com', text: 'Some feedback text.'}
     */
    console.log(enteredEmailUser, enteredFeedbackUser);
    fetch("/api/feedback", {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmailUser,
        text: enteredFeedbackUser,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
    </main>
  );
}

export default HomePage;
