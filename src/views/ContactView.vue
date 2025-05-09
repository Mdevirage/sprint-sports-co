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
              @blur="touch('name')"
              v-tippy
            />

            <!-- Phone -->
            <input
              ref="phoneRef"
              v-model="form.phone"
              type="tel"
              placeholder="Phone"
              inputmode="numeric"
              @input="onPhoneInput"
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
              @blur="touch('email')"
              v-tippy
            />

            <!-- Message -->
            <textarea
              ref="messageRef"
              v-model="form.message"
              placeholder="Message"
              :class="{ invalid: v$.message.$error }"
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
import { reactive, ref, watch }     from 'vue'
import { useVuelidate }             from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import addressIcon                  from '@/assets/img/Adress.png'

/* ────────── form state ────────── */
const form = reactive({
  name:     '',
  phone:    '',
  email:    '',
  message:  '',
  subEmail: ''
})

/* ────────── validators ────────── */
// Телефон: считаем только цифры, 7–15 цифр
const phoneRegex = helpers.withMessage(
  'Enter a valid phone (7–15 digits)',
  value => {
    if (!value) return false
    const digits = value.replace(/\D/g, '')
    return digits.length >= 7 && digits.length <= 15
  }
)

const rules = {
  name:    { required: helpers.withMessage('Name is required', required) },
  phone:   {
    required:   helpers.withMessage('Phone is required', required),
    phoneRegex
  },
  email:   {
    required: helpers.withMessage('Email is required', required),
    email:    helpers.withMessage('Email is invalid', email)
  },
  message: { required: helpers.withMessage('Message is required', required) },
  subEmail:{ 
    required: helpers.withMessage('Email is required', required),
    email:    helpers.withMessage('Email is invalid', email)
  }
}

const v$ = useVuelidate(rules, form)
const submitting = ref(false)

/* ────────── refs to fields ────────── */
const nameRef     = ref(null)
const phoneRef    = ref(null)
const emailRef    = ref(null)
const messageRef  = ref(null)
const subEmailRef = ref(null)

/* ─── onPhoneInput: фильтруем ввод */
function onPhoneInput(e) {
  const raw  = e.target.value
  const plus = raw.startsWith('+') ? '+' : ''
  let digits = raw.replace(/\D/g, '')
  if (digits.length > 15) digits = digits.slice(0, 15)
  form.phone = plus + digits
}

/* helper: показывает или скрывает тултип для поля */
function updateTip(field, elRef) {
  const tip = elRef.value?._tippy
  if (!tip) return
  const node = v$.value[field]
  if (node.$error) {
    // берём последнее сообщение из списка ошибок
    tip.setContent(node.$errors.at(-1).$message)
    tip.show()
  } else {
    tip.hide()
  }
}

/* помечаем поле как touched и запускаем updateTip */
function touch(field) {
  v$.value[field].$touch()
  updateTip(field, eval(field + 'Ref'))
}

/* прячем тултип, когда ошибка уходит */
[
  ['name',     nameRef],
  ['phone',    phoneRef],
  ['email',    emailRef],
  ['message',  messageRef],
  ['subEmail', subEmailRef]
].forEach(([field, elRef]) => {
  watch(() => v$.value[field].$error, () => updateTip(field, elRef))
})

/* ────────── submit contact ────────── */
async function submitForm() {
  // валидируем только поля contact
  const contactFields = ['name','phone','email','message']
  contactFields.forEach(f => v$.value[f].$touch())
  const hasError = contactFields.some(f => v$.value[f].$invalid)
  if (hasError) {
    contactFields.forEach(f => updateTip(f, eval(f + 'Ref')))
    return
  }

  submitting.value = true
  try {
    await new Promise(r => setTimeout(r, 1200))
    alert('Contact form sent!')
    v$.value.$reset()
    Object.keys(form).forEach(k => form[k] = '')
  } finally {
    submitting.value = false
  }
}

/* ────────── submit subscribe ────────── */
async function submitSubscribe() {
  v$.value.subEmail.$touch()
  updateTip('subEmail', subEmailRef)
  if (v$.value.subEmail.$invalid) return

  try {
    await new Promise(r => setTimeout(r, 800))
    alert('Subscribed successfully!')
    form.subEmail = ''
    v$.value.subEmail.$reset()
  } catch (error) {
    console.error('Subscription failed:', error)
  }
}
</script>

<style>
@import '@/assets/styles2.css';
@import '@/assets/validation-theme.css';

.invalid {
  border: 1px solid #f68720;
}

/* остальные ваши стили */
</style>
