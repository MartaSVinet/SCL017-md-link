const axios = require('axios');
const validate = process.argv[2];
let links = ['http://google.com', 'http://youtube.com', 'http://github.com/carlamorale']


const validation = (links) => {
    for (link of links) {
      axios(link)
      .then((response) => {
        if (response.status === 200) {
          console.log('OK');
        }
      })
      .catch((err) => {
        console.log('FAIL');
      })
    }
  }
  if (validate) {
  validation(links)
  }