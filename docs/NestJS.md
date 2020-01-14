# NestJS example

----------

Replaces or complements ["class-transformer"](https://github.com/typestack/class-transformer)

```typescript
import { Vicis } from "vicis/es";

const serializer = Vicis.factory({ omit: ["password"] });

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  password: string;

  public toJSON(): Partial<UserEntity> {
    return serializer.data(this).toJSON();
  }
}
```

----------
