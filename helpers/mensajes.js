const colors =require('colors')


const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear()
        console.log('========================'.green);
        console.log('   Seleccione una opcion'.yellow);
        console.log('========================\n'.green);

        console.log(`${colors.green(1)}. Crear tarea`)
        console.log(`${colors.green(2)}. Listar tareas`)
        console.log(`${colors.green(3)}. Listar tareas completadas`)
        console.log(`${colors.green(4)}. Listar tareas pendientes`)
        console.log(`${colors.green(5)}. Completar tarea(s)`)
        console.log(`${colors.green(6)}. Borrar tarea`)
        console.log(`${colors.green(0)}. Salir\n`)

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question('Seleccione una opción:  ', (opt) => {
            readLine.close()
            resolve(opt)
        })
    })
}
const pausarMenu = () => {
    return new Promise(resolve =>{
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`\nPresione ${'ENTER'.yellow} para continuar \n`, (opt) => {
            readLine.close()
            resolve()
        })
    })
}

module.exports = { mostrarMenu, pausarMenu };