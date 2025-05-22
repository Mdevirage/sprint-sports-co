<template>
  <div class="contact-page">
    <div class="wrapper">
      <!-- ===== SECTION ===== -->
      <main>
        <section class="contact">
          <h2>CONTACT</h2>
          <div class="dots">●●●</div>

          <form id="contactForm" novalidate @submit.prevent="submitForm">

            <!-- Name -->
            <input
              ref="nameRef"
              v-model="form.name"
              type="text"
              placeholder="Name"
              :class="{ invalid: v$.name.$error }"
              @input="onNameInput"     
              @blur="touch('name')"
              v-tippy
            />

             <!-- Phone -->
            <input
              ref="phoneRef"
              v-model="form.phone"
              maxlength="18"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              v-imask="'+{7} (000) 000-00-00'"  
              :class="{ invalid: v$.phone.$error }"
              @blur="touch('phone')"
              v-tippy
            />


            <!-- Email -->
            <input
              ref="emailRef"
              v-model="form.email"
              type="email"
              placeholder="Email address"
              :class="{ invalid: v$.email.$error }"
              @input="onEmailInput"  
              @blur="touch('email')"
              v-tippy
            />

            <!-- Message -->
            <textarea
              ref="messageRef"
              v-model="form.message"
              placeholder="Message"
              :class="{ invalid: v$.message.$error }"
              @input="onMessageInput" 
              @blur="touch('message')"
              v-tippy
            ></textarea>

            <button type="submit" :disabled="submitting">
              {{ submitting ? 'SENDING…' : 'CONTACT US' }}
            </button>
          </form>
        </section>
      </main>

      <!-- ===== FOOTER ===== -->
      <footer>
        <div class="page-footer">
          <div class="footer-left">
            <h3>Sprint Sports Co.</h3>
            <p>Copyright © 2025 All rights reserved</p>
          </div>

          <div class="footer-right">
            <nav class="footer-menu">
              <router-link to="/">HOME</router-link>
              <router-link to="/about">ABOUT</router-link>
              <router-link to="/store">STORE</router-link>
              <router-link to="/promo">PROMO</router-link>
              <router-link to="/contact">CONTACT</router-link>
            </nav>

            <!-- Subscribe -->
            <div class="subscribe">
              <div class="subscribe-icon">
                <img :src="addressIcon" alt="Address Icon" />
              </div>

              <input
                ref="subEmailRef"
                v-model="form.subEmail"
                type="email"
                placeholder="Email Address"
                :class="{ invalid: v$.subEmail.$error }"
                @blur="touch('subEmail')"
                @input="onSubEmailInput"
                v-tippy
              />
              <button
                type="button"
                id="subBtn"
                @click.prevent="submitSubscribe"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import addressIcon  from '@/assets/img/Adress.png'
import useContactForm from '@/composables/useContactForm.js'

const {
  form,
  v$,
  submitting,
  /* refs */
  nameRef,
  phoneRef,
  emailRef,
  messageRef,
  subEmailRef,
  /* methods */
  onNameInput,
  onSubEmailInput,
  onEmailInput,
  onMessageInput,
  touch,
  submitForm,
  submitSubscribe
} = useContactForm()
</script>

<style>
@import '@/assets/styles2.css';
@import '@/assets/validation-theme.css';

.invalid {
  border: 1px solid #f68720;
}

/* остальные ваши стили */
</style>
