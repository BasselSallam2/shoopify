import {Document , Schema} from 'mongoose';

interface Store extends Document {
  id: string;              
  name: string;
  owner: Schema.Types.ObjectId
  subdomain: string;
  customDomain: string;
  description: string;
  contactPhone: string;
  contactMail: string;
  active: boolean;
  deleted: boolean;
}

export default Store ;