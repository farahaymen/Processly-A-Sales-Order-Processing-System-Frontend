import ProductSummary from "./ProductSummary";

const ProductsList = (props) => {
  return (
    <div className="orders-list" style={{ justifyContent: "center" }}>
      {props.products.map((o) => (
        <ProductSummary product={o} key={o.orderId} />
      ))}
    </div>
  );
};

export default ProductsList;
