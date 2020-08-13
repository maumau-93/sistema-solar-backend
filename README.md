# Sistema Solar
En una galaxia lejana, existen tres civilizaciones. Vulcanos, Ferengis y Betasoides. Cada civilización vive en paz en su respectivo planeta. El comportamiento de cada planeta está descrito a continuación:
  - Ferengi: se desplaza a una velocidad angular de 1 grado/día en sentido horario y su distancia respecto 
  al sol es de 500Km.
  - Betasoide: se desplaza a una velocidad angular de 3 grados/día en sentido horario y su distancia respecto
  al sol es de 2000Km
  - Vulcano: se desplaza con una velocidad angular de 5 grados/día en sentido anti-horario y su distancia
  respecto al sol es de 1000Km

> Esta galaxia se encuentra sumida en una importante crisis climática en la que
> determinar las condiciones metereológicas se ha convertido en una necesidad urgente
> pues los días de lluvia son continuos y prolongados, y en los últimos años los 
> días secos o con condiciones de clima ideales han escaseado.

# Requisitos
Las civilizaciones que viven en esta galaxia quieren conocer de antemano el clima que van a experimentar durante los próximos años, para esto requieren determinar:
  - La cantidad de periodos continuos de sequía.
  - La cantidad de periodos continuos de lluvia.
  - El día de máximas precipitaciones en la galaxia. 
  - La cantidad de periodos continuos de condiciones óptimas de presión y temperatura.

Adicional a esto, las civilizaciones han considerado que sería ideal:
- Generar de manera paulatina las predicciones climáticas de la galaxia
- Tener un REST API en el cual se pueda consultar la predicción climática para un día determinado
- Tener acceso a dicho REST API en la red, de manera que cualquier ciudadano pueda consultarlo

# Solución
En procura de dar pronósticos acertados a los habitantes de la galaxia, se tuvieron en cuenta las siguientes
consideraciones: 
- El sistema fue diseñado con alta precisión decimal, lo cual se evidenciará en la baja cantidad de días de
sequía y condiciones óptimas de clima y presión, pues esto requerirá una alineación planetaria casi perfecta.
Tolera únicamente una desviación de `0.05` unidades en la pendiente que determina si los planetas están
alineados en ambos casos. 
- El sistema calcula la predicción del clima en rangos de `20 días` cada `2 minutos` y lo hará de 
manera indefinida, más allá de los 10 años. (En un sistema real, esta parametrización sería distinta)
- El sistema calculará los días más populares de consulta y los almacenará temporalmente en un 
`database cache`. En este caso, una vez un día determinado haya sido consultado más de `10 veces` 
durante el mismo día, será almacenado durante 24 horas en el cache para evitar sobrecargar la base de
datos.
- Siguiendo el desplazamiento del planeta `Ferengi`, se determinó que un año será equivalente a 360 días.
- Para los periodos de tiempo, se tuvo en cuenta la siguiente definición de periodo: "Un periodo será 
equivalente a la cantidad de días continuos bajo una misma condición climática". Dicho esto, si en el 
día 1 el clima es sequía, en el 2,3 y 4 el clima es lluvia y en el quinto el clima es óptimo, en estos
cinco días hay un periodo de sequía, un periodo de lluvia y un periodo de clima óptimo.

# ¿Cómo Acceder?
Toda la información requerida por las civilizaciones está disponible mediante REST APIs descritos a continuación
# Crear Planetas
Si bien actualmente existen tres planetas y el sol, no se descarta que en el futuro nuevos planetas puedan
incluirse en la galaxia, para hacerlo podrá ejecutarse:
```sh
POST/ http://18.223.214.40:3977/api/planet
```
Para esto, se debe enviar en el `body` un objeto con la siguiente estructura:
```json
{
    "planet" : {
        "name":"NombrePlaneta",
        "distanceToSun": 10000,
        "angularSpeed": 10,
        "planetDirection": 1
    }
}
```

El planeta a guardar debe cumplir con una serie de condiciones necesarias para ser admitido: 
- `name` debe ser un string de longitud mínima 2 y longitud máxima 30
- `distanceToSun` debe ser un número
- `angularSpeed` debe ser un número
- `planetDirection` debe ser `1` o `-1` (Faltó forzar esta condición en el validador)

Esta petición puede retornar de tres maneras:
- `HTTP 400 - BAD REQUEST` Cuando el planeta que se pretende guardar no cumple con las condiciones descritas.
- `HTTP 500 - INTERNAL SERVER ERROR` Si hay un fallo grave en la conexión a la base de datos
- `HTTP 200 - OK` Cuando el planeta se guarda correctamente. También se retorna el planeta guardado

NOTA: En la instancia que se referencia en este documento, los planetas ya están creados, si se intenta crear un planeta con nombre repetido, retornará error, pues el nombre está marcado como llave única. 

