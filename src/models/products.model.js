const { getSortList, getName, getNumericFilters, getFieldsList, getPagination } = require('../services/query');
const products = require('./products.mongo');

async function getAllProducts(queries) {
    const { limit, page, name, sort, numericFilters, fields, ...rest } = queries;
    rest.name = getName(name);
    const sortList = getSortList(sort);
    const fieldsList = getFieldsList(fields);
    const pagination = getPagination(limit, page);
    const acceptedNumericFilters = getNumericFilters(numericFilters);
    return await products.find({
        ...rest,
        ...acceptedNumericFilters,
    }, {})
    .sort(sortList)
    .select(fieldsList)
    .skip(pagination.skip)
    .limit(pagination.limit);
}

module.exports = {
    getAllProducts,
}