function buildResponse(success, message, data, statusCode) {
    return { success, message, data, statusCode };
}

function send(...args) {
    if (args.length && typeof args[0]?.status === 'function') {
        // Express mode: [res, success, message, data, statusCode]
        const [res, success, message, data, statusCode] = args;
        return res.status(statusCode).json(buildResponse(success, message, data, statusCode));
    } else {
        // Service mode: [success, message, data, statusCode]
        const [success, message, data, statusCode] = args;
        return buildResponse(success, message, data, statusCode);
    }
}

module.exports = {
    success(...args) {
        return send(...(
            typeof args[0]?.status === 'function'
                ? [args[0], true, args[1] ?? 'Success', args[2] ?? null, args[3] ?? 200]
                : [true, args[0] ?? 'Success', args[1] ?? null, args[2] ?? 200]
        ));
    },

    error(...args) {
        return send(...(
            typeof args[0]?.status === 'function'
                ? [args[0], false, args[1] ?? 'Bad Request', args[2] ?? null, args[3] ?? 400]
                : [false, args[0] ?? 'Bad Request', args[1] ?? null, args[2] ?? 400]
        ));
    },

    unauthorized(...args) {
        return send(...(
            typeof args[0]?.status === 'function'
                ? [args[0], false, args[1] ?? 'Unauthorized', null, 401]
                : [false, args[0] ?? 'Unauthorized', null, 401]
        ));
    },

    forbidden(...args) {
        return send(...(
            typeof args[0]?.status === 'function'
                ? [args[0], false, args[1] ?? 'Forbidden', null, 403]
                : [false, args[0] ?? 'Forbidden', null, 403]
        ));
    },

    serverError(...args) {
        const isRes = typeof args[0]?.status === 'function';
        const error = isRes ? args[1] : args[0];
        const res = isRes ? args[0] : null;
        const message = typeof error === 'string' ? error : error?.message || 'Internal Server Error';

        return send(...(
            res
                ? [res, false, message, null, 500]
                : [false, message, null, 500]
        ));
    },

    schema() {
        return {
            success: 'boolean',
            message: 'string',
            data: 'any',
            statusCode: 'number',
        };
    }
};
