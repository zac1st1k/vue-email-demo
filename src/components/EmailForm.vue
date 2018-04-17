<template>
  <form class="email-form" @submit="onSubmit($v)">
    <multiple-email-input
      id="to"
      v-bind:required="true"
      v-on:updateEmails="updateRecipientEmails">
    </multiple-email-input>

    <multiple-email-input
      id="cc"
      v-bind:required="false"
      v-on:updateEmails="updateCcEmails">
    </multiple-email-input>

    <multiple-email-input
      id="bcc"
      v-bind:required="false"
      v-on:updateEmails="updateBccEmails">
    </multiple-email-input>

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

    <div v-if="message"
      class="alert alert-danger submit-message" role="alert">
      {{message}}
    </div>

    <div v-if="isSent"
      class="alert alert-success submit-message" role="alert">
      You email has been sent successfully!
    </div>

    <button v-bind:disabled="!recipientEmails.length || $v.$invalid || isSending"
      type="submit" class="btn btn-primary">
      <span v-if="!isSending">Send</span>
      <span v-if="isSending">Waiting&hellip;</span>
    </button>
  </form>
</template>

<script>
import axios from 'axios'
import { email, required, maxLength } from 'vuelidate/lib/validators'
import MultipleEmailInput from './MultipleEmailInput'

export default {
  name: 'EmailForm',
  components: { MultipleEmailInput },
  data () {
    return {
      sender: 'zacfirst@gmail.com',
      recipientEmails: [],
      ccs: [],
      bccs: [],
      subject: '',
      body: '',
      message: '',
      isSending: false,
      isSent: false
    }
  },
  methods: {
    updateRecipientEmails: function (event) {
      this.recipientEmails = event
    },
    updateCcEmails: function (event) {
      this.ccs = event
    },
    updateBccEmails: function (event) {
      this.bccs = event
    },
    onSubmit: function () {
      // const form = new FormData()
      // form.append('from', 'Mailgun Sandbox <postmaster@sandbox73985d0f8b4044c987da4d3b27a5e0e0.mailgun.org>')
      // form.append('to', 'Zhenzhe Xu <zacfirst@gmail.com>')
      // form.append('subject', 'Hello Zhenzhe Xu')
      // form.append('text', '111Congratulations Zhenzhe Xu, you just sent an email with Mailgun!  You are truly awesome!')

      this.isSending = true
      this.isSent = false
      const request = {
        from: this.sender,
        to: this.recipientEmails,
        cc: this.ccs,
        bccs: this.bccs,
        subject: this.subject,
        body: this.body
      }
      axios.post('http://localhost:8888/send', request)
        .then(() => {
          this.isSending = false
          this.isSent = true
          this.message = ''
        })
        .catch(() => {
          this.isSending = false
          this.message = 'Please try agian later'
        })
    }
  },
  validations: {
    sender: {
      required,
      email
    },
    subject: {
      maxLength: maxLength(78)
    },
    body: {
    }
  }
}
</script>

<style scoped>
.email-form {
  margin: 32px;
}
.body-input {
  margin-bottom: 16px;
}
</style>
