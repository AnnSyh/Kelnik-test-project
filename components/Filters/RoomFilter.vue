<template>
    <div class="filter__list">
      <div
        v-for="roomOption in roomOptions"
        :key="roomOption.value"
        class="filter__room"
        :class="{
          'filter__room_active': modelValue === roomOption.value,
          'filter__room_disabled': !roomOption.available
        }"
        @click="roomOption.available ? updateValue(roomOption.value) : null"
      >
        <span class="filter__room-link">
          {{ roomOption.label }}
        </span>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface RoomOption {
  value: number | null
  label: string
  available: boolean
}

const props = defineProps<{
  modelValue: number | null
  availableRooms: number[] 
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

// Все возможные варианты комнат
const allRoomOptions = [
  { value: 1, label: '1к' },
  { value: 2, label: '2к' },
  { value: 3, label: '3к' },
  { value: 4, label: '4к' },
//   { value: 5, label: '5к+' },
//   { value: null, label: 'Все' }
]

const roomOptions = computed<RoomOption[]>(() => {
  return allRoomOptions.map(option => ({
    ...option,
    available: option.value === null || props.availableRooms.includes(option.value)
  }))
})

const updateValue = (value: number | null) => {
  emit('update:modelValue', value)
}
</script>