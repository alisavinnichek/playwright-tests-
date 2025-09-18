import { test, expect } from '@playwright/test';
const baseURL = 'https://restful-booker.herokuapp.com';

//Создание бронирования (POST)
test('Создание бронирования (POST) @api', async ({ request }) => {  // Добавил @api
    const bookingData = {
        firstname: "Иван",
        lastname: "Петров",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2024-01-05"
        },
        additionalneeds: "Завтрак"
    };

    const response = await request.post(`${baseURL}/booking`, {
        data: bookingData,
        headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.booking.firstname).toBe("Иван");
});

//Получение информации о бронировании (GET)
test('Получение информации о бронировании (GET) @api', async ({ request }) => {  // Добавил @api
    const createResponse = await request.post(`${baseURL}/booking`, {
        data: {
            firstname: "Иван",
            lastname: "Петров",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-01-01",
                checkout: "2024-01-05"
            },
            additionalneeds: "Завтрак"
        },
        headers: { 'Content-Type': 'application/json' }
    });
    
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("Иван");
});

//Обновление бронирования (PUT)
test('Обновление бронирования (PUT) @api', async ({ request }) => {  // Добавил @api
    const createResponse = await request.post(`${baseURL}/booking`, {
        data: {
            firstname: "Иван",
            lastname: "Петров",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-01-01",
                checkout: "2024-01-05"
            },
            additionalneeds: "Завтрак"
        },
        headers: { 'Content-Type': 'application/json' }
    });
    
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    const authResponse = await request.post(`${baseURL}/auth`, {
        data: { username: "admin", password: "password123" },
        headers: { 'Content-Type': 'application/json' }
    });
    
    const authResponseBody = await authResponse.json();
    const authToken = authResponseBody.token;

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
        data: {
            firstname: "Сергей",
            lastname: "Петров",
            totalprice: 200,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-01-01",
                checkout: "2024-01-05"
            },
            additionalneeds: "Завтрак"
        },
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("Сергей");
});

//Удаление бронирования (DELETE)
test('Удаление бронирования (DELETE) @api', async ({ request }) => {  // Добавил @api
    const createResponse = await request.post(`${baseURL}/booking`, {
        data: {
            firstname: "Иван",
            lastname: "Петров",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-01-01",
                checkout: "2024-01-05"
            },
            additionalneeds: "Завтрак"
        },
        headers: { 'Content-Type': 'application/json' }
    });
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;

    const authResponse = await request.post(`${baseURL}/auth`, {
        data: { username: "admin", password: "password123" },
        headers: { 'Content-Type': 'application/json' }
    });
    
    const authResponseBody = await authResponse.json();
    const authToken = authResponseBody.token;

    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        }
    });

    expect(response.status()).toBe(201);
    
    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
});
