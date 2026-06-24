import { useReveal } from "../hooks/useReveal";

/**
 * Envoltorio declarativo sobre useReveal (reveal-on-scroll, sustituye a
 * framer-motion). `as` elige la etiqueta (div/article…), `delay` escalona la
 * entrada de listas (en ms) y el resto de props pasan tal cual.
 */
const Reveal = ({
  as: Tag = "div",
  delay = 0,
  rootMargin,
  className = "",
  style,
  children,
  ...rest
}) => {
  const ref = useReveal(rootMargin);
  return (
    <Tag
      ref={ref}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
