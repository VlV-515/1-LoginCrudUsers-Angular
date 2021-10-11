# Login - CRUD

_Pequeña aplicacion que consta de un login con autenticacion JWT, con doble vista, la vista del 'admin' que le permite controlar todo un CRUD de usuarios, y la vista de 'user' que puede ser personalizable 100%._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Necesitaremos de una api para este proyecto, la cual podras encontrar en el siguiente enlace._

```
https://enlace.com
```

_Angular requiere una versión LTS activa o LTS en mantenimiento de Node.js._

```
https://nodejs.org/en/about/releases/
```

_Te recomiendo como editor de códigos Visual Studio Code_

```
https://code.visualstudio.com/
```

_pero puedes utilizar cualquiera._

### Instalación del proyecto🔧

_Una vez clonado este repositorio, se deben instalar las dependencias para que se ejecute, asi que dentro de la carpeta del proyecto, ejecutaremos los siguientes comandos en terminal_

```
npm install
```

_Ahora, necesitaremos agregar la ruta de nuestra api._
_Dentro de este proyecto, navegaremos hasta el archivo de enviroment y agregaremos la ruta._

_Ruta de archivo:_

```
src -> environments -> environment.prod.ts
```

_Estamos listos, ahora solo nos queda arrancar el Front-End, en la consola ejecutaremos el siguiente comando._

```
ng serve -o
```

_Esperamos a que finalice y se debería abrir su navegador la aplicación. En caso de que no se abriera, de forma manual abra su navegador y acceda a la ruta_

```
http://localhost:4200/
```

## Recursos utilizados 🛠️

- [Json Web Tokens](https://jwt.io/) - Gestor de token de nuestra aplicacion.
- [Angular Jwt](https://www.npmjs.com/package/@auth0/angular-jwt) - Helper para checkToken
- [Bootstrap](https://getbootstrap.com/) - Usado para los estilos.
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Iconos usados para la decoración.
- [JSON Quick Type](https://quicktype.io/) - Utilizado para la creacion rapida de interfaces.
- [Sweet Alert 2](https://sweetalert2.github.io/) - Utilizado para las alertas.
- [Bootstrap widgets](https://ng-bootstrap.github.io/#/home) - Utilizado para el modal.
- [Pixabay](https://pixabay.com/es/) - Utilizado para la toma de imagenes sin copyright.