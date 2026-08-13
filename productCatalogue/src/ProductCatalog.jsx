import { useState } from "react";
import products from "./products";
import "./ProductCatalog.css";

const CATEGORIES = ["All", "Electronics", "Clothing", "Grocery"];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1500", min: 500, max: 1500 },
  { label: "₹1500 - ₹5000", min: 1500, max: 5000 },
  { label: "Above ₹5000", min: 5000, max: Infinity },
];

function ProductCatalog() {
  // 1. useState hooks — one per piece of filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);

  // 2. Multiple filters chained together with filter()
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter(
      (product) =>
        product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max
    );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedPriceRange(PRICE_RANGES[0]);
  };

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>Product Catalog</h1>
        <p className="subtitle">Search, filter, and browse available stock</p>
      </header>

      <div className="controls">
        {/* Search by name */}
        <input
          type="text"
          className="search-input"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-row">
          {/* Filter by category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Filter by price range */}
          <select
            value={selectedPriceRange.label}
            onChange={(e) =>
              setSelectedPriceRange(
                PRICE_RANGES.find((range) => range.label === e.target.value)
              )
            }
          >
            {PRICE_RANGES.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>

          <button className="reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Product count */}
      <p className="product-count">
        Showing <strong>{filteredProducts.length}</strong> of{" "}
        <strong>{products.length}</strong> products
      </p>

      {/* Conditional rendering: empty state vs grid */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products match your search/filters.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-top">
                <h3>{product.name}</h3>
                <span className="category-tag">{product.category}</span>
              </div>

              <p className="price">₹{product.price.toLocaleString("en-IN")}</p>

              {/* Conditional rendering: Out of Stock vs quantity available */}
              {product.quantity === 0 ? (
                <span className="stock-badge out">Out of Stock</span>
              ) : (
                <span className="stock-badge in">
                  In Stock ({product.quantity})
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
