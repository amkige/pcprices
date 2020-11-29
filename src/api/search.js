const stores = [
  ["timetech"],
  ["maximumhardware"],
  ["elnekhely"],
  ["highendstore"],
  ["elbadrgroup"],
  ["computrade"],
  ["rameg"],
  ["alfrensia"],
  ["deltacomputer"],
  ["titanseg", true],
  ["uptodate", true],
  ["sigmacomputer", true],
  ["arabhardware", true],
  ["elnourtech", true],
];
const API = `https://pcp.#store#.workers.dev`;

export default function searchStores(
  query,
  category,
  signal,
  onResult,
  onFirstResult,
  onError,
  onFinish
) {
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

    const request = new Request(url, { signal: signal });

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
        if (++finishedRequests === stores.length) onFinish();
      });
  }
}
