<template>
    <div class="sidebar">
      <ul>
        <div class="mb-10">
        <router-link to ="/" class="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600">
        <h3 class="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">Accueil</h3>
      </router-link>
    </div>

        <div class="mb-10">
        <router-link to = "/" class="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600">
        <h3 class="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">Bibliothèque</h3>
      </router-link>
    </div>

        <div class="mb-10">
        <router-link to ="/" class="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600">
        <h3 class="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">Historique</h3>
        </router-link>
      </div>

        <div class="mb-10">
        <router-link to = "/" class="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600">
        <h3 class="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">Abonnements
        </h3>
      </router-link>
      </div>

      </ul>
    </div>
  </template>

  <style>
  .sidebar {
    background-color: #281c1c;
    height: 100%;
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sidebar li {
    padding: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
  </style>