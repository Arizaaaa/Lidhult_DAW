# Lidhult_DAW
Proyecto de DAW

   Este es el proyecto del segundo curso del Ciclo Formativo de Grado Superior de Desarrollo de Aplicaciones Web que hice junto a dos compañeros de clase.

   El proyecto se basó en que cada grupo debía hacer una web interactiva en el que los alumnos tengan un ranking que administre el profesor de la asignatura.

   Esta versión del código es funcional pero prematura ya que faltan ideas por implementar.

   Para empezar con la web deberá utilizar los siguientes comando:
   
   php artisan serve   //Iniciar el servicio de Laravel
   php artisan migrate   //Migrar la base de datos
   php artisan migrate:fresh   //Refrescar la base de datos
   php artisan db:seed   //Rellenar la base de datos con algunos datos aleatorios y otros esenciales
   php artisan schedule:work   //Inicia el servicio de horario, es esencial ya que los puntos de ranking se resetean una vez por semana (cada lunes a las 00:00)

   npm install   //Instala la base de angular (ng_module)
   ng serve --open   //Inicia el servicio de angular y lo abre en una pestaña nueva del navegador
