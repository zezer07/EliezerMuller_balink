const express = require('express');
const usersRouter = require('./routers/usersRouter');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/api/users', usersRouter);

app.listen(8000);