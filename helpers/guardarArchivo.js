const fs = require('fs')
const archivo = './localStorage/data.json'

const guardarLocalStorage = (data) => {
   fs.writeFileSync(archivo, JSON.stringify(data))
}

const leerLocalStorage = () => {
    if(!fs.existsSync(archivo)){
        return null
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'})
    const data = JSON.parse(info)
    return data
}

module.exports = {
    guardarLocalStorage,
    leerLocalStorage
}