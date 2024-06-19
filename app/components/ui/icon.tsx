import type { IconName } from '@/icon-name'
import type { SVGProps } from 'react'
import { cn } from '#app/utils/misc.tsx'
import href from './icons/sprite.svg'

export { href }
export { IconName }

const sizeClassName = {
  font: 'w-[1em] h-[1em]',
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
} as const

type Size = keyof typeof sizeClassName

const childrenSizeClassName = {
  font: 'gap-1.5',
  xs: 'gap-1.5',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2',
  xl: 'gap-3',
} satisfies Record<Size, string>

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 *
 * Pass `title` prop to the `Icon` component to get `<title>` element rendered
 * in the SVG container, providing this way for accessibility.
 */
export function Icon({
  name,
  size = 'font',
  className,
  title,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
  size?: Size
  title?: string
}) {
  if (children) {
    return (
      <span
        className={`inline-flex items-center ${childrenSizeClassName[size]}`}
      >
        <Icon
          name={name}
          size={size}
          className={className}
          title={title}
          {...props}
        />
        {children}
      </span>
    )
  }
  return (
    <>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: this is handled */}
    <svg
      {...props}
      className={cn(sizeClassName[size], 'inline self-center', className)}
    >
      {title ? <title>{title}</title> : null}
      <use href={`${href}#${name}`} />
    </svg>
  </>
  )
}
