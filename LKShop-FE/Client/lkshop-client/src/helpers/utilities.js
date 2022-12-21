export const spreadSearchQuery = searchQuery => {
  let q = "q="
  if (searchQuery)
    Object.keys(searchQuery).forEach(_key => {
      if (!isEmptyValues(searchQuery[_key])) {
        if (Array.isArray(searchQuery[_key])) {
          // extract array as array object
          const arrayParams = searchQuery[_key]
          let types = getQueryArray(arrayParams, _key)

          q += `&${types}`
        } else q += `&${_key}=${searchQuery[_key]}`
      }

      return _key
    })

  return q
}

export const isEmptyValues = value => {
  /* eslint-disable */
  return (
    value === undefined ||
    value === null ||
    value === NaN ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value?.trim().length === 0)
  )
}
