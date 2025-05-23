// main.js / main.ts
import { createApp } from 'vue'
import App            from './App.vue'
import router         from './router'
import { IMaskDirective } from 'vue-imask';

/* ───── Tippy ───── */
import VueTippy from 'vue-tippy'          // ⬅ default-экспорт
//   или:  import { plugin as VueTippy } from 'vue-tippy'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import './assets/validation-theme.css'

const app = createApp(App);
app
  .use(router)
  .use(VueTippy, {
    directive: 'tippy',
    defaultProps: {
      placement: 'left',
      fallbackPlacements: ['bottom-start', 'top-start', 'right-start'],
      popperOptions: {
        modifiers: [
          { name: 'flip', options: { fallbackPlacements: ['bottom-start','top-start'] } },
          { name: 'preventOverflow', options: { padding: 8 } }
        ]
      },
      maxWidth: 250,
      allowHTML: false,
      trigger: 'manual',
      offset: [6, 0],
      animation: 'shift-away'
    }
  });

/* 3. регистрируем директиву маски */
app.directive('imask', IMaskDirective);

/* 4. монтируем */
app.mount('#app');