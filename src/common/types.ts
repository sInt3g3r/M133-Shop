export type Product = {
    id: string,
    productName: string,
    specialOffer: number,
    normalPrice: number,
    imageName: string,
    description: string
  }

  export type boughtProduct = {
    product: Product,
    amount: number
  }