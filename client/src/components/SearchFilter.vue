<template>
    <div class="bg-gray-900 p-2 flex flex-col">
        <div @click="menuFilter" class="filter-btn bg-gray-800 inline-block w-20 px-5 py-2 rounded cursor-pointer text-center text-white">Filter</div>
        <div class="filters-container hidden flex-wrap justify-between">
            <div class="filter-box p-3 m-1">
                <h2 class="text-black text-white">DATE</h2>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-2">
                <div class="content">
                    <p class="py-1 cursor-pointer transition-colors">Dernière heure</p>
                    <p class="py-1 cursor-pointer transition-colors">Aujourd'hui</p>
                    <p class="py-1 cursor-pointer transition-colors">Cette semaine</p>
                    <p class="py-1 cursor-pointer transition-colors">Ce mois-ci</p>
                    <p class="py-1 cursor-pointer transition-colors">Cette année</p>
                </div>
            </div>
            <div class="filter-box p-3 m-1">
                <h2 class="text-black text-white">TYPE</h2>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-2">
                <div class="content">
                    <p class="py-1 cursor-pointer transition-colors">Vidéo</p>
                    <p class="py-1 cursor-pointer transition-colors">Chaîne</p>
                </div>
            </div>
            <div class="filter-box p-3 m-1">
                <h2 class="text-black text-white">DURÉE</h2>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-2">
                <div class="content">
                    <p class="py-1 cursor-pointer transition-colors">Moins de 4 minutes</p>
                    <p class="py-1 cursor-pointer transition-colors">Entre 4 et 20 minutes</p>
                    <p class="py-1 cursor-pointer transition-colors">Plus de 20 minutes</p>
                </div>
            </div>
            <div class="filter-box p-3 m-1">
                <h2 class="text-black text-white">TRIER PAR</h2>
                <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 mb-2">
                <div class="content">
                    <p class="py-1 cursor-pointer transition-colors">Date de mise en ligne</p>
                    <p class="py-1 cursor-pointer transition-colors">Nombre de vues</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content p:hover{
        color:white;
    }

    .filter-box{
        width: 200px;
        height: 200px;
    }
</style>


<script setup>
    const menuFilter = ()=>{
        if(document.querySelector('.filters-container').style.display != 'flex'){
            document.querySelector('.filters-container').style.display = 'flex';
        } else{
            document.querySelector('.filters-container').style.display = 'none';
        }
    };

    
</script>