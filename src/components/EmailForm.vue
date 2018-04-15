<template>
  <div class="email-form">
    <div class="input-group mb-3" v-bind:class="{ 'form-group--error': $v.recipient.$error }">
      <div class="input-group-prepend">
        <span class="input-group-text" id="recipient-addon">
          To
        </span>
      </div>

      <input type="text" class="form-control"
        v-model.trim="recipient"
        @input="$v.recipient.$touch()"
        aria-label="recipient email address"
        aria-describedby="recipient-addon">
    </div>

    <div v-if="$v.recipient.$error && $v.recipient.$dirty"
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
        aria-label="email body"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'EmailForm',
  data () {
    return {
      recipient: '',
      sender: '',
      body: ''
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
</style>
