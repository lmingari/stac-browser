import { useSignal, useSignalEffect } from "@preact/signals"

/**
 * Shared hook for fetching a list of options from the STAC API.
 *
 * @param {function} queryFn - Async function that returns an array of option strings.
 *                             Receives an AbortSignal; return null to skip the fetch.
 * @returns {{ options, loading, error }}
 */
export function useFetchOptions(queryFn) {
  const options = useSignal([])
  const loading = useSignal(false)
  const error   = useSignal(false)

  useSignalEffect(() => {
    const controller = new AbortController()

    options.value = []
    error.value   = false

    const promise = queryFn(controller.signal)
    if (!promise) return () => controller.abort()

    loading.value = true

    promise
      .then(result => { options.value = result ?? [] })
      .catch(err => {
        if (err.name === "AbortError") return
        console.error(err)
        error.value = true
      })
      .finally(() => { loading.value = false })

    return () => controller.abort()
  })

  return { options, loading, error }
}
