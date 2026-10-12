import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '@/app/routes'

/** Renders the full app route table at `path`, as a user would land on it. */
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return { user: userEvent.setup(), router, ...render(<RouterProvider router={router} />) }
}

/** Renders a single component inside a router so <Link> works. */
export function renderWithRouter(ui: ReactElement) {
  const router = createMemoryRouter([{ path: '*', element: ui }])
  return { user: userEvent.setup(), ...render(<RouterProvider router={router} />) }
}
