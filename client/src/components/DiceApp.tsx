
import * as React from "react";
import Dice from "react-dice-roll";

export default function DiceApp() {
  return (
    <div className="DiceApp">
      <Dice size={100} onRoll={(value) => console.log(value)} />
    </div>
  );
}
