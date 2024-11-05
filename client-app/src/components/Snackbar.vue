<template>
  <div v-for="message in messages.values()" :key="message.id">
    <div
      :class="[message.type, 'snackbar']"
      v-on:mouseover="keepMessageVisible(message.id)"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export const SNACKBAR_TYPES = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
}
const MESSAGE_DURATION_MS = 1000 * 7 // 7 seconds
export default {
  name: 'Snackbar',
  data() {
    return {
      messages: new Map(),
    }
  },
  methods: {
    showSnackbar(message, type) {
      const messageId = Math.random() + Date.now()
      this.messages.set(messageId, {
        text: message,
        type,
        id: messageId,
        timeoutId: setTimeout(() => {
          this.messages.delete(messageId)
        }, MESSAGE_DURATION_MS),
      })
    },
    keepMessageVisible(messageId) {
      const message = this.messages.get(messageId)
      clearTimeout(message.timeoutId)
      message.timeoutId = setTimeout(() => {
        this.messages.delete(message.id)
      }, MESSAGE_DURATION_MS)
    },
  },
}
</script>

<style scoped>
.snackbar {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 5px solid;

  &.error {
    background: red;
    border-color: #fff;
  }
  &.info {
    background: blue;
    border-color: #fff;
  }
  &.success {
    background: green;
    border-color: #fff;
  }
}
</style>
