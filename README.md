INSTRUCCIONES PARA CORRER EL PROYECTO 0. Instalar npm npm install

1. Instalar npm
   1.1 Instalar las dependencias de lucide react npm install lucide-react
2. Instalar dependencias de jest npm install --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom --legacy-peer-deps y tambien npm install jest-environment-jsdom --save-dev --legacy-peer-deps.
3. Usar el comando pnpm run dev para correr en local, la aplicación corren el el localhost:3000
4. Usar el comando npm run test

PATRON DE DISEÑO USADO
Se usaron 2 patrones de diseños.
-----El primer patron es el Observer para estado/aplicación.
Por ejemplo tenemos AuthContext y TaskContext, estos tienen reglas de negocio y también manejan los estados, el primero maneja los estados del usuario, cuando hace login, cuando hace logout, tambien maneja las rutas del mismo, de ahi tenemos el otro que es el de las tareas, el taskContext que maneja la información de las tareas de los usuarios, como se muestran, se crean, se actualiza, se eliminan.
-----El segundo patron es el patron de separación de responsabilidades del Repository pattern
este es el que maneja los datos que piden desde el contexto y las reglas del negocio, es donde se abstrae la informacion del local storage, y por lo mismo que estan separados facilitan el testing. Además mejora la testabilidad, descaolpamiento de lógica de UI y facilita el cambio de persistencia de localstorage a una API facilmente.

DECISIONES TÉCNICAS
-Se realizó la app con App router por razones de facil enrutamiento y rendimiento.
-Tailwind Css para facilidad y rapidez de prototipado de UI.
-Autenticacion basada en localstorage por simplicidad para el mvp, y pruebas.
-testing con jest para pruebas unitarias
