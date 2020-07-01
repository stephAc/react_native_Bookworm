import httpStatus from 'http-status-codes';

import GoogleService from '../services/Google.service';

const search = async (req, res) => {
    try {
        const resultList = await GoogleService.search(req.query)
        res.status(httpStatus.OK).json(resultList.data);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
};

export { search };