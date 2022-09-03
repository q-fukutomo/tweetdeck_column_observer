<template>
  <div v-if="!isLoading">
    <table>
      <tr>
        <th>イベント用タグ</th>
        <td>
          <input
            id="eventTag"
            type="text"
            v-model="eventTag"
            :placeholder="sampleEventTag"
          />
        </td>
        <td>
          <button type="button" @click="saveConfig('eventTag', eventTag)">
            保存
          </button>
        </td>
        <td>
          <button type="button" @click="loadConfig('eventTag')">確認</button>
        </td>
      </tr>
      <tr>
        <th>なうぷれ用タグ</th>
        <td>
          <input
            id="nowplayingTag"
            type="text"
            v-model="nowplayingTag"
            :placeholder="sampleNowplayingTag"
          />
        </td>
        <td>
          <button
            type="button"
            @click="saveConfig('nowplayingTag', nowplayingTag)"
          >
            保存
          </button>
        </td>
        <td>
          <button type="button" @click="loadConfig('nowplayingTag')">
            確認
          </button>
        </td>
      </tr>
      <tr>
        <th>文字色</th>
        <td>
          <input
            id="fontColor"
            type="text"
            v-model="fontColor"
            :placeholder="sampleFontColor"
          />
        </td>
        <td>
          <button type="button" @click="saveConfig('fontColor', fontColor)">
            保存
          </button>
        </td>
        <td>
          <button type="button" @click="loadConfig('fontColor')">確認</button>
        </td>
      </tr>
      <tr>
        <th>背景色</th>
        <td>
          <input
            id="backgroundColor"
            type="text"
            v-model="backgroundColor"
            :placeholder="sampleBackgroundColor"
          />
        </td>
        <td>
          <button
            type="button"
            @click="saveConfig('backgroundColor', backgroundColor)"
          >
            保存
          </button>
        </td>
        <td>
          <button type="button" @click="loadConfig('backgroundColor')">
            確認
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <button type="button" @click="resetConfig">全設定のリセット</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    eventTag: '',
    nowplayingTag: '',
    fontColor: '',
    backgroundColor: '',

    sampleEventTag: 'ほげクラ',
    sampleNowplayingTag: 'ほげなうぷれ',
    sampleFontColor: 'FFFFFF',
    sampleBackgroundColor: '00FF00',

    isLoading: true,
  }),
  async mounted() {
    const userConfig = await this.getLocalStorage([
      'eventTag',
      'nowplayingTag',
      'fontColor',
      'backgroundColor',
    ]);
    if (userConfig.eventTag) this.eventTag = userConfig.eventTag;
    if (userConfig.nowplayingTag) this.nowplayingTag = userConfig.nowplayingTag;
    if (userConfig.fontColor) this.fontColor = userConfig.fontColor;
    if (userConfig.backgroundColor)
      this.backgroundColor = userConfig.backgroundColor;

    this.isLoading = false;
  },
  methods: {
    getLocalStorage(key = null) {
      return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve);
      });
    },
    setLocalStorage(key, value) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, resolve);
      });
    },
    removeLocalStorage(key) {
      return new Promise((resolve) => {
        chrome.storage.local.remove(key, resolve);
      });
    },
    async loadConfig(key) {
      const res = await this.getLocalStorage(key);
      alert(`現在の"${key}"は"${res[key]}"です`);
    },
    async saveConfig(key, value) {
      if (this.validate(key, value)) {
        await this.setLocalStorage(key, value);
        alert(`"${key}"に"${value}"を設定しました。`);
      }
    },
    async resetConfig() {
      const configKeys = [
        'eventTag',
        'nowplayingTag',
        'fontColor',
        'backgroundColor',
      ];
      // NOTE: 削除よりデフォルト値を保存の方が良い？
      await this.removeLocalStorage(configKeys);
      this.eventTag = '';
      this.nowplayingTag = '';
      this.fontColor = '';
      this.backgroundColor = '';

      alert('すべての設定をリセットしました');
    },

    validate(key, value) {
      switch (key) {
        // タグ
        case 'eventTag':
        case 'nowplayingTag':
          if (value.match(/^#/)) {
            alert('先頭の#は不要です');
            return false;
          }
          break;

        // 色
        case 'fontColor':
        case 'backgroundColor':
          if (!value.match(/^[0-9a-fA-F]{6}$/)) {
            alert('6桁の16進表記で入力してください');
            return false;
          }
          break;
        default:
          return false;
      }
      return true;
    },
  },
};
</script>

<style scoped></style>
