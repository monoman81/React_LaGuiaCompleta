import request from "supertest"
import server from "../../server"

describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty('data')
        expect(response.body.errors).toHaveLength(4)
    })

    it('should validate price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    })

    it('should validate price is valid number', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            price: "Hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor - Testing",
            price: 50
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(true)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })

})

describe('GET /api/products', () => {

    it('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
    })

})

describe('GET /api/products/:id', () => {

    it('should return a 404 response for a non existing product', async () => {
        const id = 2000
        const response = await request(server).get(`/api/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should check a valid id in the URL', async () => {
        const id = 'hola'
        const response = await request(server).get(`/api/products/${id}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0]).toHaveProperty('msg')
        expect(response.body.errors[0].msg).toBe('Id no valido')
    })

    it('get a JSON response for a single product', async () => {
        const id = 1
        const response = await request(server).get(`/api/products/${id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })

})

describe('PUT /api/products/:id', () => {

    it('should validate id', async () => {
        const id = 'hola'
        const response = await request(server).put(`/api/products/${id}`).send({
            name: 'Monitor Curvo',
            price: 200,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    it('should validate empty json before updating', async () => {
        const id = 1
        const response = await request(server).put(`/api/products/${id}`).send({

        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)
    })

    it('should validate valid price before updating', async () => {
        const id = 1
        const response = await request(server).put(`/api/products/${id}`).send({
            name: 'Monitor curvo',
            price: 'hola',
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
    })

    it('should validate price greater than 0', async () => {
        const id = 1
        const response = await request(server).put(`/api/products/${id}`).send({
            name: 'Monitor curvo',
            price: 0,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    })

    it('should return a 404 response for a non existing product', async () => {
        const id = 2000
        const response = await request(server).put(`/api/products/${id}`).send({
            name: 'Monitor Curvo',
            price: 200,
            availability: true
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should update product', async () => {
        const id = 1
        const response = await request(server).put(`/api/products/${id}`).send({
            name: 'Monitor Curvo',
            price: 200,
            availability: true
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.name).toBe('Monitor Curvo')
        expect(response.body.data.price).toBe(200)
        expect(response.body.data.availability).toBe(true)
    })

})

describe('PATCH /api/products/:id', () => {

    it('should validate id', async () => {
        const id = 'hola'
        const response = await request(server).patch(`/api/products/${id}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    it('should return a 404 response for a non existing product', async () => {
        const id = 2000
        const response = await request(server).patch(`/api/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should toggle the availability', async () => {
        const id = 1
        const response2 = await request(server).get(`/api/products/${id}`)
        const response = await request(server).patch(`/api/products/${id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).not.toBe(response2.body.data.availability)

    })

})

describe('DELETE /api/products/:id', () => {

    it('should validate id', async () => {
        const id = 'hola'
        const response = await request(server).delete(`/api/products/${id}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    it('should return a 404 response for a non existing product', async () => {
        const id = 2000
        const response = await request(server).delete(`/api/products/${id}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should delete a valid product', async () => {
        const id = 1
        const response = await request(server).delete(`/api/products/${id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')

        const response2 = await request(server).get(`/api/products/${id}`)
        expect(response2.status).toBe(404)
        expect(response2.body).toHaveProperty('error')
        expect(response2.body.error).toBe('Producto no encontrado')
    })

})