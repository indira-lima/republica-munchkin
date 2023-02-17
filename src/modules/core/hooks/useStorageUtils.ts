import { useCallback } from "react";

interface StorageUtilsProps<T extends { id: number }> {
  getItemIndexById: (list: T[], id: number) => number;
  getNewItemId: (list: T[]) => number;
  removeListItem: (list: T[], id: number) => T[];
  editListItem: (list: T[], id: number, data: T) => T[];
}

/**
 * Methods for operations regarding arrays of objects with ID props
 *
 * The hook call must pass the object as a type parameter (inside <>),
 * this way the hook can access the ID prop of the objects
 *
 * ex.: const { getItemIndexById } = useStorageUtils<Player>();
 *
 * You'd still have to pass the list of players as argument to every
 * function, but the hook will know that items in this list are from
 * the Player type, and thus have the ID prop
 */
function useStorageUtils<T extends { id: number }>(): StorageUtilsProps<T> {
  /**
   * Find an item in the $list by its $id
   */
  const getItemIndexById = useCallback((list: T[], id: number) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
  }, []);

  /*
   * Define o ID do item baseado no ID do último cadastrado,
   * usando a função last() definida no utils/functions
   */
  const getNewItemId = useCallback((list: T[]) => {
    // @ts-ignore my custom function last(), it won't hurt anyone, I promise
    const id = list.length > 0 ? Number(list.last().id) + 1 : 1;
    return id;
  }, []);

  /**
   * Removes an item from $list by its $id
   */
  const removeListItem = useCallback((list: T[], id: number) => {
    const index = getItemIndexById(list, id);
    if (index < 0) return list;

    list.splice(index, 1);
    return [...list];
  }, []);

  /**
   * Edit an item of the $list at position $index with $data
   *
   * This function should be used inside a setState method,
   * in order to prevent using obsolate states
   *
   * ex.: setList((list) => editListItem(list, 0, {...}));
   */
  const editListItem = useCallback((list: T[], id: number, data: T) => {
    const index = getItemIndexById(list, id);
    if (index < 0) return list;

    return [
      ...list.slice(0, index),
      { ...list[index], ...data },
      ...list.slice(index + 1),
    ];
  }, []);

  return {
    getItemIndexById,
    getNewItemId,
    removeListItem,
    editListItem,
  };
}

export default useStorageUtils;
