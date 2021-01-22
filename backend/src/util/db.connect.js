const mongoose = require('mongoose');
// custom
require('./../util/colors');
import { getDBUri } from './config.util';

// the two warnings when mongoose interacts with driver of MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(getDBUri(), options);

mongoose.connection.once('open', () => { console.log(`MongoDB Connected`.info); });
mongoose.connection.on('error', (err) => { console.log(`MongoDB connection error: ${JSON.stringify(err)}`.error); });