import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import OptionsComponent from './OptionsComponent.vue';

new Vue({
  render: (h) => h(OptionsComponent),
}).$mount('#optionsRoot');
