var express = require('express')
var engines = require('consolidate')
var parser  = require('body-parser')

var users = require('./users.json')

function getUser(name) {
	return users.find(function(user) {
		return user.name === name
	})
}

var app = express()

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profiles', express.static('images'))
app.use(parser.urlencoded({extended: true}))

app.get('/', function (req, res) {
	res.render('index', {users: users})
})

app.get('/:username', function(req, res) {
	user = getUser(req.params.username)
	res.render('user', {user: user})
})

app.put('/:username', function(req, res) {
	var name = req.params.username
	var age  = req.body.age

	var user = getUser(name)

	user.age = age

	//saveUser()

	res.end()
})



var server = app.listen(3000, function() {
	console.log('Server running on port ' + server.address().port)
})