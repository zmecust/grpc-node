const PROTO_PATH = __dirname + "/proto/employee.proto";

const _ = require("lodash");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  const client = new employeeProto.Employee(
    "localhost:4500",
    grpc.credentials.createInsecure()
  );

  const call = client.generateReport(function (error, response) {
    console.log(
      "Reports successfully generated for: ",
      response.successfulReports
    );
    console.log(
      "Reports failed since Following Employee Id's do not exist: ",
      response.failedReports
    );
  });

  const employeeIdList = [1, 10, 2];
  _.each(employeeIdList, function (employeeId) {
    call.write({ id: employeeId });
  });

  call.end();
}

main();
