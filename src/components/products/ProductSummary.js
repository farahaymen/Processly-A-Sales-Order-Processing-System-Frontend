const ProductSummary = (props) => {
  return (
    <div className="product-summary-card">
      <div className="left-summary-card">
        <img
          src={props.product.imgUrl}
          alt={props.product.name}
          className="product-img"
          width="100"
        />
      </div>
      <div className="right-summary-card">
        <div>Product ID: {props.product._id}</div>
        <div>Product Name: {props.product.name}</div>
        <div>Price: {props.product.price}</div>
        {"sizes" in props.product && (
          <div>Sizes: {"" + props.product.sizes}</div>
        )}
      </div>
    </div>
  );
};

export default ProductSummary;
