let productsData = [];

for (let i = 1; i < 26; i++) {
  productsData.push({
    id: "PROD-" + i,
    title: `Produk ${i}`,
    price: 200000,
    categori: "elektronik",
    endsOn: "31 May, 2021 - 14:00",
    url: "/produk/produk-" + i,
    image: process.env.PUBLIC_URL + "/images/products/product-13.jpg",
  });
}

export default productsData;
