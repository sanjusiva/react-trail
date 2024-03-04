import { useState } from "react";
import "./App.css";

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function App() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  let filteredProducts = inStockOnly
    ? products.filter((ele) => ele.stocked)
    : products;
  return (
    <div class="bodyClass">
      <Search
        filterText={filterText}
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        products={products}
      />
      <br></br>
      {/* <ProductTable products={products} /> */}
      <ProductTable products={filteredProducts} filterText={filterText} />
    </div>
  );
}

function ProductRow({ product }) {
  console.log("pr: ", product);
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products,filterText }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return; // Skip products that don't match the filter text
    }
    if (product.category !== lastCategory) {
      console.log("cat: ", product.category, lastCategory);
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });
  console.log("last: ", lastCategory);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function Search({
  filterText,
  onFilterTextChange,
  inStockOnly,
  onInStockOnlyChange
}) {
  let handleCheckboxChange = () => {
    console.log("event: ", inStockOnly);
    onInStockOnlyChange(!inStockOnly);
  };
  let handleFilterChange = (e) => {
    console.log("val: ", e.target.value);
    const value=e.target.value
    onFilterTextChange(value);
  };


  return (
    <div>
      <form>
        <input
          type="text"
          value={filterText}
          placeholder="Search..."
          onChange={handleFilterChange}
        />
        <br></br>
        <br></br>
        <input
          type="checkbox"
          id="InStock"
          value="InStock"
          checked={inStockOnly}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="InStock"> Only show products in stock</label>
      </form>
    </div>
  );
}

export default App;
