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

    <button v-bind:disabled="$v.$invalid || isSending"
      type="submit" class="btn btn-primary">
      <span v-if="!isSending">Send</span>
      <span v-if="isSending">Waiting&hellip;</span>
    </button>
  </form>
</template>

<script>
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
      isSending: false
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
    onSubmit: function ($v) {
      this.isSending = true
      const recipients = this.recipientEmails.push(this.recipient)
      $v.recipient.$reset()
      const ccs = this.ccs.push(this.cc)
      $v.cc.$reset()
      const bccs = this.bccs.push(this.bcc)
      $v.bcc.$reset()

      fetch('url', {
        method: 'POST',
        body: {
          from: this.sender,
          to: recipients,
          cc: ccs,
          bccs: bccs,
          subject: this.subject,
          body: this.body
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response
        })
        .then(() => {
          this.isSending = false
        })
        .catch(() => {
          this.isSending = false
          this.message = 'Please try agian later'
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
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.badge {
  margin-right: 5px;
  margin-bottom: 5px;
}
.body-input {
  margin-bottom: 16px;
}
</style>
