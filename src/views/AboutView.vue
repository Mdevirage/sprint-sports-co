<template>
  <section class="about-page">
    <h2>ТЕСТ</h2>
    <p>Немного тест о спорте.</p>

    <form @submit.prevent="submit">
      <!-- 1. Matching -->
      <div class="question">
        <h3>1. Сопоставьте спортсмена с его видом спорта</h3>
        <ul>
          <li v-for="(item, idx) in matching1" :key="idx">
            <span>{{ item.left }}</span>
            <select v-model="item.answer" :disabled="submitted">
              <option disabled value="">-- выбери --</option>
              <option v-for="sport in sports" :key="sport" :value="sport">{{ sport }}</option>
            </select>
          </li>
        </ul>
        <p v-if="submitted && matching1Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !matching1Valid" class="error">Нужно сопоставить все элементы правильно.</p>
      </div>

      <!-- 2. Matching -->
      <div class="question">
        <h3>2. Сопоставьте турнир и его страну-организатора</h3>
        <ul>
          <li v-for="(item, idx) in matching2" :key="idx">
            <span>{{ item.left }}</span>
            <select v-model="item.answer" :disabled="submitted">
              <option disabled value="">-- выбери --</option>
              <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
            </select>
          </li>
        </ul>
        <p v-if="submitted && matching2Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !matching2Valid" class="error">Проверь соответствия.</p>
      </div>

      <!-- 3. Order с перемешиванием -->
      <div class="question">
        <h3>3. Расположите этапы марафона в правильном порядке</h3>
        <ul class="order-list">
          <li v-for="(item, idx) in orderItems1" :key="item.id">
            <span>{{ item.label }}</span>
            <select v-model.number="orderInput1[idx]" :disabled="submitted">
              <option disabled value="0">— № —</option>
              <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
            </select>
          </li>
        </ul>
        <p v-if="submitted && order1Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !order1Valid" class="error">Неверный порядок.</p>
      </div>

      <!-- 4. Order с перемешиванием -->
      <div class="question">
        <h3>4. Упорядочите величины по возрастанию дистанции</h3>
        <ul class="order-list">
          <li v-for="(item, idx) in orderItems2" :key="item.id">
            <span>{{ item.label }}</span>
            <select v-model.number="orderInput2[idx]" :disabled="submitted">
              <option disabled value="0">— № —</option>
              <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
            </select>
          </li>
        </ul>
        <p v-if="submitted && order2Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !order2Valid" class="error">Порядок неверен.</p>
      </div>

      <!-- 5. Fill blank -->
      <div class="question">
        <h3>5. Самое большое количество голов на чемпионатах мира по футболу забил ___.</h3>
        <input v-model="fill1" :disabled="submitted" placeholder="Имя игрока" />
        <p v-if="submitted && fill1Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !fill1Valid" class="error">Неверно — подумай о немецких бомбардирах.</p>
      </div>

      <!-- 6. Fill blank -->
      <div class="question">
        <h3>6. Первые современные Олимпийские игры прошли в городе ___ в 1896 г.</h3>
        <input v-model="fill2" :disabled="submitted" placeholder="Город" />
        <p v-if="submitted && fill2Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !fill2Valid" class="error">Подсказка: столица Греции.</p>
      </div>

      <!-- 7. Fill blank -->
      <div class="question">
        <h3>7. Матч за Супербоул разыгрывается в лиге ___.</h3>
        <input v-model="fill3" :disabled="submitted" placeholder="Лига" />
        <p v-if="submitted && fill3Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !fill3Valid" class="error">Это главная профессиональная лига американского футбола.</p>
      </div>

      <!-- 8. Multiple choice -->
      <div class="question">
        <h3>8. Выбери все страны, принимавшие зимние Олимпиады более одного раза</h3>
        <div v-for="item in multi1" :key="item.name">
          <label>
            <input type="checkbox" v-model="item.checked" :disabled="submitted" /> {{ item.name }}
          </label>
        </div>
        <p v-if="submitted && multi1Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !multi1Valid" class="error">Проверь выбор.</p>
      </div>

      <!-- 9. Multiple choice -->
      <div class="question">
        <h3>9. Укажите все футбольные клубы, выигрывавшие ЛЧ UEFA ≥5 раз</h3>
        <div v-for="item in multi2" :key="item.name">
          <label>
            <input type="checkbox" v-model="item.checked" :disabled="submitted" /> {{ item.name }}
          </label>
        </div>
        <p v-if="submitted && multi2Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !multi2Valid" class="error">Не все ответы верны.</p>
      </div>

      <!-- 10. Multiple choice -->
      <div class="question">
        <h3>10. Спортсмены, выигравшие NBA MVP >1 раза</h3>
        <div v-for="item in multi3" :key="item.name">
          <label>
            <input type="checkbox" v-model="item.checked" :disabled="submitted" /> {{ item.name }}
          </label>
        </div>
        <p v-if="submitted && multi3Valid" class="success">✓ Верно!</p>
        <p v-else-if="submitted && !multi3Valid" class="error">Проверь галочки.</p>
      </div>

      <!-- Итоги -->
      <div v-if="submitted" class="result">
        Вы ответили правильно на <strong>{{ score }}</strong> из 10 вопросов.
      </div>
      <div v-if="submitted && quizPassed" class="overall-success">
        Поздравляем! Вы прошли тест.
      </div>
      <div class="buttonplace">
        <button type="submit" :disabled="submitted">Проверить</button>
        <button type="button" @click="reset">Сбросить</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

