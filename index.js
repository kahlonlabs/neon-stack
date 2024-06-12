import 'dotenv/config'
import * as fs from 'fs'
import { exit } from 'node:process'
import { styleText } from 'node:util'
import closeWithGrace from 'close-with-grace'
import sourceMapSupport from 'source-map-support'

sourceMapSupport.install({
	retrieveSourceMap: function (source) {
		// get source file without the `file://` prefix or `?t=...` suffix
		const match = source.match(/^file:\/\/(.*)\?t=[.\d]+$/)
		if (match) {
			return {
				url: source,
				map: fs.readFileSync(`${match[1]}.map`, 'utf8'),
			}
		}
		return null
	},
})

closeWithGrace(async ({ err }) => {
	if (err) {
		console.error(styleText('red', err.message))
		console.error(styleText('red', String(err.stack)))

		exit(1)
	}
})

if (process.env.MOCKS === 'true') {
	await import('./tests/mocks/index.ts')
}

if (process.env.NODE_ENV === 'production') {
	await import('./server-build/index.js')
} else {
	await import('./server/index.ts')
}
