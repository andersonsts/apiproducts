import { getAllProducts } from '../services/products.service';

class ProductController {
  async index(request, response) {
    const { option } = request.params;
    const cartData = await getAllProducts({ option });

    return response.json(cartData)
  }
}

export default new ProductController();