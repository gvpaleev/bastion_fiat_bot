const fs = require('fs')


class Messages{
    constructor(){
        this.pathDir='./messages'
    }
    getWellcomMenu(){
        let data = fs.readFileSync(`${this.pathDir}/welcomMenu.html`)
        return String(data)
    }
    getGlMenu(){
        let data = fs.readFileSync(`${this.pathDir}/glMenu.html`)
        return String(data)
    }
}

module.exports = new Messages
