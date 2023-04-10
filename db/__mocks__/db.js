
const connect = async (req,res) => {
  console.log('MOCKED - MongoDB is up and running!')

};

const saveEntry = async (newEntry) => {
  console.log('MOCKED - Saving New Entry');
  return Promise.resolve({
      "name":"Zachary Taylor",
      "email": "example@example.com",
      "age": 30,
      "living": true
  })
}

const disconnect = () => {
  console.log('MOCKED Disconnect');

}
module.exports = {connect, saveEntry, disconnect}