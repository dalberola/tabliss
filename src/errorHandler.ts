let captureImpl: ((error: Error) => void) | null = null;
const queued: Error[] = [];

export function register(): void {
  import(/* webpackChunkName: "sentry" */ "./errorHandlerImpl").then((mod) => {
    mod.register();
    captureImpl = mod.capture;
    while (queued.length) {
      const err = queued.shift();
      if (err) captureImpl(err);
    }
  });
}

export function capture(error: Error): void {
  if (captureImpl) {
    captureImpl(error);
  } else {
    queued.push(error);
  }
}
