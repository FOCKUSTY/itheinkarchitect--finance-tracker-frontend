<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  title: string;
  store: {
    list: any[];
    loading: boolean;
    error: string | null;
    fetchAll: () => Promise<void>;
    remove: (id: number) => Promise<void>;
  };
  createRoute: string;
  editRoutePrefix: string;
  dateKey: string;
  itemLabel: string; // для confirm
}>();

const router = useRouter();
const filterCategory = ref("");

const filteredList = computed(() => {
  if (!filterCategory.value) return props.store.list;
  return props.store.list.filter((item) =>
    item.category.toLowerCase().includes(filterCategory.value.toLowerCase()),
  );
});

onMounted(() => props.store.fetchAll());

const handleDelete = async (id: number) => {
  if (confirm(`Удалить ${props.itemLabel}?`)) {
    await props.store.remove(id);
  }
};

const goToEdit = (id: number) => {
  router.push(`${props.editRoutePrefix}${id}/edit`);
};

const goToCreate = () => {
  router.push(props.createRoute);
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <button
        @click="goToCreate"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Добавить
      </button>
    </div>

    <div class="mb-4">
      <input
        v-model="filterCategory"
        placeholder="Фильтр по категории"
        class="w-full max-w-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div v-if="store.loading" class="text-gray-500">Загрузка...</div>
    <div v-else-if="store.error" class="text-red-500">{{ store.error }}</div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 border-b text-left">ID</th>
            <th class="px-4 py-2 border-b text-left">Сумма</th>
            <th class="px-4 py-2 border-b text-left">Категория</th>
            <th class="px-4 py-2 border-b text-left">Описание</th>
            <th class="px-4 py-2 border-b text-left">Дата</th>
            <th class="px-4 py-2 border-b text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredList"
            :key="item.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-2 border-b">{{ item.id }}</td>
            <td class="px-4 py-2 border-b">{{ item.amount }}</td>
            <td class="px-4 py-2 border-b">{{ item.category }}</td>
            <td class="px-4 py-2 border-b">{{ item.description }}</td>
            <td class="px-4 py-2 border-b">{{ item[dateKey] }}</td>
            <td class="px-4 py-2 border-b">
              <button
                @click="goToEdit(item.id)"
                class="text-blue-600 hover:text-blue-800 mr-2"
              >
                ✏️
              </button>
              <button
                @click="handleDelete(item.id)"
                class="text-red-600 hover:text-red-800"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
