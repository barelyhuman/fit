import {test} from 'uvu'
import * as assert from 'uvu/assert'
import fetch from 'node-fetch'

import {create} from '../src/index.js'

test('Basic GET', async () => {
	const id = 1
	const fetchers = create('http://jsonplaceholder.typicode.com/', fetch)
	const response = await fetchers(`posts/${id}`).get()
	assert.is(response.id, 1)
})

test('Basic POST', async () => {
	const fetchers = create('http://jsonplaceholder.typicode.com/', fetch)
	const response = await fetchers(`posts`).post({
		userId: 1,
		title: 'Hello',
		body: 'New content',
	})
	assert.ok(response.id)
})

test('Basic PUT', async () => {
	const fetchers = create('http://jsonplaceholder.typicode.com/', fetch)
	const response = await fetchers(`posts/1`).put({
		title: 'Hello',
	})
	assert.ok(response.id)
})

test('Basic PATCH', async () => {
	const fetchers = create('http://jsonplaceholder.typicode.com/', fetch)
	const response = await fetchers(`posts/1`).patch({
		title: 'Hello',
	})
	assert.ok(response.id)
})

test('Basic DELETE', async () => {
	const fetchers = create('http://jsonplaceholder.typicode.com/', fetch)
	const response = await fetchers(`posts/1`).delete()
	assert.ok(response)
})

test.run()
