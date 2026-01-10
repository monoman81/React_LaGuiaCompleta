import { Router } from "express"
import { body, param } from "express-validator"
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateAvailability,
    deleteProduct
} from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product name
 *           example: Monitor Curvo
 *         price:
 *           type: number
 *           description: The Product price
 *           example: 300
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array,
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags:
 *       - Products
 *     description: Returns a product by its id or a product doesn't exist message.
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Invalid id.
 *       404:
 *         description: Product not found.
 */
router.get('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monitor Curvo
 *               price:
 *                 type: number
 *                 example: 300
 *     responses:
 *       201:
 *         description: Product created successully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Invalid data.
 */
router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .isNumeric().withMessage('Precio no valido')
        .custom(value => value > 0).withMessage('Precio debe de ser mayor que 0'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates product with id
 *     tags:
 *       - Products
 *     description: Updates product with id with the user input data and return it
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product to update
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Monitor Curvo
 *               price:
 *                 type: number
 *                 example: 300
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Invalid id or invalid input data.
 *       404:
 *         description: Product not found.
 */
router.put('/:id',
    param('id').isInt().withMessage('Id no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .isNumeric().withMessage('Precio no valido')
        .custom(value => value > 0).withMessage('Precio debe de ser mayor que 0'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product availability
 *     tags:
 *       - Products
 *     description: Update the product availibility
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product to update
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Product availibility updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Invalid id or invalid input data.
 *       404:
 *         description: Product not found.
 */
router.patch('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     description: Delete product by given id.
 *     parameters:
 *     - in: path
 *       name: id
 *       description: The id of the product to delete
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: Producto eliminado
 *       400:
 *         description: Bad request. Invalid id or invalid input data.
 *       404:
 *         description: Product not found.
 */
router.delete('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    deleteProduct
)

export default router;