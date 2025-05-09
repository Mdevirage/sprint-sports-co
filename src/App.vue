<template>
  <header>
        <div class="header-content">
          <h1 class="title">Sprint Sports Co.</h1>
          <nav class="menu">
            <ul>
              <li><router-link to="/">HOME</router-link></li>
              <li><router-link to="/about">ABOUT</router-link></li>
              <li><router-link to="/store">STORE</router-link></li>
              <li><router-link to="/contact">CONTACT</router-link></li>
              <li>
                <img :src="userIcon" alt="User Icon" height="20" width="20" />
              </li>
            </ul>
          </nav>
        </div>
      </header>
  <router-view />
</template>

<script setup>
import userIcon from '@/assets/img/UserIcon.png'
</script>

<script>
</script>

<style>
@import '@/assets/headerStyle.css';
</style>
