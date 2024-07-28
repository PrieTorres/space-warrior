import { useCallback, useEffect, useState, useRef } from "react";
import { BigLetter } from "../BigLetter/BigLetter";
import styles from "./NameInput.module.scss";

export const NameInput = ({ limit = 10, onChange }) => {
  const [name, setName] = useState("aaa");
  const inputRef = useRef(null);

  const nameInputHandler = useCallback((e) => {
    const letter = e.key;
    if (letter === "Backspace") {
      return setName(`${name.substring(0, (name.length - 1))}`)
    }
    if (name.length >= limit) return;
    if (letter.length > 1) return;
    if (!letter.match(/\w/ig)) return;

    setName(name + letter);
  }, [name, setName, limit]);

  useEffect(() => {
    window.addEventListener("keydown", nameInputHandler);

    return () => window.removeEventListener("keydown", nameInputHandler);
  }, [nameInputHandler]);

  useEffect(() => {
    onChange(name)
  }, [name, onChange]);

  return (
    <div className={styles.container}>
      <input ref={inputRef} type="text" value={name} onChange={nameInputHandler} autoFocus style={{ display: "none" }} />
      <div style={{ display: "flex", gap: 6 }} onClick={() => inputRef?.current?.focus()}>
        {name.split("").map((letter, i) => (
          <BigLetter
            key={`big-letter-${i}-${letter}`}
            letter={letter}
            active={i === (name.length - 1)}
          />
        ))}
      </div>
    </div>
  )
}
