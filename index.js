// let persons = require('./persons')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

console.log(process.env.MONGODB_URL)
const Persons  = require('./models/mongo')

console.log("Info about persons",typeof Persons, Persons)


const app = express()


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('dist'))



app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('Request Body:', req.body);
  }
  next();
});

const PORT = process.env.PORT  || 3001


app.get('/api/persons',(req,res)=> {
       Persons.find({}).then( person => {
       res.send(person)	
       console.log(`All available resources has been sent`)
       })
})


app.post('/api/persons',(req,res)=> {
	
	let newObj =  new Persons( {
          id : Math.floor(Math.random() * 20000),
	 name :  req.body.name,
	 number : req.body.number
	})
	console.log(newObj)
        newObj.save().then( item => res.status(201).send("Person has been saved")  )
        .catch( err => res.status(500).send("Unable to save the person: " + err.message) )
})



app.get('/info',(req,res)=> {
	const currentTime = new Date(Date.now())
	res.send(`Phonebook has info for many people <br/>
          ${currentTime}`
	)
	})



// for single resource


/*
app.get('/api/persons/:id',(req,res) => {
	const id = req.params.id
        const person = persons.find( (item) => id == item.id  )
	if(person)(
          res.send(person)
	)
	else
	  res.status(404).end()
	})


app.get('/info',(req,res)=> {
	const currentTime = new Date(Date.now())
	res.send(`Phonebook has info for ${persons.length} people <br/>
          ${currentTime}`
	)
	})


app.delete('/api/persons/:id',(req,res) => {
	const id = req.params.id
        persons = persons.filter( (item) => id !== item.id  )
        res.status(204).end()
	})


app.post('/api/persons/',(req,res)=> {
	let newResource = req.body
	if(newResource.name === '' || newResource.number === '' || 
	   !newResource.hasOwnProperty('name') || !newResource.hasOwnProperty('number'))
	  return res.status(400).json('The name or number is missing')	
        
	let tempName = req.body.name
        
	if( persons.find( item => tempName === item.name ))
	  return res.status(400).json('The name must be unique')	
                  		

        newResource.id = Math.floor(Math.random() * 100000)
        persons = persons.concat(newResource)
	console.log(newResource, `has been added`)
        res.status(201).json(newResource)
	})

*/

app.listen(PORT, () =>
console.log(`app is running on ${PORT}`))
