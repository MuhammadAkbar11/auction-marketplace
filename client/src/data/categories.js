let popularCategories = [];
let allCategories = [];

for (let i = 1; i < 11; i++) {
  popularCategories.push({
    id: "cat-" + i,
    name: `Kategori ${i}`,
    url: "/kategori/kategori-" + i,
  });
}
for (let i = 1; i < 21; i++) {
  allCategories.push({
    id: "cat-" + i,
    name: `Kategori ${i}`,
    url: "/kategori/kategori-" + i,
  });
}

export { popularCategories, allCategories };
