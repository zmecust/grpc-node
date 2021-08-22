const _ = require("lodash");
const { employees } = require("./data.js");

function generateReport(call, callback) {
  const successfulReports = [];
  const failedReports = [];

  call.on("data", function (employeeStream) {
    const employeeId = employeeStream.id;
    const employee = _.find(employees, { id: employeeId });
    if (employee != null) {
      successfulReports.push(employee.firstName);
    } else {
      failedReports.push(employeeId);
    }
  });

  call.on("end", function () {
    callback(null, {
      successfulReports: successfulReports.join(),
      failedReports: failedReports.join(),
    });
  });
}

module.exports.generateReport = generateReport;
