let categoriesSeed = [];
for (let i = 1; i < 21; i++) {
  categoriesSeed.push({
    id_kategori: "cat-" + i,
    kategori: `Kategori ${i}`,
  });
}

export { categoriesSeed };
