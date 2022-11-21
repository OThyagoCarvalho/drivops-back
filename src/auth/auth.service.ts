import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    // Hash the password
    const hashedPassword = await argon.hash(dto.password);
    // Create the user and save it to the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashedPassword,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already in use');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    //find the user in the database by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //throw an error if the user is not found
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    //compare the password with the hashed password
    const matchingPassword = await argon.verify(
      user.hashedPassword,
      dto.password,
    );
    //throw an error if the password is not correct
    if (!matchingPassword) {
      throw new ForbiddenException('Invalid credentials');
    }
    //return the user
    return this.signToken(user.id, user.email);
  }

  // Create a JWT token
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
