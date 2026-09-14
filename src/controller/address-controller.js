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

 const get = async (req, res, next) => {

    try {

        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        // console.log("Contact ID: ", contactId);
        const address = await addressService.get(user, contactId, addressId);
        
        res.status(200).json({
            data: address,
        });

    } catch (error) {
        next(error);
    }

 }

 const update = async (req, res, next) => {

    try {

        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        // console.log("Contact ID: ", contactId);
        const addressId = req.params.addressId;
        request.id = addressId;
        const address = await addressService.update(user, contactId, request);
        
        res.status(200).json({
            data: address,
        });

    } catch (error) {
        next(error);
    }

 }

 export default {
 	create, get, update
 };