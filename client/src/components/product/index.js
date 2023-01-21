import { Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/loader';
import ProductCard from 'components/product/productCard';
import { getProductsList } from 'redux/slice/prodcutsSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    if (!products?.length) dispatch(getProductsList());
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="my-5">
      <Heading>Products</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} className="my-5" spacing={3}>
        {products?.length ? (
          products.map((product) => <ProductCard key={product.title} {...product} />)
        ) : (
          <p className="py-5 text-center text-danger"> No products found!</p>
        )}
      </SimpleGrid>
    </div>
  );
};

export default Products;
