// src/composables/useContactForm.js
import { reactive, ref, watch }   from 'vue'
import { useVuelidate }           from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

export default function useContactForm () {
  /* ────────── form state ────────── */
  const form = reactive({
    name:     '',
    phone:    '',
    email:    '',
    message:  '',
    subEmail: ''
  })

  /* ────────── validators ────────── */
  const asciiMessage = helpers.withMessage(
    'Use English letters, digits and basic punctuation only',
    value => !value || /^[A-Za-z0-9\s.,!?'"():; -]+$/.test(value)
  )
   /* ────────── validators ────────── */
  const latinOnly = helpers.withMessage(
  'Use English letters only',
  value => !value || /^[A-Za-z\s'-]+$/.test(value)   // true, если пусто или ок
  );

  const asciiEmail = helpers.withMessage(
    'Use Latin letters, digits and @ . _ % + - only',
    value => !value || /^[A-Za-z0-9@._%+-]+$/.test(value)
  )
 
  
  const russianPhone = helpers.withMessage(
  'Enter the Russian number in the format +7 (XXX) XXX-XX-XX',
  value => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)
  )

  const rules = {
    name: {
    required: helpers.withMessage('Please enter your name', required),
    latinOnly                       // ← добавили
  },
    phone:   {
      required: helpers.withMessage('Please enter your phone number', required),
      russianPhone
    },
    email:   {
      required: helpers.withMessage('Please enter your email address', required),
      email:    helpers.withMessage('Invalid email format, user@example.com required', email),
      asciiEmail
    },
    message: { required: helpers.withMessage('Please enter a message', required),
      asciiMessage  },
    subEmail:{ 
      required: helpers.withMessage('Please enter an email to subscribe', required),
      email:    helpers.withMessage('Invalid email format, e.g. user@example.com', email),
      asciiEmail
    }
  }

  const v$ = useVuelidate(rules, form)
  const submitting = ref(false)

  /* ── refs к полям (для тултипов) ── */
  const nameRef     = ref(null)
  const phoneRef    = ref(null)
  const emailRef    = ref(null)
  const messageRef  = ref(null)
  const subEmailRef = ref(null)

  function updateTip (field, elRef) {
    const tip  = elRef.value?._tippy
    if (!tip) return
    const node = v$.value[field]
    if (node.$error) {
      tip.setContent(node.$errors.at(-1).$message)
      tip.show()
    } else {
      tip.hide()
    }
  }

  function touch (field) {
    v$.value[field].$touch()
    updateTip(field, eval(field + 'Ref'))
  }

  [
    ['name',     nameRef],
    ['phone',    phoneRef],
    ['email',    emailRef],
    ['message',  messageRef],
    ['subEmail', subEmailRef]
  ].forEach(([field, elRef]) => {
    watch(() => v$.value[field].$error, () => updateTip(field, elRef))
  })

  function onNameInput (e) {
  const filtered = e.target.value.replace(/[^A-Za-z\s'-]/g, '');
  form.name = filtered;             // сразу «чистим» model
  }
  function onMessageInput (e) {
   const filtered = e.target.value
      .replace(/[^A-Za-z0-9\s.,!?'"():;-]/g, '');
    form.message = filtered
  }
  
  function onEmailInput (e) {
    // оставляем только латинские буквы, цифры и спецсимволы email
    const filtered = e.target.value.replace(/[^A-Za-z0-9@._%+-]/g, '')
    form.email = filtered
  }
  function onSubEmailInput (e) {
    const filtered = e.target.value.replace(/[^A-Za-z0-9@._%+-]/g, '')
    form.subEmail = filtered
  }

  /* ── submit contact ─────────────── */
  async function submitForm () {
    const contactFields = ['name', 'phone', 'email', 'message']
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
      Object.keys(form).forEach(k => (form[k] = ''))
    } finally {
      submitting.value = false
    }
  }

  /* ── submit subscribe ───────────── */
  async function submitSubscribe () {
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

  /* ── public API ─────────────────── */
  return {
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
  }
}
