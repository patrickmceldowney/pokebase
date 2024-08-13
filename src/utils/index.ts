export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function getNestedField<T>(obj: T, key: string): T | undefined {
  return key
    .split('.')
    .reduce((acc: any, part: string) => acc && acc[part], obj) as T;
}
