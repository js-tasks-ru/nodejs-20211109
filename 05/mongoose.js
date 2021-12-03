const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    name: {
        type: String
    }
});

const User = mongoose.model('User', schema);

async function main() {
    await mongoose.connect('mongodb://localhost:27017/nodejs-20210907-beta');

    const u = await User.create({
        email: 'user3@mail.com',
        name: 'user3',
    });

    const r = await User.findOneAndUpdate({email: 'user10@mail.com'}, {$unset: {name: 1}}, {new: true});

    console.log(r);

    await mongoose.disconnect();
}

main();
