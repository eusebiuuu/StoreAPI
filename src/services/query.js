const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const OPERATOR_MAP = {
    '<': '$lt',
    '<=': '$lte',
    '=': '$eq',
    '>=': '$gte',
    '>': '$gt',
}
// Implement strong query validation

function getPagination(limit, page) {
    page = Math.abs(Math.ceil(page)) || DEFAULT_PAGE;
    limit = Math.abs(Math.ceil(limit)) || DEFAULT_LIMIT;
    const skip = limit * (page - 1);
    return {
        limit,
        skip,
    }
}

function getName(name) {
    if (name) {
        return { $regex: name,  $options: 'i' }
    }
    return { $regex: '',  $options: 'i' };
}

function getSortList(sort) {
    let sortList;
    if (sort) {
        sortList = sort.split(',').join(' ');
        // check if the attributes list includes each element of sortList
    } else {
        sortList = 'name -price';
    }
    return sortList;
}

function getFieldsList(fields) {
    let fieldsList;
    if (fields) {
        fieldsList = fields.split(',').join(' ');
        // check if the attributes list includes each element of fieldsList
    } else {
        fieldsList = '_id name company feature price rating';
    }
    return fieldsList;
}

function getNumericFilters(numericFilters) {
    if (!numericFilters) {
        return {};
    }
    const pattern = /\b(<|>|=|<=|>=)\b/g;
    const filters = numericFilters.replace(pattern, (match) => `-${OPERATOR_MAP[`${match}`]}-`);
    const acceptedFilters = {};
    filters.split(',').forEach(filter => {
        const [field, operator, value] = filter.split('-');
        acceptedFilters[field] = {
            [operator]: Number(value),
        }
    })
    // console.log(filters);
    console.log(acceptedFilters);
    return acceptedFilters;
}


module.exports = {
    getPagination,
    getFieldsList,
    getSortList,
    getName,
    getNumericFilters,
}