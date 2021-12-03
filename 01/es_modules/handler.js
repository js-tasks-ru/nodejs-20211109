let i = 0;

const obj = {};

function handler(req, res) {
    obj[Math.random()] = '*'.repeat(1000000).split('');

    i++;
    res.end(i.toString());
}

export default handler;