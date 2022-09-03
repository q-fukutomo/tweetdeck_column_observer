<template>
  <div>
    <div class="container">
      <button id="openOptions" @click="openOptionsPage">設定</button>
    </div>
    <div class="container">
      <button ref="triggerButton" id="trigger" @click="observingSwitch">
        {{ observerStatus }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    observerStatus: '監視開始',
    msg: 'popupログ出力領域',
  }),
  methods: {
    openOptionsPage() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    },
    observingSwitch() {
      const { triggerButton } = this.$refs;
      if (triggerButton.classList.contains('stop')) {
        this.observingStop();
      } else {
        this.observingStart();
      }
    },
    observingStart() {
      const { triggerButton } = this.$refs;

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { msg: 'start' }, (res) => {
          this.msg = JSON.stringify(res);
          if (typeof res === 'undefined' || typeof res.status === 'undefined') {
            console.log('ERROR: レスポンスに異常があります');
            return;
          }

          console.log(`${res.status}: ${res.msg}`);
          if (res.status === 'OK') {
            this.observerStatus = '監視停止';
            triggerButton.classList.add('stop');
          }
        });
      });
    },
    observingStop() {
      const { triggerButton } = this.$refs;
      if (triggerButton.classList.contains('stop')) {
        return;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { msg: 'start' }, (res) => {
          if (typeof res === 'undefined' || typeof res.status === 'undefined') {
            console.log('ERROR: レスポンスに異常があります');
            return;
          }

          console.log(`${res.status}: ${res.msg}`);
          if (res.status === 'OK') {
            this.observerStatus = '監視開始';
            triggerButton.classList.remove('stop');
          }
        });
      });
    },
  },
  created() {
    // ポップアップを開いた時の監視状態を取得
    // →文言や色などの変更
  },
};
</script>

<style scoped>
.container {
  width: 160px;
}
.container button {
  display: block;
  height: 30px;
  width: 100px;
  border-radius: 3px;
  outline: none;
  padding: 2px;
  margin: 2px auto;
  text-align: left;
  background-size: 1em;
  background-repeat: no-repeat;
  background-position: 0.8em 0.5em;
  padding-left: 2.3em;
}
#trigger {
  color: #ffffff;
  background-color: #62c633;
  background-image: url(img/eye.png);
}
#trigger.stop {
  background-color: #dc143c;
}

#openOptions {
  background-image: url(img/spanner.png);
}
</style>
