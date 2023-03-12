export const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (3600 * 24);
    return Math.round(diff);
}

export const checkWeek = (checkDate: string) => {
    const firstDay = new Date(new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toISOString().slice(0, 10));
    if (diff_minutes(new Date(checkDate), firstDay) >= 0 && diff_minutes(new Date(checkDate), firstDay) <= 6) {
        return true;
    } else {
        return false;
    }
}

export const checkMonth = (checkDate) => {
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    var lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    if (diff_minutes(new Date(checkDate), firstDay) >= 0 && diff_minutes(new Date(checkDate), firstDay) < 31) {
        return true;
    } else {
        return false;
    }
}

export const checkYear = (checkDate) => {
    const firstDay = new Date(new Date().getFullYear(), 0, 1);
    var lastDay = new Date(new Date().getFullYear(), 11, 31);
    if (diff_minutes(new Date(checkDate), firstDay) >= 0 && diff_minutes(new Date(checkDate), firstDay) < 365) {
        return true;
    } else {
        return false;
    }
}

export const checkLastYear = (checkDate) => {
    const firstDay = new Date(new Date().getFullYear(), 0, 1);
    var lastDay = new Date(new Date().getFullYear(), 11, 31);
    if (diff_minutes(new Date(checkDate), firstDay) >= 365 && diff_minutes(new Date(checkDate), firstDay) < (365 * 2)) {
        return true;
    } else {
        return false;
    }
}

export const checkSemi = (checkDate) => {
    var firstDay = new Date();
    var lastDay = new Date();
    if (new Date().getMonth() > 6) {
        firstDay = new Date(new Date().getFullYear(), 6, 1);
        lastDay = new Date(new Date().getFullYear(), 11, 31);
    } else {
        firstDay = new Date(new Date().getFullYear(), 0, 1);
        lastDay = new Date(new Date().getFullYear(), 5, 30);
    }
    if (diff_minutes(new Date(checkDate), firstDay) >= 0 && diff_minutes(new Date(checkDate), lastDay) <= 0) {
        return true;
    } else {
        return false;
    }
}

export const getWeekOfMonth = (date) => {
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
}

export const getStats = (invoceList) => {
    var years = [0, 0];
    var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var weeks = [0, 0, 0, 0, 0];
    var semiYears = [0, 0];
    invoceList?.filter((item, index) => {
        const year = new Date(item?.date_due).getFullYear();
        const month = new Date(item?.date_due).getMonth() + 1;
        const day = new Date(item?.date_due).getDate() + 1;
        const curYear = new Date().getFullYear();
        if (year === new Date().getFullYear()) {
            //format year
            var dYear = years[1];
            dYear += item?.amount;
            years[1] = dYear;

            //format semiYears & month
            switch (month) {
                case 1:
                    //format month
                    var dMonth = months[0];
                    dMonth += item?.amount;
                    months[0] = dMonth;
                    //format semiYears
                    var dSY = semiYears[0];
                    dSY = item?.amount;
                    semiYears[0] = dSY;
                    break;
                case 2:
                    //format month
                    var dMonth = months[1];
                    dMonth += item?.amount;
                    months[1] = dMonth;
                    //format semiYears
                    var dSY = semiYears[0];
                    dSY += item?.amount;
                    semiYears[0] = dSY;
                    break;
                case 3:
                    //format month
                    var dMonth = months[2];
                    dMonth += item?.amount;
                    months[2] = dMonth;
                    //format semiYears
                    var dSY = semiYears[0];
                    dSY += item?.amount;
                    semiYears[0] = dSY;
                    break;
                case 4:
                    //format month
                    var dMonth = months[3];
                    dMonth += item?.amount;
                    months[3] = dMonth;
                    //format semiYears
                    var dSY = semiYears[0];
                    dSY += item?.amount;
                    semiYears[0] = dSY;
                    break;
                case 5:
                    //format month
                    var dMonth = months[4];
                    dMonth += item?.amount;
                    months[4] = dMonth;
                    //format semiYears
                    var dSY = semiYears[0];
                    dSY += item?.amount;
                    semiYears[0] = dSY;
                    break;
                case 6:
                    //format month
                    var dMonth = months[5];
                    dMonth += item?.amount;
                    months[5] = dMonth;
                    //format semiYears
                    var dSY = semiYears[0];
                    dSY += item?.amount;
                    semiYears[0] = dSY;
                    break;
                case 7:
                    //format month
                    var dMonth = months[6];
                    dMonth += item?.amount;
                    months[6] = dMonth;
                    //format semiYears
                    var dSY = semiYears[1];
                    dSY += item?.amount;
                    semiYears[1] = dSY;
                    break;
                case 8:
                    //format month
                    var dMonth = months[7];
                    dMonth += item?.amount;
                    months[7] = dMonth;
                    //format semiYears
                    var dSY = semiYears[1];
                    dSY += item?.amount;
                    semiYears[1] = dSY;
                    break;
                case 9:
                    //format month
                    var dMonth = months[8];
                    dMonth += item?.amount;
                    months[8] = dMonth;
                    //format semiYears
                    var dSY = semiYears[1];
                    dSY += item?.amount;
                    semiYears[1] = dSY;
                    break;
                case 10:
                    //format month
                    var dMonth = months[9];
                    dMonth += item?.amount;
                    months[9] = dMonth;
                    //format semiYears
                    var dSY = semiYears[1];
                    dSY += item?.amount;
                    semiYears[1] = dSY;
                    break;
                case 11:
                    //format month
                    var dMonth = months[10];
                    dMonth += item?.amount;
                    months[10] = dMonth;
                    //format semiYears
                    var dSY = semiYears[1];
                    dSY += item?.amount;
                    semiYears[1] = dSY;
                    break;
                case 12:
                    //format month
                    var dMonth = months[11];
                    dMonth += item?.amount;
                    months[11] = dMonth;
                    //format semiYears
                    var dSY = semiYears[1];
                    dSY += item?.amount;
                    semiYears[1] = dSY;
                    break;

                default:
                // code
            }

            //format weeks
            if (month == (new Date().getMonth() + 1)) {
                const weekNumber = getWeekOfMonth(new Date(item?.date_due));
                switch (weekNumber) {
                    case 1:
                        //  format weekData
                        var wData = weeks[0];
                        wData += item?.amount;
                        weeks[0] = wData;
                        break;
                    case 2:
                        //  format weekData
                        var wData = weeks[1];
                        wData += item?.amount;
                        weeks[1] = wData;
                        break;
                    case 3:
                        //  format weekData
                        var wData = weeks[2];
                        wData += item?.amount;
                        weeks[2] = wData;
                        break;
                    case 4:
                        //  format weekData
                        var wData = weeks[3];
                        wData += item?.amount;
                        weeks[3] = wData;
                        break;
                    case 5:
                        //  format weekData
                        var wData = weeks[4];
                        wData += item?.amount;
                        weeks[4] = wData;
                        break;

                    default:
                    // code
                }
            }
        } else {
            var dt = years[0];
            dt += item?.amount;
            years[0] = dt;
        }
    })
    const resultData: any = [];
    resultData.push(weeks);
    resultData.push(months);
    resultData.push(semiYears);
    resultData.push(years);
    return resultData;
}

