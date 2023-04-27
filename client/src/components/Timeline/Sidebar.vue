<template>
    <div class="sidebar">
      <ul>
        <li>Menu item 1</li>
        <li>Menu item 2</li>
        <li>Menu item 3</li>
        <li>Menu item 4</li>
      </ul>
    </div>
  </template>
  
  <style>
  .sidebar {
    background-color: #f2f2f2;
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