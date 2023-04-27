<template>
    <div class="sidebar">
      <ul>&nbsp
        <li>Accueil</li>
        <li>Abonnements</li>
        <li>Bibliothèque</li>
        <li>Historique</li>
        <li>Paramètres</li>
      </ul>
    </div>
  </template>
  
  
  <style>
  .sidebar {
    background-color: #ee8888;
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