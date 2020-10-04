const stores = [
  ["timetech"],
  ["maximumhardware"],
  ["elnekhely"],
  ["highendstore"],
  ["elbadrgroup"],
  ["uptodate", true],
  ["computrade"],
  ["rameg"],
  ["sigmacomputer", true],
];
const API = `https://pcp.#store#.workers.dev`;
let abortController = null;

export default function searchStores(
  query,
  category,
  onResult,
  onFirstResult,
  onError,
  onFinish
) {
  if (abortController) abortController.abort();
  if (!query && !category) {
    onFinish(true);
    return;
  }

  abortController = new AbortController();

  let first = true;
  let finishedRequests = 0;
  for (let [store, noCategories] of stores) {
    if (category && noCategories) {
      finishedRequests++;
      continue;
    }

    const url = new URL(API.replace("#store#", store));
    url.searchParams.append("q", query);
    if (category) url.searchParams.append("cat", category);

    const request = new Request(url, { signal: abortController.signal });

    fetch(request)
      .then((res) => res.json())
      .then((res) => {
        if (first) {
          first = false;
          onFirstResult();
        }
        onResult(res);
      })
      .catch(onError)
      .finally(() => {
        if (++finishedRequests === stores.length)
          onFinish(abortController.signal.aborted);
      });
  }
}
