# CodeTest
This project consists of a nodejs REST server which exposes an endpoint that takes in data about a vehicle, then returns the value of a used car.
## How to run server:
`npm i` and `npm start` in the root project directory

## How to structure requests
This server accepts GET requests at http://localhost:3000/api/value using queries, ex.

`GET http://localhost:3000/api/value?value=20000&make=Toyota&model=Camry&age=36&owners=3`.

These requests can be made via Postman or via opening index.html in a browser and enter vehicle details in the form, as well as simply by manually entering the URL with the desired queries. Value, Make, Model, Age, and Owners are required parameters, while Owners and Collisions are optional. In addition, the Make and Model must exist and be verifiable via the U.S. Department of Transportation, validated by a server-side request to the NHTSA's free vehicle API.
