export const setError = (field: string, message: string) => ({
  ok: false,
  errors: [{ field, message }]
})
