import axios from 'axios';

export async function getAllProducts({ option = 'abaixo' }) {
  let url = option === 'abaixo' 
    ? 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5bbd6fdd-abae-411d-96cc-1a5d76d3803b/abaixo-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201219%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201219T233743Z&X-Amz-Expires=86400&X-Amz-Signature=ff9632ecb49447ae74629f5f9655d879ad9cc853838aa9051a4612c1882748a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22abaixo-10-reais.json%22'
    : 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201220T003745Z&X-Amz-Expires=86400&X-Amz-Signature=2527330368def97379f6e3c1823f5639dd9a720f0cf4d176d0ae7fe15ffca9d1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22acima-10-reais.json%22' 
  
  const { data } = await axios.get(url);
  
  const formattedResponse = {
    products: data.items.map(item => ({
      id: item.id,
      name: item.name,  
      price: (item.price/100),
      sellingPrice: (item.sellingPrice/100),
      imageUrl: item.imageUrl,
      availability: item.availability
    })),
    total: (data.items.reduce((total, currentItem) => (total + currentItem.sellingPrice), 0)/100),
  } 
  
  return formattedResponse;
} 