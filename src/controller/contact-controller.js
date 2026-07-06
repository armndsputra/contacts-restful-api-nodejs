import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {

    try {
        const user = req.user;
        const request = req.body;
        
        const contact = await contactService.create(user, request);
        res.status(201).json({
            data: contact,
        });
    } catch (error) {
        next(error);
    }   

}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.id;

        const contact = await contactService.get(user, contactId);
        res.status(200).json({
            data: contact,
        });
    } catch (error) {
        next(error);
    }
}

export default { create, get };
