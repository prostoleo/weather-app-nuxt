<template>
  <header class="py-3">
    <BaseContainer class="flex justify-between items-center mx-auto">
      <!-- <div class="container w-11/12 flex justify-between items-center mx-auto max-w-900px"> -->
      <div class="logo">
        <nuxt-link to="/" class="d-inline-block">
          <!-- ${props?.notHome === true ? '-dark' : ''} -->
          <img
            :src="`/icons/logo${notHome === true ? '-dark' : ''}.svg`"
            alt="логотип"
            class="w-20"
          />
        </nuxt-link>
      </div>
      <form
        v-if="!notHome"
        class="inline-flex items-center"
        @submit.prevent="submitForm"
      >
        <!-- :class="
            props?.notHome === true
              ? 'text-black border-gray-900'
              : 'text-white border-grey-100'
          " -->
        <input
          v-model="inputValue"
          type="text"
          class="bg-transparent border-b-1 p-1"
          :class="
            notHome === true
              ? 'text-black border-gray-900'
              : 'text-white border-grey-100'
          "
        />

        <button>
          <!-- ${props?.notHome === true ? '-dark' : ''} -->
          <img
            :src="`/icons/search${notHome === true ? '-dark' : ''}.svg`"
            alt=""
          />
        </button>
      </form>
      <nuxt-link
        v-else
        class="
          inline-block
          rounded-2xl
          bg-white
          text-black
          py-2
          px-3
          leading-none
        "
        to="/"
      >
        На главную
      </nuxt-link>
      <!-- </div>  -->
    </BaseContainer>
  </header>
</template>

<script>
import {
  defineComponent,
  ref,
  useRouter,
  // useStore,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Header',

  props: {
    notHome: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  emits: ['submit-form'],

  setup(props, { emit }) {
    // todo используем router
    const router = useRouter();
    console.log('router: ', router);

    // todo используем store
    // const store = useStore();

    console.log('props: ', props);
    const inputValue = ref('');

    function submitForm() {
      if (!inputValue.value) {
        return;
      }

      emit('submit-form', inputValue.value);
      // store.dispatch('addQuery', inputValue.value);
      inputValue.value = '';
    }

    /* function getBack() {
      router.go(-1);
    } */

    return {
      inputValue,
      submitForm,
    };
  },
});
</script>
