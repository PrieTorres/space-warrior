import { useEffect, useState } from "react";
import { BigLetter } from "../BigLetter/BigLetter";
import styles from "./NameInput.module.scss";

export const NameInput = ({ limit = 10 }) => {
  const [name, setName] = useState("aaa");

  useEffect(() => {
    const nameInputHandler = (e) => {
      const letter = e.key;
      if (name.length >= limit) return;
      if (letter.length > 1) return;
      if (!letter.match(/\w/ig)) return;

      setName(name + letter);
    }

    window.addEventListener("keydown", nameInputHandler);

    return () => window.removeEventListener("keydown", nameInputHandler);
  }, [name, limit]);

  return (
    <div className={styles.container}>
      {name.split("").map((letter, i) => (
        <BigLetter
          letter={letter}
          active={i === (name.length - 1)}
        />
      ))}
    </div>
  )
}