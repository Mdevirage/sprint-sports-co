<template>
  <div class="store-page">
    <!-- Main Content -->
    <main>
      <table>
        <tbody>
          <!-- 1 строка -->
          <tr>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td rowspan="2"><div class="inner-border">Объединены</div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
          </tr>
          <!-- 2 строка -->
          <tr>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
          </tr>
          <!-- 3 строка -->
          <tr>
            <td rowspan="2" colspan="2"><div class="inner-border">Объединены</div></td>
            <td rowspan="2"><div class="inner-border"></div></td>
            <td rowspan="2"><div class="inner-border"></div></td>
            <td rowspan="2"><div class="inner-border"></div></td>
          </tr>
          <!-- 4 строка -->
          <tr></tr>
          <!-- 5 строка -->
          <tr>
            <td rowspan="2"><div class="inner-border">Объединены</div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
          </tr>
          <!-- 6 строка -->
          <tr>
            <td rowspan="2"><div class="inner-border">Объединены</div></td>
            <td><div class="inner-border"></div></td>
            <td rowspan="3"><div class="inner-border">Объединены</div></td>
            <td><div class="inner-border"></div></td>
          </tr>
          <!-- 7 строка -->
          <tr>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
          </tr>
          <!-- 8 строка -->
          <tr>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
            <td><div class="inner-border"></div></td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script setup>
</script>

<script>
  export default {
    name: 'StoreView'
    }
</script>

<style>
  @import '@/assets/styles3.css';
</style>
