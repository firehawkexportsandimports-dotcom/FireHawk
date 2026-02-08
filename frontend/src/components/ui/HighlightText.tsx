interface HighlightTextProps {
  text?: string;
  className?: string;
}

export function HighlightText({
  text = "",
  className = "",
}: HighlightTextProps) {
  // split text by {highlight}
  const parts = text.split(/(\{.*?\})/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          return (
            <span key={index} className="text-gradient-fire">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
