# Compose classes

## Use

```
import { Compose } from 'https://raw.githubusercontent.com/danielbeeke/compose/master/Compose.ts';

class User extends Compose (Foo, Bar) {
    constructor () {
        super({
            Foo: 'Foo',
            Bar: ['a', 23],
        });
    }
}
```

Use Compose to make a composition of classes. Construct them with an object keyed by the class names and the properties.

## Testing

```
deno run test/Compose.test.ts
```

## Building for other platforms

./build.sh