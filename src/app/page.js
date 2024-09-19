"use client";

import Cart from "/src/components/Cart.jsx";
import { useState, useEffect } from "react";
const Page = () => {
  const [num, setNum] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [load, setLoad] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const limit = 9;
  const fetchData = async () => {
    setLoad(false);
    const JSONdata = await fetch(
      selectedCategory === ""
        ? `https://dummyjson.com/products?limit=${limit}&skip=${num * limit}`
        : `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${
            num * limit
          }`
    );

    setLoad(true);
    let data = await JSONdata.json();
    setProducts(data.products);
    setTotal(data.total);
  };
  const searchFunction = () => {
    if (inputValue === "") return setProducts(products);
    const search = products.filter((product) => {
      const lowerCaseProduct = product.title.toLowerCase();
      const lowerCaseValue = inputValue.toLowerCase();
      return lowerCaseProduct.includes(lowerCaseValue);
    });
    setProducts(search);
  };

  const fetchCategoryData = async () => {
    let data = await fetch("https://dummyjson.com/products/category-list");
    let category = await data.json();
    setCategories(category);
  };
  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, [num, selectedCategory]);

  const minus = () => {
    if (num == 0) return;
    setNum(num - 1);
  };
  const plus = () => {
    if (total / limit - num <= 1) return;
    setNum(num + 1);
    // selectedCategory !== "" ? setNum(0) : ;
  };
  return load === false ? (
    <div className="load">Loading...</div>
  ) : (
    <div className="container">
      <div className="header">
        <select
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setNum(0);
          }}
          value={selectedCategory}
        >
          <option value={""}>all</option>
          {categories.map((option, key) => {
            return (
              <option key={key} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            searchFunction();
            setNum(0);
          }}
        >
          search
        </button>
      </div>

      <h1>Products</h1>
      <div className="boxCont">
        {products.map((item, index) => {
          let categor = item.category;
          if (categor === selectedCategory) {
          }
          return (
            <div key={index}>
              <Cart item={item} />
            </div>
          );
        })}
      </div>
      <div className="pages">
        <div onClick={() => minus()}>return</div>
        <div>{num + 1}</div>
        <div onClick={() => plus()}>next</div>
      </div>
    </div>
  );
};
export default Page;
