"use client";
import React from 'react'
import { Dropdown } from "@nextui-org/react";

interface Props {
    setSelectedValue: any;
    selectedValue: any;
    items: any;
}

export default function SelectBox({ selectedValue, setSelectedValue, items }: Props) {
    return (
        <Dropdown>
            <Dropdown.Button flat> {selectedValue}</Dropdown.Button>
            <Dropdown.Menu aria-label="Dynamic Actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedValue}
                onAction={(selectedYear: any) => setSelectedValue(selectedYear)}
                items={items}>
                {(item: any) => (
                    <Dropdown.Item
                        key={item.key}
                    >
                        {item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
};