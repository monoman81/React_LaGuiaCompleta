import express from "express"
import colors from "colors"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUI from "swagger-ui-express"
import swaggerSpec, { swaggerUIOptions } from "./config/swagger"
import router from "./routes"
import db from "./config/db"

//conectar a base de datos
export const connectDB = async () => {
    try {
        await db.authenticate()
        await db.sync()
        // console.log(colors.blue.bold('Conexion exitosa al BD'))
    }
    catch(error) {
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}

connectDB()

//Instancia de Express
const server = express()
//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))
//Leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products', router)
//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server