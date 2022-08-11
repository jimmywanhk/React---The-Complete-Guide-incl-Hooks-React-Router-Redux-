import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams(); //return key value pair

  console.log(params.productId);

  return (
    <section>
      <h1>Products Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
};

export default ProductDetail;
