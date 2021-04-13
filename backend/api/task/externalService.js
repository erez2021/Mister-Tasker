function execute(task) {
    console.log(task);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (Math.random() > 0.5) {
                resolve(parseInt(Math.random() * 100))
                console.log('external service says: done');
             } else reject('Err');
        }, 0)
    })
}

module.exports = {
execute
}