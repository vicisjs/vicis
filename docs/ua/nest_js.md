# Приклад на NestJS

---

Замінює або доповнює ["class-transformer"](https://github.com/typestack/class-transformer)

## Сутність

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { omit, Serialize, serialize } from "@vicis/decorators";

@Entity({ name: "user" })
@Serialize()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @serialize()
  id: string;

  @Column({ length: 50 })
  @serialize()
  name: string;

  @Column({ type: "text" })
  @omit
  password: string;
}
```

Альтернатива з декораторами.

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Vicis } from "vicis";
import { omit, serializable, serialize } from "@vicis/decorators";

const serializer = Vicis.factory({ omit: ["password"] });

@Entity({ name: "user" })
@serializable
export class User {
  @PrimaryGeneratedColumn("uuid")
  @serialize()
  id: string;

  @Column({ length: 50 })
  @serialize()
  name: string;

  @Column({ type: "text" })
  @omit
  password: string;
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
