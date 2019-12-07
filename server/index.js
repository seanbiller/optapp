const express = require('express')
const fileUpload = require('express-fileupload')
const NodeStl = require('node-stl')

const app = express()

// this required to tell express where static content can be delivered from
// such as css and js for the client and the initial html web page
app.use('/client', express.static('client'))

// used for sendFile ***NEED FURTHER RESEARCH ON WHY THIS IS NECESSARY***
app.use(express.static('client'))

// To extract the form data, we use the express.urlencoded() middleware
app.use(express.urlencoded())

// to handle a file upload and save it
// per https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
app.use(fileUpload())

app.get('/', (request, response) => {
  // this sendFile function works when we have used the 'static' configuration first
  response.sendFile('./client/index.html')
})

app.post('/model-info', (request, response) => {
  // use the servers console to show what files came in
  console.log(request.files)

  //__dirname is the current directory 
  console.log({__dirname})
  const uploadPath = `${__dirname}/_uploads`
  console.log({uploadPath})

  // process the stl file raw content as uploaded
  let stlData = new NodeStl(request.files.stlfile.data, {density: 1.04})
  console.log("Part Volume: " + stlData.volume)

  // echo info back to the user
  response.send(stlData)
})

app.listen(1337, () => { console.log('Listening on port 1337') })



module.exports = app
