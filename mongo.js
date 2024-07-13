const mongoose = require('mongoose')


if(process.argv.length < 3){
	console.log('Please provide the password for mongoose as arguments')
        process.exit(1)
	}

const password = process.argv[2]
const uname = 'crusaderr'

//console.log(password)

const url = `mongodb+srv://crusaderr:${password}@cluster0.eoriqjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('debug',true)

//console.log('Before connection')
mongoose.connect(url)
//console.log('After connection')



mongoose.set('strictQuery',false)

const personSchema = new mongoose.Schema({
   id : String,
   name : String,
   number : String 
	})

const Person = new mongoose.model('Person',personSchema)



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

