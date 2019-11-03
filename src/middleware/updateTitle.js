const updateTitle = ({ getState, dispatch }) => next => action => {
  const result = next(action);

  const router = getState().router;

  const parts = ['rubygems-class-table'];

  if (new RegExp('^/gems/[^/]+$').test(router.location.pathname)) {
    const entries = getState().entries;
    const currentSlug = entries.currentSlug;
    const filterKey = entries.filterKey;

    if (currentSlug) {
      parts.unshift(currentSlug);
    }

    if (filterKey) {
      parts.unshift(filterKey);
    }
  }

  const title = parts.join(' | ');

  if (document.title !== title) {
    document.title = title;
  }

  return result;
};

export default updateTitle;
