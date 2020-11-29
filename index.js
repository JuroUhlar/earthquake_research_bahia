const fs = require('fs');
const axios = require('axios');


let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);
// console.log(data.map(d => d.localidade));

data.forEach((d, index) => {
    setTimeout(() => {
        var config = {
            method: 'get',
            url: `http://api.positionstack.com/v1/forward?access_key=fc44c9886def19ca4b545e1e941d4a61&query=${encodeURI(d.localidade)}&limit=1&country=BR`,
          };
          axios(config)
          .then(function (response) {
            let result = (response.data.data[0]);
            console.log(d.localidade, result.latitude, result.longitude);
            d.lat = result.latitude;
            d.long = result.longitude;
          })
          .catch(function (error) {
            console.log(d.localidade, error);
          });
    }, index * 2000)
});

setTimeout(() => {
    console.log("Writing data to file");
    let enrichedData = JSON.stringify(data);
    fs.writeFileSync('data_enriched.json', enrichedData);
    console.log("Data written. Done.")
}, data.length * 2000 + 5000)



