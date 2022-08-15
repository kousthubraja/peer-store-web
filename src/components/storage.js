import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYxNWVBNjI1QWREMGQ5NTNBMDlBM2ZBNDhBNTYwN0ZmQ0VjOEMwZjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA1NTU5ODQ4MDksIm5hbWUiOiJwZWVyLXN0b3JlIn0.OKSqKjBUSYnz-YvM5gE0SbFaOMUzRWc-lGgZAEL6KGw'
//   return process.env.WEB3STORAGE_TOKEN
}

export function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}