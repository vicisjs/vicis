# Приклад на NestJS

---

Замінює або доповнює ["class-transformer"](https://github.com/typestack/class-transformer)

## Сутність

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Vicis } from "vicis";

const serializer = Vicis.factory({ omit: ["password"] });

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "text" })
  password: string;

  public toJSON(): Partial<UserEntity> {
    return serializer.data(this).toJSON();
  }
}
```

## Сервіс

```typescript
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
```

## Модуль

```typescript
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
```

## Контролер

```typescript
import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("superadmin")
  findOne(): Promise<User> {
    return this.userService.findOne({ name: "Sir Mullich" });
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
```

<table>
<thead>
<tr><td colspan="3">

Шлях **"/superadmin"**

</td></tr>
</thead>
<tbody>
<tr>
<td>

```js
@Get("superadmin")
findOne(): Promise<User> {
  return this.userService
    .find({ name: "Sir Mullich" });
}
// {
//   _id: "5e1e27aea68ed00f94ee6dba",
//   name: "Sir Mullich",
//   password: "Sir Mullich the Knight",
//   __v: 0
// }
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
{
  "id": "5e1e27aea68ed00f94ee6dba",
  "name": "Sir Mullich"
}
```

</td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr><td colspan="3">

Шлях **"/users"**

</td></tr>
</thead>
<tbody>
<tr>
<td>

```js
@Get()
findAll(): Promise<User[]> {
  return this.userService.findAll();
}
// [
//   {
//     _id: 5e1e27aea68ed00f94ee6dba,
//     name: 'Sir Mullich',
//     password: 'Sir Mullich the Knight',
//     __v: 0
//   },
//   {
//     _id: 5e1e2854df79770e20979738,
//     name: 'Tiva',
//     password: 'Tiva the Witch',
//     __v: 0
//   }
// ]
```

</td>
<td>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
<strong>&#x21E5;</strong><br>
</td>
<td>

```json
[
  {
    "id": "5e1e27aea68ed00f94ee6dba",
    "name": "Sir Mullich"
  },
  {
    "id": "5e1e2854df79770e20979738",
    "name": "Tiva"
  }
]
```

</td>
</tr>
</tbody>
</table>

---
