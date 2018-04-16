<template>
  <div>
    <div class="badge-container">
      <div v-for="(email, index) in emails" :key='index'
        class="badge badge-info">
        {{email}}
      </div>
    </div>

    <div v-bind:id="id+'-input'" class="input-group mb-3"
      v-bind:class="{ 'form-group--error': error }">
      <div class="input-group-prepend">
        <span class="input-group-text" v-bind:id="id+'-addon'">
          {{id}}
        </span>
      </div>

      <input type="text" class="form-control"
        v-model.trim="emailInput"
        @keyup="onEmailChange"
        @blur="isInputTouched=true"
        v-bind:aria-label="id+' email address'"
        v-bind:aria-describedby="id+'-addon'">
    </div>

    <div v-if="error && isInputTouched"
      class="alert alert-danger" role="alert">
      {{error}}
    </div>
  </div>
</template>

<script>
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*;?$/

export default {
  data () {
    return {
      emailInput: '',
      isInputTouched: false,
      emails: [],
      error: ''
    }
  },
  props: {
    id: String,
    required: Boolean
  },
  methods: {
    onEmailChange: function (event) {
      const email = event.target.value
      const isValidEmail = EMAIL_RE.test(email)
      if (!email && this.required) {
        this.error = 'Please enter an email'
        return
      } else {
        this.error = ''
      }

      if (this.isInputTouched && !isValidEmail) {
        this.error = 'Email is not valid'
      }

      if (isValidEmail) {
        this.error = ''
        if (event.target.value.includes(';')) {
          const emailTrimmed = email.replace(/[;,]/g, '')
          this.emails.push(emailTrimmed)
          this.recipient = ''
          this.$emit('updateEmails', this.emails)
        } else {
          this.$emit('updateEmails', this.emails.concat([email]))
        }
      }
    }
  }
}
</script>

<style scoped>
.input-group-text {
  text-transform: capitalize
}
</style>