/* Matching */
const matching1 = reactive([
  { left: 'Роджер Федерер', right: 'Теннис', answer: '' },
  { left: 'Майкл Фелпс', right: 'Плавание', answer: '' },
  { left: 'Криштиану Роналду', right: 'Футбол', answer: '' }
])
const sports = ['Футбол', 'Плавание', 'Теннис']
const matching1Valid = computed(() => matching1.every(i => i.answer === i.right))

const matching2 = reactive([
  { left: 'Уимблдон', right: 'Великобритания', answer: '' },
  { left: 'Ролан Гаррос', right: 'Франция', answer: '' },
  { left: 'US Open', right: 'США', answer: '' }
])
const countries = ['США', 'Франция', 'Великобритания']
const matching2Valid = computed(() => matching2.every(i => i.answer === i.right))

/* Order Q3: shuffle steps */
const orderSteps = [
  { id: 1, label: 'Старт' },
  { id: 2, label: 'Полумарафон' },
  { id: 3, label: '35-й км' },
  { id: 4, label: 'Финиш' }
]
const orderItems1 = ref([])
const orderInput1 = ref([0, 0, 0, 0])
const order1Valid = computed(() => orderItems1.value.every((item, idx) => orderInput1.value[idx] === item.id))

/* Order Q4: shuffle distances */
const orderDistances = [
  { id: 1, label: '100 м' },
  { id: 2, label: '10 000 м' },
  { id: 3, label: 'полумарафон' },
  { id: 4, label: 'марафон' }
]
const orderItems2 = ref([])
const orderInput2 = ref([0, 0, 0, 0])
const order2Valid = computed(() => orderItems2.value.every((item, idx) => orderInput2.value[idx] === item.id))

/* Shuffle helper */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

onMounted(() => {
  orderItems1.value = [...orderSteps]
  orderItems2.value = [...orderDistances]
  shuffle(orderItems1.value)
  shuffle(orderItems2.value)
})

/* Fill blanks */
const fill1 = ref('')
const fill1Valid = computed(() => fill1.value.trim().toLowerCase() === 'мирослав клозе')
const fill2 = ref('')
const fill2Valid = computed(() => fill2.value.trim().toLowerCase() === 'афины')
const fill3 = ref('')
const fill3Valid = computed(() => fill3.value.trim().toUpperCase() === 'NFL')

/* Multiple choice */
const multi1 = reactive([
  { name: 'Канада', correct: true, checked: false },
  { name: 'Япония', correct: false, checked: false },
  { name: 'США', correct: true, checked: false },
  { name: 'Италия', correct: false, checked: false },
  { name: 'Франция', correct: true, checked: false }
])
const multi1Valid = computed(() => multi1.every(i => i.checked === i.correct))
const multi2 = reactive([
  { name: 'Реал Мадрид', correct: true, checked: false },
  { name: 'Милан', correct: true, checked: false },
  { name: 'Бавария', correct: false, checked: false },
  { name: 'Ливерпуль', correct: true, checked: false },
  { name: 'Челси', correct: false, checked: false }
])
const multi2Valid = computed(() => multi2.every(i => i.checked === i.correct))
const multi3 = reactive([
  { name: 'Леброн Джеймс', correct: true, checked: false },
  { name: 'Кобе Брайант', correct: false, checked: false },
  { name: 'Майкл Джордан', correct: true, checked: false },
  { name: 'Никола Йокич', correct: true, checked: false },
  { name: 'Дирк Новицки', correct: false, checked: false }
])
const multi3Valid = computed(() => multi3.every(i => i.checked === i.correct))

/* Submission & scoring */
const submitted = ref(false)
const quizPassed = computed(() =>
  matching1Valid.value && matching2Valid.value && order1Valid.value && order2Valid.value &&
  fill1Valid.value && fill2Valid.value && fill3Valid.value &&
  multi1Valid.value && multi2Valid.value && multi3Valid.value
)
const score = computed(() => [
  matching1Valid.value, matching2Valid.value,
  order1Valid.value, order2Valid.value,
  fill1Valid.value, fill2Valid.value, fill3Valid.value,
  multi1Valid.value, multi2Valid.value, multi3Valid.value
].filter(v => v).length)

function submit() {
  submitted.value = true
}

function reset() {
  submitted.value = false
  matching1.forEach(i => (i.answer = ''))
  matching2.forEach(i => (i.answer = ''))
  orderInput1.value = [0, 0, 0, 0]
  orderInput2.value = [0, 0, 0, 0]
  fill1.value = ''
  fill2.value = ''
  fill3.value = ''
  multi1.forEach(i => (i.checked = false))
  multi2.forEach(i => (i.checked = false))
  multi3.forEach(i => (i.checked = false))
  orderItems1.value = [...orderSteps]
  orderItems2.value = [...orderDistances]
  shuffle(orderItems1.value)
  shuffle(orderItems2.value)
}
</script>

<style>
@import '@/assets/styles4.css';
</style>
