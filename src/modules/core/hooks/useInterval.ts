import { useEffect, useRef } from "react";

/**
 * Custom hook para definir um intervalo que
 * executa callback com um determinado delay
 *
 * A forma padrão imperativa do setInterval
 * precisa ser lidada com Refs para evitar
 * problemas de re-renderização dos callbacks
 *
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param {funcion} callback função para ser chamada em intervalos
 * @param {number} delay intervalo em ms
 */
const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      typeof savedCallback.current === "function" && savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
};

export default useInterval;
