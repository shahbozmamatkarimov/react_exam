import requests from './httpServices';

const ProductServices = {
  getAll() {
    return requests.get('/products');
  },
};

export default ProductServices;
