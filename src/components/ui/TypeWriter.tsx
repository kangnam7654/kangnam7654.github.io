import { useState, useEffect } from "react";

interface Props {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}

export default function TypeWriter({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pause = 2000,
}: Props) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          if (displayText.length === currentText.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setDisplayText(currentText.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pause]);

  return (
    <span className="text-[var(--color-primary)]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
