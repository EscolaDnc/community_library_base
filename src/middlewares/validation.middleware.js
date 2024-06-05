import { userSchema, userIdSchema } from '../schemas/user.schema.js';

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (e) {
        res.status(400).json({ error: e.errors });
    }
};

const validateUserId = (req, res, next) => {
    try {
        const userId = req.params.id ? +req.params.id : +req.userId;
        userIdSchema.parse({ userId: userId });
        next();
    } catch (e) {
        res.status(400).json({ error: e.errors });
    }
};

export { validate, validateUserId };
