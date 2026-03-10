"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
/**
 * ২. ফাংশনটিতে ডাটা রিসিভ করার সময়
 * res.status(data.statusCode) ব্যবহার করা হয়েছে
 */
const sendResponse = (res, data) => {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
exports.default = exports.sendResponse;
