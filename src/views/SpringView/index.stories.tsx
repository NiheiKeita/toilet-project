
import { Meta, StoryObj } from '@storybook/react'
import SpringPage from '.'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof SpringPage> = {
  component: SpringPage,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Test: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByTestId("test-spring-page")
    expect(true).toBe(true)
  },
}
