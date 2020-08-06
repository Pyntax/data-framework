import Dates from './dates';

const isEmpty = function (element) {
    return element === undefined || element === null || element === "";
};

const Utils = {
    displayProp: (displayObj, fieldName, defaultValue) => {
        defaultValue = isEmpty(defaultValue) ? "" : defaultValue
        if (!isEmpty(displayObj) && !isEmpty(displayObj[fieldName])) {
            return displayObj[fieldName]
        }

        return defaultValue;
    },
    isEmpty: isEmpty,
    Dates: Dates
};

export default Utils;