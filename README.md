# To-do-list

### Aplicación Node
***
Primero instalar todos los paquetes a usar

```
$ npm install
```
Empezar el servidor de node
```
$ node app.js
```

### Docker-compose 
***
Instala las instancias están el puerto 3001 y 3002, luego con nginx los balancea
```
$ docker-compose up
```

### Funcionamiento 

***
Primero la aplicación de node, usa express para usarse como servidor, además utiliza las librerías de mongoose para poder traer toda la información de la base de datos, también utiliza body-parser para hacer los request que haga la aplicación, y por último, utiliza CORS para resolver un problema a la hora de intentar usarla 

La aplicación está en la parte /tasks y tiene 4 acciones, la primera que es solo /task y es protocolo GET que tiene obtiene todas las aplicaciones de la misma, la segunda que es esta /tasks y que en body se pone la información de title y descripcion con el protocolo POST, la tercera es /tasks/id que se usa para editar alguna de las tareas y esto se usa con el protocolo PUT, y el último, en el /tasks/id con el protocolo DELETE lo que hace es eliminar.

El dockerfile lo que hace es para levantar las instancias que van a correr la aplicación, que usa una imagen de Node y luego instala todo para su uso y corre el servidor

El docker-compose lo que hace en pocas palabras es utilizar el dockerfile para levantar las instancias de node y una la correré en 3001 y la otra en 3002 y levanta una tercera que va a hacer un balance de las dos apps antes dicha, con una imagen de nginx y con los volúmenes cambia el archivo nginx.conf y lo conecta con el puerto 80



