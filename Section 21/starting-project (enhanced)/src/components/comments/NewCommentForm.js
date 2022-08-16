import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useParams } from "react-router-dom";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const params = useParams();

  const [commentIsEmpty, setCommentIsEmpty] = useState(false);
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    setCommentIsEmpty(false);

    const enteredText = commentTextRef.current.value;
    // optional: Could validate here
    if (enteredText.trim() === "") {
      setCommentIsEmpty(true);
      commentTextRef.current.focus();
    } else {
      // send comment to server
      sendRequest({
        commentData: { text: enteredText },
        quoteId: props.quoteId,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          ref={commentTextRef}
          className={commentIsEmpty ? classes.error : classes.focus}
        ></textarea>
      </div>
      <div className={classes.actions}>
        {status !== "pending" && <button className="btn">Add Comment</button>}
        {commentIsEmpty && (
          <p className="centered errorMsg">Comment cannot be empty!</p>
        )}
      </div>
    </form>
  );
};

export default NewCommentForm;
