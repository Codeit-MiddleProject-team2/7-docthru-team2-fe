export async function getData(apiFn, setFn, loadingFn = (param) => {}) {
  loadingFn(true);
  try {
    const data = await apiFn();
    setFn(data);
  } catch (e) {
    console.error(e);
  } finally {
    loadingFn(false);
  }
}
