import moment from "moment";

/**
 *
 * @param date1
 * @param date2
 */
const calculateDifference = function (date1, date2) {
    date1 = moment(date1, "DD/MM/YYYY");
    date2 = moment(date2, "DD/MM/YYYY");

    return date1.diff(date2, 'days');
}
const addDaysToDate = function (date, numberOfDaysToBeAdded) {
    return moment(date, "DD/MM/YYYY")
        .add(numberOfDaysToBeAdded, 'd')
        .format('DD/MM/YYYY');
}

const renderDate = function (date, includeTime) {
    includeTime = includeTime === true;
    let dateToBePrinted;

    try {
        dateToBePrinted = new Date(date);
    } catch (e) {
        dateToBePrinted = new Date();
    }

    if (!includeTime)
        return dateToBePrinted.toLocaleDateString()

    return `${dateToBePrinted.toLocaleDateString()} ${dateToBePrinted.toLocaleTimeString()}`;
}

export default {
    calculateDifference,
    addDaysToDate,
    renderDate
}