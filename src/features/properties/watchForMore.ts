export function watchForMore(target: Element, loadMore: () => void): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {};

  let active = true;
  const observer = new IntersectionObserver((entries) => {
    if (active && entries.some((entry) => entry.isIntersecting)) loadMore();
  }, { rootMargin: '0px 0px 240px 0px', threshold: 0 });

  observer.observe(target);
  return () => { active = false; observer.disconnect(); };
}
