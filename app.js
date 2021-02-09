

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const homeStartingContent = "Welcome to the Modern Times!  ";

const aboutContent = " We are the natural home for leading authors, editors and societies.We help you explore a wide range of scholarly content through a powerful research and teaching platform. We collaborate with the academic community to help libraries connect students and faculty to vital content while lowering costs and increasing shelf space, provide independent researchers with free and low-cost access to scholarship, and help publishers reach new audiences and preserve their content for future generations."
const contactContent = "You can contact us and send us your entries at 'meenumeena2003@gmail.com'."
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://meenu_meena:IRI6CZCng0f4eKPk@cluster0.tswsg.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

//
// const p1= new Post({
//   title: "hh",
//   content: "jhh"
// });
// const p2 = new Post({
//   title:"hhh",
//   content:"qq"
// });
//
// const pp= [p1,p2];
//
// Post.insertMany(pp, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("success added");
//   }
// });


app.get("/", function(req, res){
  // res.render("home", {
  //   startingContent: homeStartingContent,
  //   posts: posts
  //   });


    Post.find({}, function(err, posts){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


let port = process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server  has started ");
});
