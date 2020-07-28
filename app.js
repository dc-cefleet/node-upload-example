const express = require('express');
const app = express();
const formidable = require('formidable');

app.use(express.static("public"));

app.post("/image-uploaded", (req,res)=>{

    let form = {};

    //this will take all of the fields (including images) and put the value in the form object above
    new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
        form[name] = field;
      })
    .on('fileBegin', (name, file) => {
        //sets the path to save the image
        file.path = __dirname + '/public/profile_images/' + new Date().getTime() + file.name
    })
    .on('file', (name, file) => {
        //console.log('Uploaded file', name, file);
        form.profile_image = file.path.replace(__dirname+'/public',"");
    })
    .on('end', ()=>{
        console.log(form);
        //Now i can save the form to the database
        //db.createItem(form)//not exact code here
        //.then(result=>res.send(result))

        res.send(form) //this just sends databack
    })
})

const port = 5434;
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})