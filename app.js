const colors = require('colors');
const { guardarLocalStorage, leerLocalStorage } = require('./helpers/guardarArchivo');
const { inquierMenu, pausa, leerInput, listadoTareasBorrar, mensajaConfirmar, mostrarListadoChecList, mostrarListadoCheckList } = require('./helpers/inquire');
const Tareas = require('./models/tareas');
console.clear()

const main = async () => {
    let opcion = ''
    const tareas = new Tareas()
    const tareasLS = leerLocalStorage()

    if (tareasLS) {
        tareas.cargarTareasFromArray(tareasLS)
    }
    do {
        opcion = await inquierMenu()
        switch (opcion) {
            case '1':
                //CREAR TAREA
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
                break
            case '2':
                //LISTAR TAREAS
                tareas.listarTareasCompleto()
                //console.log(tareas.listadoArr)
                break
            case '3':
                tareas.listarPendientesCompletadas(true)
                break
            case '4':
                tareas.listarPendientesCompletadas(false)
                break
            case '5':
                //COMPLETADO | PENDIENTE
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break
            case '6':
                //BORRAR TAREA
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== 0) {
                    const confirmacion = await mensajaConfirmar('Esta seguro de continuar?')
                    if (confirmacion) {
                        tareas.borrarTarea(id)
                        console.log('\nLa tarea se borró exitosamente!!'.green)
                    }
                }
            case '7':
            case '0':
            default:
                break;
        }
        guardarLocalStorage(tareas.listadoArr)
        await pausa()
    } while (opcion !== '0')

}

main();