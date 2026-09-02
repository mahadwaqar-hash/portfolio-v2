import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const SCRAMBLE_CHARS = 'X8#9!@&*<>{}[]';

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = '' }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isDecoding, setIsDecoding] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getScrambledText = () => {
    return Array.from({ length: text.length }, () =>
      SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    ).join('');
  };

  useEffect(() => {
    if (!isDecoding) {
      setDisplayedText(getScrambledText());
    }
  }, [text, isDecoding]);

  const handleMouseEnter = () => {
    if (isDecoding) return;
    setIsDecoding(true);

    let currentIteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => {
        return prev
          .split('')
          .map((char, index) => {
            if (index < currentIteration) {
              return text[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('');
      });

      if (currentIteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }

      currentIteration += 1;
    }, 30);
  };

  return (
    <span
      className={`font-tech text-lg cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      data-cursor="text"
    >
      {displayedText.split('').map((char, i) => (
        <span
          key={i}
          className={char === text[i] ? 'text-brand-neon' : 'text-brand-mutedsilver'}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default ScrambleText;
