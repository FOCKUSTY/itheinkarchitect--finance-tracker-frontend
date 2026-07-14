import type { Ref } from "vue";
import { ref } from "vue";

interface EntityCrudConfig<Entity, Create, Update> {
  api: {
    getAll: () => Promise<Entity[]>;
    getByCategory?: (category: string) => Promise<Entity[]>;
    create: (data: Create) => Promise<any>;
    update: (id: number, data: Update) => Promise<Entity>;
    delete: (id: number) => Promise<any>;
  };
}

export const useEntityCrud = <Entity, Create, Update>(
  config: EntityCrudConfig<Entity, Create, Update>,
) => {
  const list = ref<Entity[]>([]) as Ref<Entity[]>;
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      list.value = await config.api.getAll();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Ошибка загрузки";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchByCategory = async (category: string) => {
    if (!config.api.getByCategory) {
      throw new Error("getByCategory не реализован");
    }
    loading.value = true;
    error.value = null;
    try {
      list.value = await config.api.getByCategory(category);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка загрузки по категории";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const create = async (data: Create) => {
    loading.value = true;
    error.value = null;
    try {
      await config.api.create(data);
      await fetchAll();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Ошибка создания";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const update = async (id: number, data: Update) => {
    loading.value = true;
    error.value = null;
    try {
      await config.api.update(id, data);
      await fetchAll();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Ошибка обновления";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const remove = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await config.api.delete(id);
      await fetchAll();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Ошибка удаления";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    list,
    loading,
    error,
    fetchAll,
    fetchByCategory,
    create,
    update,
    remove,
  };
};
