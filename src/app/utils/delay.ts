/**
 * Returns a promise that resolves (or rejects) after a delay.
 *
 * @param t - Base delay in milliseconds. Defaults to `500`.
 * @param random - Maximum additional random delay in milliseconds. Defaults to `0`.
 * @param error - If provided, the promise rejects with this error instead of resolving.
 * @returns A promise that settles after the computed delay.
 *
 * @example
 * // Resolve after 500ms
 * await delay();
 *
 * @example
 * // Resolve after 1000ms
 * await delay(1000);
 *
 * @example
 * // Resolve after 200ms to 400ms (random jitter)
 * await delay(200, 200);
 *
 * @example
 * // Reject after 300ms
 * try {
 *   await delay(300, 0, new Error('Something went wrong'));
 * } catch (err) {
 *   console.error(err);
 * }
 */
export function delay(t = 500, random = 0, error?: Error) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (error) {
          reject(error);
        } else {
          resolve(resolve);
        }
      },
      t + Math.random() * random,
    );
  });
}
