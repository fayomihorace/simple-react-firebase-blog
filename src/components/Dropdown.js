import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

export default function Dropdown({ template, items }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium hover:bg-opacity-30">
          {template}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {
              items.map(item =>
                <React.Fragment key={item.id}>
                  {item.component}
                  <br />
                </React.Fragment>
              )
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
