import {Document , Schema} from 'mongoose';

interface Store extends Document {
  id: Schema.Types.ObjectId;
  name: string;
  slug: string;
  parent: Schema.Types.ObjectId;
  ancestors: {id: Schema.Types.ObjectId , name: string}[];
  image: string;
  showInHome: Boolean;
  deleted: Boolean;
  store: Schema.Types.ObjectId;
}

export default Store ;