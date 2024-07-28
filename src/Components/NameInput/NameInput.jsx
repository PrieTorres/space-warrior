import { useEffect, useState, useRef } from "react";
import { BigLetter } from "../BigLetter/BigLetter";
import styles from "./NameInput.module.scss";

export const NameInput = ({ limit = 10, onChange }) => {
  const [name, setName] = useState("aaa");
  const inputRef = useRef(null);

  useEffect(() => {
    onChange(name);
  }, [name, onChange]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onpaste = (e) => e.preventDefault();
    }
  }, [])

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        value={name}
        autoFocus={true}
        style={{ opacity: 0, width: 0 }}
        onChange={(e) => {
          const val = e?.target?.value;
          if (val?.length > limit) return;
          if (val?.match(/\s+/ig)) return;
          setName(val);
        }}
      />
      <div
        role="button"
        className="prevent-select"
        style={{ display: "flex", gap: 6 }}
        onClick={() => inputRef?.current?.focus()}
      >
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
