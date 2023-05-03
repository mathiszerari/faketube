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
     
      <div class="bg-green-500 grid justify-items-center">
        <router-link to = "/video"><img src="../assets/pp.jpg" alt="" class="rounded-lg w-full border-solid border-2 border-sky-950"></router-link>
        <p class="mr-60">titre de la video</p>
        <p class = "flex">10 k vues <p> il y a temps</p></p>
        
        <button class="w-full">X</button>
      </div>
              <p>data video</p>
  </div>  
  </main>

  


</template>

<script>
console.log("eduardo est gentil")
</script>
