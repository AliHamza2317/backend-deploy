


const first = (req, res) => {

    res.send({ message: 'Hello from /first route' });
}


const second = (req, res) => {

    res.send({ message: 'Hello from /second route' });
}

module.exports={
    first,
    second
    
}