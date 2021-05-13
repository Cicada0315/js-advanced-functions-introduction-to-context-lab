function createEmployeeRecord(arr){
    let obj={
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj;
}
function createEmployeeRecords(arr){
    let obj=[];
    for(let i=0; i<arr.length; i++){
        obj.push(createEmployeeRecord(arr[i]))
    }
    return obj;
}
function creatTimeObj(type, time){
    const timearr=time.split(" ");
    return {
        type: type,
        date: timearr[0],
        hour: parseInt(timearr[1])
    }
}

function createTimeInEvent(obj, time){
    obj.timeInEvents.push(creatTimeObj("TimeIn", time));
    return obj;
}

function createTimeOutEvent(obj, time){
    obj.timeOutEvents.push(creatTimeObj("TimeOut", time));
    return obj;
}

function hoursWorkedOnDate(obj, date){
    const indobj = obj.timeInEvents.find(e => e.date===date);
    const outobj= obj.timeOutEvents.find(e=> e.date===date);

    return (outobj.hour-indobj.hour)/100;
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj,date)*obj.payPerHour;
}

function allWagesFor(records){
    let wage=0;
    for(let i=0; i<records.timeInEvents.length; i++){
        wage+=wagesEarnedOnDate(records, records.timeInEvents[i].date);
    }
    return wage;
}

function calculatePayroll(employee){
    let grandTotalOwed=0;
    for(let i=0; i<employee.length; i++){
        grandTotalOwed+=allWagesFor(employee[i])
    }
    return grandTotalOwed;
}

function findEmployeeByFirstName(records, name){
    for(let i=0; i<records.length; i++){
        if(records[i].firstName===name){
            return records[i];
        }
    }
}