<template>
  <main>
  <div class="w-full bg-rose-500">
      <div><img src="../assets/pp.jpg" alt="" class="w-full h-32"></div>

      <!-- channel info section -->
      <div class="w-9/12 bg-green-500 m-auto flex justify-center flex-col items-center"> 
        <!-- profile picture -->
        <div>
          <!-- <img src="../assets/ppCarre.png" alt="" class= "rounded-full w-1/4"> -->
          <router-link to="/modifpp"><img src="../assets/ppCarre.png" alt="" class= "rounded-full w-1/4 bg-rose-500 m-auto"></router-link>
        </div>
        <!-- channel info text -->
        <div class="flex items-center flex-col">
          
          <h2>NOM CHAINE</h2>
          <h3>chaine data</h3>
          <!-- description + arrow button -->
          <div>
            <h3>description fkjdlkjdjldjlfjlkdjljdljdfljdk... <router-link to = "/description">></router-link> </h3>
            <button class="text-center">S'abonner</button>

            <ul class="flex justify-around">
              <li><router-link to = "/description">></router-link></li>
              <li><router-link to = "/description">></router-link></li>
              <li><router-link to = "/description">></router-link></li>
              <li><router-link to = "/description">></router-link></li>
            </ul>
           

           


          </div>
        </div>
      </div>

      <H2>nos vidéos</H2>
      <!-- composant video -->
     
      <div class="bg-green-500 flex">
        <router-link to = "/video"><img src="../assets/pp.jpg" alt="" class="marginw-3/4 rounded-lg"></router-link>
        <p>titre de la video trop cool</p>
        <button>X</button>
      </div>
              <p>data video</p>
  </div>  
  </main>

  


</template>

<script>
console.log("eduardo est gentil")
</script>
