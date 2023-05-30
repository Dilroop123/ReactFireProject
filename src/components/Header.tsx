"use client";
import React from 'react'
import SelectBox from './SelectBox';

interface Props {
    items: any;
    setSelectedValue: any;
    selectedValue: any;
}

export default function Header({ items, setSelectedValue, selectedValue }: Props) {
    return (
        <div style={{ borderRadius: '10px', padding: '10px', border: '1px solid #d3cece', display: 'flex', alignItems: 'center', flex: 1, marginRight: '50px', marginLeft: '50px', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#0bc9de' }}> React Firebase</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SelectBox
                    items={items}
                    setSelectedValue={setSelectedValue}
                    selectedValue={selectedValue} />
                <h3 style={{ marginLeft: '5px' }}>Year</h3>
            </div>
            <div>
                <h2 style={{ color: '#0bc9de' }}>Work Sample for UI/UX Developers</h2>
            </div>
        </div>
    )
};