import { useState, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, SetAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const entertedAmount = amountInputRef.current.value;
    const entertedAmountNumber = +entertedAmount;

    if (
      entertedAmount.trim().length === 0 ||
      entertedAmountNumber < 1 ||
      entertedAmountNumber > 5
    ) {
      SetAmountIsValid(false);
      return;
    }

    props.onAddToCart(entertedAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
