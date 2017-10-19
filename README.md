Angular library for connecting with the [SnelStart B2B API](https://b2bapi-developer.snelstart.nl/).

## Usage
1. Add to your project
```bash
$ npm install ngx-snelstart-b2b-client --save
```
2. Add to the imports of your root (app) module:
```
imports: [
    ...
    B2bClientModule.forRoot(),
    ...
]
```
3. Inject the service:
```
private client: B2bClientService
```
4. Configure:
```
let config = new B2bConfig(this.subscriptionKey, this.koppelSleutel);
this.client = new B2bClientService(config);
```
5. Authorize koppelingSleutels:
```
this.client.authorize()
    .subscribe(() => {});
```
5. Start using:
```
this.relaties = this.client.get("/relaties")
    .map((res: Response) => res.json())
```