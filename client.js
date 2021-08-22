const PROTO_PATH = __dirname + "/proto/employee.proto";

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

  const employeeIdList = [1, 10, 2];
  const call = client.paySalary({ employeeIdList: employeeIdList });

  call.on("data", function (response) {
    console.log(response.message);
  });

  call.on("end", function () {
    console.log("All Salaries have been paid");
  });
}

main();
