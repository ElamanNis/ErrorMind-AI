
import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface Props {
  formula: string;
  block?: boolean;
  className?: string;
}

const LatexRenderer: React.FC<Props> = ({ formula, block = false, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(formula, containerRef.current, {
          throwOnError: false,
          displayMode: block,
        });
      } catch (e) {
        console.error("Katex error:", e);
      }
    }
  }, [formula, block]);

  return <span ref={containerRef} className={className} />;
};

export default LatexRenderer;
