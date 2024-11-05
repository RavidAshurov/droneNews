<template>
  <TransitionGroup name="snackbar" tag="div" class="snackbar-container">
    <div
      v-for="message in messages.values()"
      :key="message.id"
      :class="[message.type, 'snackbar-message']"
      v-on:mouseenter="keepMessageVisible(message.id)"
      v-on:mouseleave="setFadeTimeout(message.id)"
    >
      {{ message.text }}
    </div>
  </TransitionGroup>
</template>

<script>
export const SNACKBAR_TYPES = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
}
const MESSAGE_DURATION_MS = 1000 * 4 // 4 seconds
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
    },
    setFadeTimeout(messageId) {
      const message = this.messages.get(messageId)
      message.timeoutId = setTimeout(() => {
        this.messages.delete(message.id)
      }, MESSAGE_DURATION_MS)
    },
  },
}
</script>

<style scoped>
.snackbar-container {
  position: fixed;
  display: grid;
  row-gap: 1rem;
  bottom: 1rem;
  width: 20rem;
  transition: 0.5s;

  .snackbar-enter-active,
  .snackbar-leave-active {
    transition: all 0.4s ease;
  }

  .snackbar-enter-from,
  .snackbar-leave-to {
    opacity: 0;
    transform: translateX(-2rem);
  }

  .snackbar-message {
    padding: 0.5rem 1rem;
    border-radius: 3px;
    border: 5px solid;

    &.error {
      background: #ff7474;
      border-color: #efc0c0;
    }
    &.info {
      background: #75cdf7;
      border-color: #b7e1f5;
    }
    &.success {
      background: #36e774;
      border-color: #beffd5;
    }
  }
}
</style>
