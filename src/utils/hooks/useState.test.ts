import { describe, it, expect } from 'vitest';
import { useState } from './useState';

describe('useState Hook', () => {
  it('should work with primitive types', () => {
    const [count, setCount] = useState(0);
    expect(count.value).toBe(0);
    
    setCount(5);
    expect(count.value).toBe(5);
    
    setCount(prev => prev + 1);
    expect(count.value).toBe(6);
  });

  it('should work with boolean types', () => {
    const [loading, setLoading] = useState<boolean>(false);
    expect(loading.value).toBe(false);
    
    setLoading(true);
    expect(loading.value).toBe(true);
  });

  it('should work with object types', () => {
    const [user, setUser] = useState({ name: 'John', age: 25 });
    expect(user.value.name).toBe('John');
    expect(user.value.age).toBe(25);
    
    setUser({ name: 'Jane', age: 30 });
    expect(user.value.name).toBe('Jane');
    expect(user.value.age).toBe(30);
    
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
    expect(user.value.age).toBe(31);
  });

  it('should work with function initializer', () => {
    const [expensive, setExpensive] = useState(() => {
      // 模拟昂贵的计算
      return { computed: 'expensive value' };
    });
    
    expect(expensive.value.computed).toBe('expensive value');
  });

  it('should work with array types', () => {
    const [items, setItems] = useState<string[]>([]);
    expect(items.value).toEqual([]);
    
    setItems(['item1', 'item2']);
    expect(items.value).toEqual(['item1', 'item2']);
    
    setItems(prev => [...prev, 'item3']);
    expect(items.value).toEqual(['item1', 'item2', 'item3']);
  });
});
