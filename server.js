const PROTO_PATH = __dirname + "/proto/employee.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { paySalary } = require("./paySalary.js");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  let server = new grpc.Server();
  server.addService(employeeProto.Employee.service, { paySalary: paySalary });
  server.bindAsync(
    "0.0.0.0:4500",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
