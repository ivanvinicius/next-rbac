'use client'

import { Computer, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          {resolvedTheme === 'light' && <Sun className="size-4" />}
          {resolvedTheme === 'dark' && <Moon className="size-4" />}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <div className="flex items-center gap-1">
            <Sun className="size-4" /> Light
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <div className="flex items-center gap-1">
            <Moon className="size-4" /> Dark
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <div className="flex items-center gap-1">
            <Computer className="size-4" /> System
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
