<template>
  <form class="email-form" @submit="onSubmit($v)">
    <div class="badge-container">
      <div v-for="(email, index) in recipientEmails" :key='index'
        class="badge badge-info">
        {{email}}
      </div>
    </div>

    <div id="recipient-input" class="input-group mb-3"
      v-bind:class="{ 'form-group--error': $v.recipient.$error }">
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
        aria-describedby="sender-addon"
        disabled>
    </div>

    <div class="input-group mb-3" v-bind:class="{ 'form-group--error': $v.subject.$error }">
      <div class="input-group-prepend">
        <span class="input-group-text" id="subject-addon">
          Subject
        </span>
      </div>

      <input type="text" class="form-control"
        v-model.trim="subject"
        @input="$v.subject.$touch()"
        aria-label="subject email address"
        aria-describedby="subject-addon">
    </div>

    <div v-if="$v.subject.$error && $v.subject.$dirty"
      class="alert alert-danger" role="alert">
      <span v-if="!$v.subject.maxLength">Please enter no more than 78 characters</span>
    </div>

    <div v-if="$v.sender.$dirty"
      class="alert alert-danger" role="alert">
      <span v-if="!$v.sender.required">Please enter sender's email address</span>
      <span v-if="!$v.sender.email">Please enter a valid email address</span>
    </div>

    <div v-bind:class="{ 'form-group--error': $v.body.$error }"
      class="input-group body-input" >
      <div class="input-group-prepend">
        <span class="input-group-text">Body</span>
      </div>
      <textarea class="form-control" rows="8"
        v-model.trim="body"
        @input="$v.body.$touch()"
        aria-label="email body">
      </textarea>
    </div>

    <button disabled="$v.$invalid"
      type="submit" class="btn btn-primary">
      Send
    </button>
  </form>
</template>

<script>
import { email, required, maxLength } from 'vuelidate/lib/validators'

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default {
  name: 'EmailForm',
  data () {
    return {
      recipient: '',
      isRecipientTouched: false,
      recipientEmails: [],
      sender: 'zacfirst@gmail.com',
      isSenderTouched: false,
      senderEmails: [],
      cc: '',
      ccs: [],
      bcc: '',
      bccs: [],
      subject: '',
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
    },
    onSubmit: function ($v) {
      const recipients = this.recipientEmails.push(this.recipient)
      const senders = this.senderEmails.push(this.sender)
      const ccs = this.ccs.push(this.cc)
      const bccs = this.bccs.push(this.bcc)
      console.log('form invalid: ', $v.$invalid)
      console.log({
        from: recipients,
        to: senders,
        cc: ccs,
        bccs: bccs,
        subject: this.subject,
        body: this.body
      })
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
    cc: {
      email
    },
    bcc: {
      email
    },
    subject: {
      maxLength: maxLength(78)
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
.form-group--error input, .form-group--error .input-group-text {
  border-color:#f5c6cb;
}
.badge-container {
  display: flex;
  margin-bottom: 16px;
}
.badge {
  margin-right: 5px;
}
.body-input {
  margin-bottom: 32px;
}
</style>
