import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateSalesmanDto } from 'src/salesman/dto';
import { CreateCarDto } from 'src/car/dto';
import { CreateSaleDto } from 'src/sales/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3434);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3434');
  });

  afterAll(async () => {
    await app.close();
  });

  //testing user creation and authentication
  describe('Auth', () => {
    const dto: AuthDto = { email: 'test@test.com', password: '123456' };
    describe('Signup', () => {
      it('Should throw exception if email is empty at signup', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Should throw exception if password is empty at signup', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Should throw exception if no body at signup', async () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should create a new user', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('Should throw exception if email is empty at signin', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Should throw exception if password is empty at signin', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Should throw exception if no body at signin', async () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should not login a user with wrong credentials', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ ...dto, password: '123' })
          .expectStatus(403);
      });
      it('Should login a user', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });
    });
  });

  // testing user retrieval, deletion and update
  describe('Users', () => {
    describe('Get me', () => {
      it('Shoulg get the current logged user', async () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200)
          .expectBodyContains('email');
      });
      it('Should update the current user', async () => {
        const dto: EditUserDto = {
          name: 'Updated name',
          email: 'editedemail@test.com',
        };

        return pactum
          .spec()
          .patch('/users/me')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200)
          .expectBodyContains(dto.name && dto.email);
      });
    });
  });

  describe('Salesmen', () => {
    const dto: CreateSalesmanDto = { name: 'Test Salesman' };
    it('Should get an empty array of salesmen if none was created', async () => {
      return pactum
        .spec()
        .get('/salesmen')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectBody([]);
    });
    it('Should create a new salesman', async () => {
      return pactum
        .spec()
        .post('/salesmen')
        .withBody(dto)
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(201)
        .stores('salesmanId', 'id');
    });
    it('Should get an array of all salesmen created by the logged user', async () => {
      return pactum
        .spec()
        .get('/salesmen')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectJsonLength(1);
    });
    it('Should get a salesman by id', async () => {
      return pactum
        .spec()
        .get('/salesmen/{id}')
        .withPathParams('id', '$S{salesmanId}')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectBodyContains('$S{salesmanId}');
    });
    // it('Should update a salesman', async () => {});
    // it('Should delete a salesman', async () => {});
  });
  describe('Cars', () => {
    const dto: CreateCarDto = {
      licensePlate: 'ABC-1234',
      model: 'Gol',
      color: 'Vermelho',
      year: 2010,
      forSale: true,
    };
    it('Should get an empty array of cars if none was created', async () => {
      return pactum
        .spec()
        .get('/cars')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectBody([]);
    });
    it('Should create a new car', async () => {
      return pactum
        .spec()
        .post('/cars')
        .withBody(dto)
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(201)
        .stores('carId', 'id');
    });
    it('Should get an array of all cars created by the logged user', async () => {
      return pactum
        .spec()
        .get('/cars')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectJsonLength(1).inspect();
    });
    it('Should get a car by id', async () => {
      return pactum
        .spec()
        .get('/cars/{id}')
        .withPathParams('id', '$S{carId}')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectBodyContains('$S{carId}');
    });
    // it('Should update a car', async () => {});
    // it('Should delete a car', async () => {});
  });
  describe('Sales', () => {
    const dto: CreateSaleDto = {
      salesmanId: '$S{salesmanId}' as unknown as number,
      carId: '$S{carId}' as unknown as number,
      price: 10000,
      transactionDate: new Date(),
    };
    it('Should get an empty array of sales if none was created', async () => {
      return pactum
        .spec()
        .get('/sales')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectBody([]);
    });
    it('Should create a new sale', async () => {
      return pactum
        .spec()
        .post('/sales')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .withBody(dto)
        .expectStatus(201)
        .stores('saleId', 'id');
    });
    it('Should get an array of all sales created by the logged user', async () => {
      return pactum
        .spec()
        .get('/sales')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
        .expectJsonLength(1);
    });
    it('Should get a sale by id', async () => {
      return pactum
        .spec()
        .get('/sales/{id}')
        .withPathParams('id', '$S{saleId}')
        .withHeaders({ Authorization: 'Bearer $S{token}' })
        .expectStatus(200)
    });
    // it('Shoulg get a sale by salesman id', async () => {});
    // it('Should update a sale', async () => {});
    // it('Should delete a sale', async () => {});
  });
});
