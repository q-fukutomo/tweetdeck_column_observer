import Vue from 'vue';
import PopupComponent from './PopupComponent.vue';

new Vue({
  render: (h) => h(PopupComponent),
}).$mount('#popupRoot');
