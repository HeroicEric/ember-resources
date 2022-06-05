import { resource } from './function-resource';

export function debounced<Value = unknown>(ms: number, thunk: () => Value) {
  let timeSince = 0;
  let lastValue: Value;

  return resource(() => {
    let tooSoon = (new Date().getTime() - timeSince) >= ms;

    if (tooSoon) return lastValue;

    lastValue = thunk();
    timeSince = new Date().getTime();
    return lastValue;
  });
}