# Obtener Pronóstico Climático
Para obtener el pronóstico climático basta con hacer la siguiente petición: 
```sh
GET/ http://18.223.214.40:3977/api/weather/{day}
```
Para que la petición sea aceptada, el parámetro `day` deberá ser un número entero, por ejemplo, la siguiente
petición es válida:
```sh
GET/ http://18.223.214.40:3977/api/weather/60
```
Esta petición puede retornar de tres maneras: 
`HTTP 400 - BAD REQUEST` Cuando el dia enviado por parámetro no es un número entero
`HTTP 404 - NOT FOUND` Cuando el pronóstico del clima para ese día aun no ha sido calculado
`HTTP 200 - OK` El pronóstico climático se encuentra correctamente. Se retornará de la siguiente manera:
```json
{
    "day": 60,
    "weather": "rainy"
}
```

# Obtener Estadísticas Climáticas
Para obtener la cantidad de periodos encontrados por el sistema predictivo al momento de realizar la consulta, basta con hacer la siguiente petición:
```sh
GET/ http://18.223.214.40:3977/api/weather/:condition?
```

Como se puede observar, el parámetro `condition` es opcional. Si no es provisto, se realizará la consulta para todos los tipos de clima disponibles, retornando un objeto que luce como el siguiente:
```json
{
    "drought": 10,
    "optimal": 2,
    "rainy": 1412
}
```
Cuando el parámetro `condition` es provisto, únicamente tres valores son aceptados: `rainy`, `optimal`, `drought`
Cualquier otro valor será rechazado, dando como resultado un objeto como el siguiente. 
```sh
GET/ http://18.223.214.40:3977/api/weather?condition=rainy
```
```json
{
    "rainy":1335
}
```
Esta petición puede retornar de tres maneras:
`HTTP 400 - BAD REQUEST` Cuando la condición enviada no es válida (como se menciona arriba)
`HTTP 500 - INTERNAL SERVER ERROR` Cuando hay un error de conexión a la base de datos
`HTTP 200 - OK` Cuando se encuentra de manera correcta la cantidad de periodos

# Obtener Día de Máxima Precipitación
Para obtener el día en el que la lluvia es máxima hasta la fecha que el sistema haya calculado, basta con hacer la siguiente petición:
```sh
GET/ http://18.223.214.40:3977/api/weather/precipitation/max
```
Esta petición puede retornar de dos maneras:
`HTTP 500 - INTERNAL SERVER ERROR` Cuando hay un error de conexión a la base de datos
`HTTP 200 - OK` Cuando se obtiene de manera correcta el día de máxima precipitación. Retonará de la siguiente forma:
```json
{
    "day":2227,
    "trianglePerimeter":7887.829494482417
}
```

### Tech
Este proyecto fue construido utilizando las tecnologías listadas a continuación: 
- NodeJS - Express
- MongoDB - Base de datos no relacional basada en documentos
- Mongoose - ODM para MongoDB
- JsonSchema - API validators
- Custom Env - Inyección de variables de entorno de acuerdo al stage de despliegue de la aplicación
- Helmet - Configuración de seguridad del API (No mostrar tecnología del backend, no permitir sniffing. Etc.)
- Winston - Todo para logging
- Agenda - Todo para Scheduled Tasks / Jobs

También fueron incluídas algunas dependencias para desarrollo y configuración del proyecto
- Eslint - code-styling consistente para todo el equipo de desarrollo
- Prettier - Formato de código consistente para todo el equipo de desarrollo
- Husky - Configuración de pre-commit y pre-push hooks
- Jest - Framework de pruebas desarrollado por Facebook
- Nodemon - Reiniciar el servidor cada vez que se hace un cambio
- Typescript - Uso de lenguaje fuertemente tipado para trabajar la aplicación de manera consistente y con tipado seguro.
- PM2 - Gestor de procesos de nodejs para producción (usado únicamente en AWS)

También se descartaron algunas tecnologías
- gulp, grunt - Task runners muy usados en el mercado, exigen demasiada configuración y su ventaja sobre los NPM scripts suele ser marginal.
- Mocha, Chai, Sinon - Consideré que lo que hacen estas tres tecnologías juntas son cubiertas en general por Jest.
- Tslint - Fue marcado como `deprecated` en favor del clásico `eslint`

### Instalación (Local)
Para ejecutar el proyecto en un ambiente local es necesario:
- Tener un servicio de MongoDB Activo (https://docs.mongodb.com/manual/installation/)
- Tener un servicio de Redis Activo (https://redis.io/topics/quickstart)
- Tener nodeJS installado (https://nodejs.org/es/) En este proyecto se usó la versión LTS 12.18.3
Cumplidos los requisitos, basta con clonar el repositorio, acceder al directorio del proyecto y ejecutar los siguientes comandos

```sh
$ npm i # Instalación de dependencias
$ npm run start:dev # Iniciar la aplicación en modo de desarrollo
```

Para ejecutarlo en un ambiente productivo, se realiza lo siguiente: 
```sh
$ npm install
$ NODE_ENV=production node build/app.js
```
Como se puede observar en el código, no hay referencia a hacer clustering nativo de NodeJS ni hay uso explícito de worker threads. Esta fue una decisión de practicidad tomada para este proyecto. En el despliegue en AWS, se aplicó clustering utilizando PM2.

### Arquitectura de la solución
Esta era la arquitectura de solución planeada a implementar en AWS. Sin embargo, tuve problemas con la cuenta y al final todo quedó limitado a un servidor de aplicación, un servidor de DB Cache (Redis) y un servidor de base de datos MongoDB.

