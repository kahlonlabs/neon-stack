// This module should contain type definitions for modules which do not have
// their own type definitions and are not available on DefinitelyTyped.

import type { ServerBuild } from '@remix-run/node'

declare module 'build/server/index' {
  const _default: ServerBuild
  export default _default
}
