const mongoose = require('mongoose')

/* this app was used to take password as an argument
if(process.argv.length < 3){
	console.log('Please provide the password for mongoose as arguments')
        process.exit(1)
	}

const password = process.argv[2]
*/


const url = process.env.MONGODB_URL

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

 
mongoose.set('debug',true)
mongoose.set('strictQuery',false)

const personSchema = new mongoose.Schema({
   id : String,
   name : String,
   number : String 
	})

module.exports = mongoose.model('Person',personSchema)

/*      testing the working of mongodb by inserting few dummy data

if(process.argv[3] && process.argv[4]){

 let [tempName,tempNum] = [process.argv[3],process.argv[4]]
 let tempId = Math.floor(Math.random()*20000) 


const newObj = new Person( {
    id: tempId,
    name:tempName ,
    number: tempNum
  })



newObj.save().then( () => {
    console.log('The new Person Object has been saved in the database')
    mongoose.connection.close()

	}  )
}


*/
