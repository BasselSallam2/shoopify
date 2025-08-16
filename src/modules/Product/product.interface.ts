import {Document , Schema} from 'mongoose';

interface Product extends Document {
  id: string;              
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount: number;
  brand: string;
  category: Schema.Types.ObjectId;
  thumbnail: string;
  images: string[];
  reviews: {rate:number , comment:string , user:Schema.Types.ObjectId}[];
  stock: number;
  views: number;
  tags: string[];
  sold: number;
  store: Schema.Types.ObjectId;
  active: boolean;
  deleted: boolean;
  seo: {
    title: string;
    description: string;
  }[];
  specifications: {
    name: string;
    value: string;
  }[]
}

export default Product ;