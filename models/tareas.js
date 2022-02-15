const Tarea = require('./tarea')
const colors = require('colors')
class Tareas {
    _listado = {}
    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }
    constructor() {
        this._listado = {}
    }

    crearTarea = (desc = '') => {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    cargarTareasFromArray = (tareas = []) => {
        tareas.forEach(element => {
            this._listado[element.id] = element
        });

    }
    listarTareasCompleto =() =>{
        console.log()
        let tareaFormateada = ''
        this.listadoArr.forEach((element, index) => {
            const {desc, compeltadoEn} = element
            tareaFormateada = `${colors.green(index + 1)}. ${desc} :: ${compeltadoEn? 'Completada'.green : 'Pendiente'.red}` ;
            console.log(tareaFormateada)        
        });
    }

    listarPendientesCompletadas= (completadas = true) =>{
        console.log()
        let tareaFormateada = ''
        let listadoFiltrado = []
        const tareasCompletadas = this.listadoArr.filter(x => x.compeltadoEn)
        const tareasPendientes = this.listadoArr.filter(x => !x.compeltadoEn)

       completadas? listadoFiltrado = tareasCompletadas: listadoFiltrado = tareasPendientes
       listadoFiltrado.forEach((element, index) => {
            const {desc, compeltadoEn} = element
            tareaFormateada = `${colors.green(index + 1)}. ${desc} :: ${compeltadoEn}` ;
            console.log(tareaFormateada)        
        });
    }

    borrarTarea = (id ='') =>{
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleCompletadas =(ids =[])=>{
        let date = new Date()
        ids.forEach(id => {
           const tarea = this._listado[id] 
           if(!tarea.compeltadoEn){
                tarea.compeltadoEn = date.toLocaleDateString('es-ES')
           }
        })

        this.listadoArr.forEach(tarea => {
          if(!ids.includes(tarea.id)){
            this._listado[tarea.id].compeltadoEn = null 
          }  
        })
    }
}

module.exports = Tareas