const KEY_SEARCH_HISTORY = 'bizket_search_history';
const LIMIT_COUNT_KEYWORD = 5;

export function getSearchHistory(): string[] {
  try {
    const item = localStorage.getItem(KEY_SEARCH_HISTORY);
    if (!item) {
      return [];
    }
    const result = JSON.parse(item) as string[];
    return result.length > LIMIT_COUNT_KEYWORD
      ? result.slice(result.length - 5)
      : result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function addSearchHistory(keyword: string): void {
  try {
    let newItem: string[] = [];

    const item = localStorage.getItem(KEY_SEARCH_HISTORY);
    if (item) {
      let prev = JSON.parse(item) as string[];
      if (prev.length > LIMIT_COUNT_KEYWORD) {
        prev = prev.slice(prev.length - 5);
      }
      newItem = [...prev];
    }
    newItem.push(keyword);

    localStorage.setItem(KEY_SEARCH_HISTORY, JSON.stringify(newItem));
  } catch (error) {
    console.log(error);
  }
}
