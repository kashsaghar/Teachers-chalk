import { Fragment } from "react";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

export function linkify(text: string) {
  return text.split(URL_PATTERN).map((part, i) => {
    if (part.match(URL_PATTERN)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-light"
        >
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
