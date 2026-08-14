import addressService from "../service/address-service.js";

const create = async (req, res, next) => { 

    try {

        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        // console.log("Contact ID: ", contactId);
        const address = await addressService.create(user, contactId, request);
        
        res.status(201).json({
            data: address,
        });

    } catch (error) {
        next(error);
    }

 }

 export default {
 	create,
 };