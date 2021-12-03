let i = 0;

function handler(req, res) {
    i++;
    res.end(i.toString());
}

module.exports = handler;

// exports.handler = handler;
// exports.foo = foo;

// module.exports = { handler };
