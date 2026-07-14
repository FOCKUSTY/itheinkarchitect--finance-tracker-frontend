<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useTransactionsStore } from "@/stores/transactions";
import { useRouter } from "vue-router";

const store = useTransactionsStore();
const router = useRouter();

const filterCategory = ref("");
const filteredList = computed(() => {
  if (!filterCategory.value) {
    return store.list;
  }

  const filtered = store.list.filter((transaction) =>
    transaction.category.toLowerCase().includes(filterCategory.value.toLowerCase()),
  );

  return filtered;
});

onMounted(() => {
  store.fetchAll();
});

const handleDelete = async (id: number) => {
  if (confirm("Удалить транзакцию?")) {
    await store.remove(id);
  }
};

const goToEdit = (id: number) => {
  router.push(`/transactions/${id}/edit`);
};

const goToCreate = () => {
  router.push("/transactions/create");
};
</script>

<template>
  <div>
    <div class="header">
      <h2>Транзакции</h2>
      <button @click="goToCreate">+ Добавить</button>
    </div>
    <div class="filters">
      <input v-model="filterCategory" placeholder="Фильтр по категории" />
    </div>
    <div v-if="store.loading">Загрузка...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Сумма</th>
          <th>Категория</th>
          <th>Описание</th>
          <th>Дата</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.transaction_date }}</td>
          <td>
            <button @click="goToEdit(item.id)">✏️</button>
            <button @click="handleDelete(item.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filters {
  margin: 1rem 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}
.error {
  color: red;
}
</style>
