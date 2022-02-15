const inquirer = require('inquirer')
require('colors')

const preguntas = {
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: '1',
            name: `${'1.'.green} Crear tareas`
        },
        {
            value: '2',
            name: `${'2.'.green}  Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.green}  Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.green}  Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green}  Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green}  Borrar tareas`
        },
        {
            value: '0',
            name: `${'0.'.green}  Salir`
        },
    ]
}

const inquierMenu = async () => {
    console.clear()
    console.log('========================'.green);
    console.log('   Seleccione una opcion'.yellow);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}

const pausa = async () => {
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(pregunta)
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const index = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`
        }
    })
    choices.unshift({
        value: 0,
        name: '0. '.green + 'Cancelar'
    })
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]
    const { id } = await inquirer.prompt(preguntas)
    return id
}

const mensajaConfirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const index = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.compeltadoEn? true: false)
        }
    })

    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]
    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

module.exports = {
    inquierMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mensajaConfirmar,
    mostrarListadoCheckList
}