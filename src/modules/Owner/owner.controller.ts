import GenericController from "@shared/genericController.js";
import ownerService from "@modules/Owner/owner.services.js";
import OwnerSanitizer from "@modules/Owner/owner.sanitize.js";


class OwnerController extends GenericController<any> {

  constructor() {
    super(ownerService); 
    this.sanitizeOption = OwnerSanitizer
  }
}

export default new OwnerController();
