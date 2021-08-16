const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-networld-18', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
