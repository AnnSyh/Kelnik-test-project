<template>
    <Slider
    v-model="internalValue"
    :min="min"
    :max="max"
    :step="step"
    :merge="merge"
    :format="formatOptions"
    :tooltips="tooltips"
    :connect="connect"
    :range="rangeOptions"
    :class="sliderClasses"
    @update="handleUpdate"
    />
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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  min: 0,
  max: 200,
  step: 1,
  merge: 10,
  default: () => [3, 100],
  tooltips: true,
  connect: true,
  showValues: true
})

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
  'change': [value: [number, number]]
}>()

const internalValue = ref<[number, number]>(props.modelValue || props.default)

const formatOptions = computed(() => ({
  decimals: 0,
  suffix: ' м²'
}))

const rangeOptions = computed(() => ({
  min: props.min,
  max: props.max
}))

const sliderClasses = computed(() => [
  'area-slider__element'
])

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
