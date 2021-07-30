module.exports = () => ([
    {
        path: '/',
        method: 'get',
        handler: (req, res) => res.send('ok')
    }
]);
