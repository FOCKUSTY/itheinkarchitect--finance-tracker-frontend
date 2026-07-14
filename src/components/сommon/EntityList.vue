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
  itemLabel: string;
}>();

const router = useRouter();
const filterCategory = ref("");

const filteredList = computed(() => {
  if (!filterCategory.value) {
    return props.store.list;
  }

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
      <h2 class="text-2xl font-bold text-(--fg-default)">
        {{ title }}
      </h2>
      <button
        @click="goToCreate"
        class="bg-(--btn-primary) text-(--bg-default) cursor-pointer py-2 px-4 rounded font-medium transition-opacity hover:opacity-85"
      >
        + Добавить
      </button>
    </div>

    <div class="mb-4">
      <input
        v-model="filterCategory"
        placeholder="Фильтр по категории"
        class="border border-(--fg-mini-text-30) bg-(--bg-smooth) text-(--fg-default) w-full max-w-sm py-2 px-3 rounded outline-none transition-colors focus:border-(--fg-mini-text)"
      />
    </div>

    <div v-if="store.loading" class="text-mini">Загрузка...</div>
    <div v-else-if="store.error" class="text-(--btn-danger)">
      {{ store.error }}
    </div>

    <div v-else class="overflow-x-auto">
      <table
        class="bg-(--fg-smooth) border border-(--fg-mini-text-30) w-full border-collapse"
      >
        <thead>
          <tr
            class="bg-(--bg-smooth-light) [&>th]:py-2 [&>th]:px-4 [&>th]:text-left [&>th]:border-b [&>th]:bg-(--fg-mini-text-30) [&>th]:text-(--fg-default)"
          >
            <th>ID</th>
            <th>Сумма</th>
            <th>Категория</th>
            <th>Описание</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredList"
            :key="item.id"
            class="bg-(--bg-component) hover:bg-opacity-20 transition-colors [&>td]:py-2 [&>td]:px-4 [&>td]:border-b [&>td]:bg-(--fg-mini-text-30) [&>td]:text-(--fg-text)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item[dateKey] }}</td>
            <td>
              <button
                @click="goToEdit(item.id)"
                class="mr-2 cursor-pointer transition-opacity hover:opacity-80"
                style="color: var(--fg-default)"
              >
                ✏️
              </button>
              <button
                @click="handleDelete(item.id)"
                class="cursor-pointer transition-opacity hover:opacity-80"
                style="color: var(--btn-danger)"
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
