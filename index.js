var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
 
var schema = buildSchema(`
   type Query {
       agency(name: String!): Agency
       agencies(region: String!): [Agency]
   }
   type Agency {
     name: String
     nation: String
     region: String
     yearFounded: Int
     landedOnMoon: Boolean
   }
`);
 
var spaceAgencies = [
 {
   name: "NASA",
   nation: "USA",
   region: "North America",
   yearFounded: 1958,
   landedOnMoon: true
 },
 {
   name: "INTA",
   nation: "Spain",
   region: "Europe",
   yearFounded: 1942,
   landedOnMoon: false
 },
 {
   name: "CNSA",
   nation: "China",
   region: "Asia",
   yearFounded: 1993,
   landedOnMoon: true
 },
 {
   name: "ROSCOSMOS",
   nation: "Russia",
   region: "Europe",
   yearFounded: 1992,
   landedOnMoon: true
 },
 {
   name: "KARI",
   nation: "South Korea",
   region: "Asia",
   yearFounded: 1989,
   landedOnMoon: false
 }
];
 
var getAgency = function (args) {
 return spaceAgencies.filter((agency) => {
   return agency.name === args.name;
 })[0];
};
 
var getByVal = function (args) {
 return spaceAgencies.filter((agency) => {
   return agency.name === args.name;
 });
};
 
var root = {
 agency: getAgency,
 agencies: getByVal
};
 
var app = express();
 
app.use(
 "/graphql",
 graphqlHTTP({
   schema: schema,
   rootValue: root,
   graphiql: true
 })
);
 
var port = "8080";
 
app.listen(port, () => console.log("Listening to port", port));
