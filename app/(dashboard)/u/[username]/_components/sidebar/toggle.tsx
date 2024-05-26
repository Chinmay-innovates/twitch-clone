'use client'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state)
    const label = collapsed ? 'Expand' : 'Collapse'
    return (
        <>
            {collapsed && (
                <div className="w-full hidden lg:flex items-center justify-center">
                    <Hint label={label} side='right' asChild>
                        <Button
                            onClick={onExpand}
                            variant="ghost"
                            className='h-auto p-2'
                        >
                            <ArrowRightFromLine className='size-4' />

                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 hidden lg:flex items-center w-full">
                    <p className='font-semibold text-primary'>Dashboard</p>
                    <Hint label={label} side='right' asChild>
                        <Button
                            onClick={onCollapse}
                            variant="ghost"
                            className='h-auto p-2 ml-auto'
                        >
                            <ArrowLeftFromLine className='size-4' />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}
