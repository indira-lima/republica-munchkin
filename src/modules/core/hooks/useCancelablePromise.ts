import { useEffect, useRef } from "react";

function makeCancelable(promise: any, name: any) {
  let isCanceled = false;
  const wrappedPromise = new Promise<any>((resolve, reject) => {
    // Suppress resolution and rejection if canceled
    promise
      .then((val: never) => !isCanceled && resolve(val))
      .catch((error: never) => !isCanceled && reject(error));
  });
  return {
    name,
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

/**
 * Hook para fazer uma requisição assíncrona cancelável
 * Ao usar o hook para criar uma nova promise, a requisição
 * é cancelada quando o componente é removido
 *
 * @returns Promise
 */
export default function useCancelablePromise(debug = false) {
  const promises =
    useRef<{ promise: Promise<any>; name?: string; cancel: () => void }[]>();

  useEffect(() => {
    promises.current = promises.current || [];
    return function cancel() {
      if (!promises.current?.forEach) return;
      promises.current.forEach((p) => {
        debug && console.log("Canceling", p.name || p);
        p.cancel();
      });
      promises.current = [];
    };
  }, []);

  /**
   * Recebe uma promise e a adiciona ao array de promises a serem canceladas
   *
   * @param {Promise} p a promise a ser chamada
   * @returns a promise após ser marcada como cancelável
   */
  function cancelablePromise(p: Promise<any>, name: string = "") {
    if (!promises.current) return;
    const cPromise = makeCancelable(p, name);
    promises.current.push(cPromise);
    return cPromise.promise;
  }

  return { cancelablePromise };
}

