import customerService from "@modules/Customer/customer.services.js";
import customerModel from "@modules/Customer/customer.model.js";
import { hashPassword } from "@/shared/CommonServices.js";
import customerSanitize from "@modules/Customer/customer.sanitize.js";


export const getAllCustomer = customerService.getAll(customerModel , undefined , customerSanitize);
export const getCustomerById = customerService.getOne(customerModel);
export const createCustomer = [hashPassword , customerService.createOne(customerModel)]; 
export const updateCustomer = customerService.updateById(customerModel);
export const deleteCustomer = customerService.deleteById(customerModel);

