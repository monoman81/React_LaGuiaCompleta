import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: {
    swaggerDefinition: {
        openapi: string;
        tags: {
            name: string
            description: string
        }[];
        info: {
            description: string
            title: string
            version: string
        }
    };
    apis: string[]
} = {
    swaggerDefinition: {
        openapi: '3.1.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Products - PERN',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerUIOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentacion REST api typescript'
}
export default swaggerSpec
export {
    swaggerUIOptions
}