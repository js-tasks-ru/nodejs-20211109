module.exports = async function handleValidationErrors(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.name !== 'ValidationError') throw err;

        const errors = Object.keys(err.errors).map(key => ({
            [key]: err.errors[key].message,
        }));

        ctx.status = 400;
        ctx.body = errors;   
    }
}