import { afterEach, describe, expect, it, vi } from 'vitest';
import { watchForMore } from './watchForMore';

afterEach(() => vi.unstubAllGlobals());

describe('loading listings near the end of the grid', () => {
  it('only loads intersecting results and ignores queued events after cleanup', () => {
    let notify: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    class Observer {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe = observe;
      disconnect = disconnect;
    }
    vi.stubGlobal('IntersectionObserver', Observer);
    const target = {} as Element;
    const loadMore = vi.fn();
    const stop = watchForMore(target, loadMore);
    expect(observe).toHaveBeenCalledWith(target);
    notify?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(loadMore).not.toHaveBeenCalled();
    notify?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(loadMore).toHaveBeenCalledTimes(1);
    stop();
    expect(disconnect).toHaveBeenCalledTimes(1);
    notify?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(loadMore).toHaveBeenCalledTimes(1);
  });

  it('leaves manual loading usable when automatic observation is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const loadMore = vi.fn();
    const stop = watchForMore({} as Element, loadMore);
    expect(loadMore).not.toHaveBeenCalled();
    expect(() => stop()).not.toThrow();
  });
});
