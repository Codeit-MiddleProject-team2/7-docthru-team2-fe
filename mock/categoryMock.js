// api.js
const categorys = [
  { id: 1, name: "sql" },
  { id: 2, name: "python" },
  { id: 3, name: "db" },
  { id: 4, name: "c" },
  { id: 5, name: "c++" },
  { id: 6, name: "javascript" },
  { id: 7, name: "postgres" },
];

export function getCategory(keyword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const category = categorys.filter((category) =>
        category.name.includes(keyword)
      );
      if (category) {
        resolve(category);
      }
    }, 500);
  });
}
