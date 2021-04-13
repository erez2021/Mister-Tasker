<template>
  <form>
    <v-text-field
      v-model="title"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.title.$touch()"
      @blur="$v.title.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="description"
      :error-messages="descriptionErrors"
      label="E-mail"
      required
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
    ></v-text-field>
    <v-select
      v-model="select"
      :items="importance"
      :error-messages="selectErrors"
      label="Item"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>


    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
 import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],
    validations: {
      title: { required, maxLength: maxLength(20) },
      email: { required, email },
      select: { required },
  
    },
    data() {
        return {
      title: '',
      description: '',
      select: null,
      importance: [
        '1',
        '2',
        '3',
      ],
        }
    },
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.title.required && errors.push('Name is required.')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.description && errors.push('Must be valid e-mail')
        !this.$v.description.required && errors.push('E-mail is required')
        return errors
      },
    },
    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.title = ''
        this.description = ''
        this.select = null
     
      },
    },
  }
</script>

<codepen-resources lang="json">
  {
    "js": [
      "https://cdn.jsdelivr.net/npm/vuelidate/dist/vuelidate.min.js",
      "https://cdn.jsdelivr.net/npm/vuelidate/dist/validators.min.js"
    ]
  }
</codepen-resources>

<codepen-additional>
  const { required, maxLength, emdescriptionail } = validators
  const validationMixin = vuelidate.validationMixin

  Vue.use(vuelidate.default)
</codepen-additional>