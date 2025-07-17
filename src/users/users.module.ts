import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { Example1Middleware } from './middlewares/example1/example1.middleware';


@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ExampleMiddleware).forRoutes("user")
    .apply(Example1Middleware).forRoutes("user")
    /*
    consumer.apply(ExampleMiddleware).forRoutes(
      {
        path: "user",
        method: RequestMethod.GET // this will only work on get methods on the user route
      },
      {
        path: "users/:id",
        method: RequestMethod.GET
      }
    )
    consumer.apply(ExampleMiddleware).forRoutes(UsersController) :- this too works 
    */
  }
}
