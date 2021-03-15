// api.js
// author: Laura Antonescu

const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

router
    .route("/value")
    .get((req, res, next) => {
        const vehicle = {
            value: req.query['value'],
            make: req.query['make'],
            model: req.query['model'],
            age: req.query['age'],
            owners: req.query['owners'],
        }
        if (vehicle.value && vehicle.make && vehicle.model && vehicle.age && vehicle.owners) {
            const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${vehicle.make}?format=json`
            let initial = parseFloat(vehicle.value);
            let final = initial;
            fetch(url)
            .then(response => response.json())
            .then(makes => {
                if (makes["Results"].some(i => i["Model_Name"].includes(vehicle.model))) {
                    if (vehicle.owners > 2)
                        final *= 0.75;
                    if (req.query['mileage']) {
                        let m = req.query['mileage']/1000
                        if (m >= 1) {
                            if (m > 150)
                                m = 150;
                            final -= (initial*0.002*m);
                        }
                    }
                    if (req.query['collisions']) {
                        let c = req.query['collisions']
                        if (c >= 1) {
                            if (c > 5)
                                c = 5;
                            final -= (initial*0.02*c);
                        }
                    }
                    if (vehicle.age > 0 && vehicle.age <= 120)
                        final -= (initial*0.005*vehicle.age);
                    if (vehicle.owners == 0)
                        final += (initial*0.1);
                    res.status(200).json({value:final});
                } else {
                    res.status(400).json({error: "Vehicle not found"});
                }
            })
            
        } else {
            res.status(400).json({error:"Value, Make, Model, Age, and Owners are required fields"})
        }
    })

module.exports = router;