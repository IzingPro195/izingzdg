<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Z-PRO',
  data () {
    return {
      IDLE_TIMEOUT: 7200, // seconds
      idleSecondsCounter: 0
    }
  },
  methods: {
    CheckIdleTime () {
      this.idleSecondsCounter++
      // var oPanel = document.getElementById('SecondsUntilExpire')
      // if (oPanel) { oPanel.innerHTML = (this.IDLE_TIMEOUT - this.idleSecondsCounter) + '' }
      if (this.idleSecondsCounter >= this.IDLE_TIMEOUT) {
        window.location.reload();
        // document.location.href = 'logout.html'
      }
    },
    bindEventListeners() {
      document.onclick = () => {
        this.idleSecondsCounter = 0;
      };
      document.onmousemove = () => {
        this.idleSecondsCounter = 0;
      };
      document.onkeypress = () => {
        this.idleSecondsCounter = 0;
      };
    }
  },
  beforeMount () {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (usuario?.configs?.isDark) {
      this.$q.dark.set(usuario?.configs?.isDark)
    }
    this.bindEventListeners();
    setInterval(this.CheckIdleTime, 1000);
  }

}
</script>
