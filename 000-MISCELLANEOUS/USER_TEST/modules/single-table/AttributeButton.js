export const AttributeButton = Vue.component('attribute-button', {
  template: `
    <span>
      <v-btn v-if="!capitalisedValue"
             small
             color="primary light"
             v-on:click="$emit('click')">
        Add {{label}}
      </v-btn>
      <v-btn v-else
             small 
             class="secondary"
             v-on:click="$emit('click')">
        {{capitalisedValue}}
        <v-divider color="white" 
                   class="mx-2"
                   vertical/> 
        <i class="fa fa-edit" title="Edit"></i>
        Edit {{label}}
      </v-btn>
    </span>
  `,
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },
  computed: {
    capitalisedValue() {
      return this.value
        ? this.value.charAt(0).toUpperCase() + this.value.slice(1)
        : ''
    },
    label() {
      return this.type === 'eye'
        ? 'eye colour'
        : this.type === 'hair'
          ? 'Hair colour'
          : 'handedness'
    }
  },
})