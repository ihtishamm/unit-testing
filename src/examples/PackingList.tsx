import { useSelector, useDispatch } from 'react-redux';

import {
  addItem,
  togglePacked,
  editItem,
  deleteItem,
  unpackAll,
} from '../store/packing-list-slice';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import type { RootState } from '../store/store';

export default function PackingList() {
  const items = useSelector((state: RootState) => state.packingList.items);
  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    dispatch(addItem({ id: nanoid(), name: newItem }));
    setNewItem('');
  };

  const handleSaveEdit = (id: string) => {
    if (!editValue.trim()) return;
    dispatch(editItem({ id, name: editValue }));
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div>
      <h1>Packing List</h1>

      {/* Add Item */}
      <input
        aria-label="New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAdd} disabled={!newItem.trim()}>
        Add New Item
      </button>
      <button onClick={() => dispatch(unpackAll())}>Unpack All</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: item.packed ? 'line-through' : 'none',
                  }}
                >
                  {item.name}
                </span>
                <button onClick={() => dispatch(togglePacked(item.id))}>
                  {item.packed ? 'Unpack' : 'Pack'}
                </button>
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditValue(item.name);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => dispatch(deleteItem(item.id))}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
