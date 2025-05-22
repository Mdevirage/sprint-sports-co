<template>
  <section class="about-page">
    <div class="hero">
      <div class="inner-container">

        <!-- PHASE 1: ввод имени -->
        <div v-if="!started" class="start-block">
          <h2>Привет! Как к вам обращаться?</h2>
          <div class="start-controls">
            <input
              v-model="userName"
              type="text"
              placeholder="Ваше имя"
              class="question-input"
            />
            <button @click="startTest" :disabled="!userName.trim()">
              Начать
            </button>
          </div>
        </div>

        <!-- PHASE 2: три вопроса -->
        <form v-else-if="!submitted" @submit.prevent="submit">

          <h2>Небольшой спортивный тест</h2>
          <p>
            Проверьте свои знания: ответьте на три вопроса о спорте.
          </p>
          <!-- Вопрос 1: сопоставление спортсмена и спорта -->
          <div class="question-card">
            <h3 class="question-title">
              1. Сопоставьте спортсмена с его видом спорта
            </h3>
            <ul class="question-list">
              <li v-for="(item, idx) in matching1" :key="idx">
                <span class="question-label">{{ item.left }}</span>
                <select v-model="item.answer" class="question-select">
                  <option disabled value="">-- выбери --</option>
                  <option v-for="sport in sports" :key="sport" :value="sport">
                    {{ sport }}
                  </option>
                </select>
              </li>
            </ul>
          </div>

          <!-- Вопрос 2: сопоставление турнира и страны -->
          <div class="question-card">
            <h3 class="question-title">
              2. Сопоставьте турнир и его страну-организатора
            </h3>
            <ul class="question-list">
              <li v-for="(item, idx) in matching2" :key="idx">
                <span class="question-label">{{ item.left }}</span>
                <select v-model="item.answer" class="question-select">
                  <option disabled value="">-- выбери --</option>
                  <option
                    v-for="c in countries"
                    :key="c"
                    :value="c"
                  >{{ c }}</option>
                </select>
              </li>
            </ul>
          </div>

          <!-- Вопрос 3: порядок этапов -->
          <div class="question-card">
            <h3 class="question-title">
              3. Расположите этапы марафона в правильном порядке
            </h3>
            <ul class="order-list question-list">
              <li v-for="(item, idx) in orderItems1" :key="item.id">
                <span class="question-label">{{ item.label }}</span>
                <select
                  v-model.number="orderInput1[idx]"
                  class="question-select"
                >
                  <option disabled value="0">— № —</option>
                  <option
                    v-for="n in orderItems1.length"
                    :key="n"
                    :value="n"
                  >{{ n }}</option>
                </select>
              </li>
            </ul>
          </div>

          <div class="buttonplace">
            <button type="submit">Проверить</button>
          </div>
        </form>

        <!-- PHASE 3: результат -->
        <div v-else class="result-block">
          <p class="overall-result">{{ resultMessage }}</p>
          <button @click="reset">Пройти ещё раз</button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Фазы
const userName  = ref('')
const started   = ref(false)
const submitted = ref(false)

// Вопрос 1
const matching1 = reactive([
  { left: 'Роджер Федерер',   right: 'Теннис',   answer: '' },
  { left: 'Майкл Фелпс',       right: 'Плавание', answer: '' },
  { left: 'Криштиану Роналду', right: 'Футбол',   answer: '' }
])
const sports         = ['Футбол', 'Плавание', 'Теннис']
const matching1Valid = computed(() =>
  matching1.every(i => i.answer === i.right)
)

// Вопрос 2
const matching2     = reactive([
  { left: 'Уимблдон',    right: 'Великобритания', answer: '' },
  { left: 'Ролан Гаррос',right: 'Франция',        answer: '' },
  { left: 'US Open',     right: 'США',             answer: '' }
])
const countries       = ['США', 'Франция', 'Великобритания']
const matching2Valid  = computed(() =>
  matching2.every(i => i.answer === i.right)
)

// Вопрос 3
const orderSteps   = [
  { id: 1, label: 'Старт' },
  { id: 2, label: 'Полумарафон' },
  { id: 3, label: '35-й км' },
  { id: 4, label: 'Финиш' }
]
const orderItems1  = ref([])
const orderInput1  = ref([0, 0, 0, 0])
const order1Valid  = computed(() =>
  orderItems1.value.every((it, idx) => orderInput1.value[idx] === it.id)
)

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
onMounted(() => {
  orderItems1.value = [...orderSteps]
  shuffle(orderItems1.value)
})

// Подсчёт и сообщение
const score      = computed(() =>
  [matching1Valid.value, matching2Valid.value, order1Valid.value]
    .filter(v => v).length
)
const quizPassed = computed(() => score.value >= 2)
const resultMessage = computed(() =>
  quizPassed.value
    ? `Поздравляем, ${userName.value}! Вы набрали ${score.value} из 3.`
    : `Спасибо, ${userName.value}. Вы набрали ${score.value} из 3 — попробуйте ещё раз.`)

// Методы
function startTest() {
  if (userName.value.trim()) started.value = true
}
function submit() {
  submitted.value = true
}
function reset() {
  userName.value    = ''
  started.value     = false
  submitted.value   = false
  matching1.forEach(i => i.answer = '')
  matching2.forEach(i => i.answer = '')
  orderInput1.value = [0, 0, 0, 0]
  orderItems1.value = [...orderSteps]
  shuffle(orderItems1.value)
}
</script>

<style>
@import '@/assets/styles4.css';
</style>
