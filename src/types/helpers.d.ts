type PartialRecursive<T extends Dictionary<string, any>> = {
  [key in keyof T]?:
  T[key] extends Dictionary<string, any>
    ? PartialRecursive<T[key]>
    : T[key] extends any[]
      ? T[key][0] extends Dictionary<string, any>
        ? PartialRecursive<T[key][0]>[]
        : T[key]
      : T[key]
};
