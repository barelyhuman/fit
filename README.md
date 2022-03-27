<h1 align="center">
Fit
</h1>
<p align="center">Minimal functional style wrapper around fetch to make my life a little more easier</p>

## Install

```sh
npm i @barelyhuman/fit
```

## Usage

Fit has a very simple and modular API

```js
import {create, createImmediate} from '@barelyhuman/fit'

// create allows you to well "create" a baseURL based
// instance of the fetcher module
const simpleFetcher = create('https://api.example.com')

// for cases where you don't need the baseURL form of functionality
// you can use `createImmediate` instead
const immediateFetcher = createImmediate(
	'https://api.example.com/posts/1',
	window.fetch,
).get()

// a simple GET request
const response = await simpleFetcher(`posts/${id}`).get()

// a simple POST request
const response = await simpleFetcher(`posts`).post({
	userId: 1,
	title: 'Hello',
	body: 'New content',
})

// you can pass an optional fetch if using it anywhere other than the browser
import nodeFetch from 'node-fetch'

const fetcherNode = create('https://api.example.com', nodeFetch)
```

#### Examples

This is a simple demonstration based on what I use the library for

```js
import {create} from '@barelyhuman/fit'

const fetcher = create('https://api.example.com')

const postsSDK = (id?: string | number) => {
	let url = `/api/posts`

	if (id) {
		url += `/${id}`
	}

	return fetcher(url)
}

const getPostById = id => {
	return postsSDK(id).get()
}

const createPost = payload => {
	return postsSDK().post(payload)
}

const updatePost = (id, payload) => {
	return postsSDK(id).put(payload)
}

const deletePost = id => {
	return postsSDK(id).delete()
}
```
