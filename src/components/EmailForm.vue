<template>
  <form class="email-form" >
    <div class="badge-container">
      <div v-for="(email, index) in recipientEmails" :key='index'
        class="badge badge-info">
          {{email}}
      </div>
    </div>

    <div class="input-group mb-3" v-bind:class="{ 'form-group--error': $v.recipient.$error }">
      <div class="input-group-prepend">
        <span class="input-group-text" id="recipient-addon">
          To
        </span>
      </div>

      <input type="text" class="form-control"
        v-model.trim="recipient"
        @keyup="onEmailChange($event, $v)"
        @change="isRecipientTouched=true"
        @input="$v.recipient.$touch()"
        aria-label="recipient email address"
        aria-describedby="recipient-addon">
    </div>

    <div v-if="isRecipientTouched && $v.recipient.$error && $v.recipient.$dirty"
      class="alert alert-danger" role="alert">
      <span v-if="!$v.recipient.required">Please enter recipient's email address</span>
      <span v-if="!$v.recipient.email">Please enter a valid email address</span>
    </div>

    <div class="input-group mb-3" v-bind:class="{ 'form-group--error': $v.sender.$error }">
      <div class="input-group-prepend">
        <span class="input-group-text" id="sender-addon">
          From
        </span>
      </div>

      <input type="text" class="form-control"
        v-model.trim="sender"
        @input="$v.sender.$touch()"
        aria-label="sender email address"
        aria-describedby="sender-addon">
    </div>

    <div v-if="$v.sender.$dirty"
      class="alert alert-danger" role="alert">
      <span v-if="!$v.sender.required">Please enter sender's email address</span>
      <span v-if="!$v.sender.email">Please enter a valid email address</span>
    </div>

    <div class="input-group" v-bind:class="{ 'form-group--error': $v.body.$error }">
      <div class="input-group-prepend">
        <span class="input-group-text">Body</span>
      </div>
      <textarea class="form-control" rows="8"
        v-model.trim="body"
        @input="$v.body.$touch()"
        aria-label="email body">
      </textarea>
    </div>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default {
  name: 'EmailForm',
  data () {
    return {
      recipient: '',
      isRecipientTouched: false,
      recipientEmails: [],
      sender: '',
      isSenderTouched: false,
      senderEmails: [],
      body: ''
    }
  },
  methods: {
    onEmailChange: function (event, $v) {
      const value = event.target.value
      const email = value.substring(0, value.length - 1)
      if (value.includes(',') || value.includes(';')) {
        if (EMAIL_RE.test(email)) {
          this.recipientEmails.push(email)
          this.recipient = ''
          $v.recipient.$reset()
        }
      }
    }
  },
  validations: {
    recipient: {
      required,
      email
    },
    sender: {
      required,
      email
    },
    body: {
      required
    }
  }
}
</script>

<style scoped>
.email-form {
  margin: 32px;
}
.input-group-text {
  width: 62px;
}
.badge-container {
  display: flex;
  margin-bottom: 16px;
}
.badge {
  margin-right: 5px;
}
</style>
