<template>
  <div class="price-slider">
    <Slider
      v-model="internalValue"
      :min="min"
      :max="max"
      :step="step"
      :merge="merge"
      :format="formatOptions"
      :tooltips="tooltips"
      :range="rangeOptions"
      :class="sliderClasses"
      @update="handleUpdate"
      />
      <!-- :connect="connect" -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Slider from '@vueform/slider'

interface Props {
  modelValue?: [number, number]
  min?: number
  max?: number
  step?: number
  merge?: number
  default?: [number, number]
  tooltips?: boolean
  connect?: boolean
  showValues?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  min: 0,
  max: 20000000,
  step: 1000000,
  merge: 25,
  default: () => [0, 18900000],
  tooltips: true,
  connect: true,
  showValues: true,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
  'change': [value: [number, number]]
}>()

const internalValue = ref<[number, number]>(props.modelValue || props.default)

const formatOptions = computed(() => ({
  decimals: 0,
  thousand: ' ',
  suffix: ' ₽'
}))

const rangeOptions = computed(() => ({
  min: props.min,
  max: props.max
}))

const sliderClasses = computed(() => [
  'vueform-slider',
  {
    'vueform-slider--disabled': props.disabled
  }
])

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const handleUpdate = (values: [number, number]) => {
  emit('update:modelValue', values)
  emit('change', values)
}

// Синхронизация с внешним modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue && (newValue[0] !== internalValue.value[0] || newValue[1] !== internalValue.value[1])) {
    internalValue.value = newValue
  }
})

// Инициализация значения
if (!props.modelValue) {
  emit('update:modelValue', internalValue.value)
}
</script>
