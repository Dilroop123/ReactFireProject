"use client";
import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';

interface Props {
    climateData: any;
    selectedRiskYear: any
}
export default function DataTable({ climateData, selectedRiskYear }: Props) {
    const [riskTableData, setRiskTableData]: any = useState();
    const [columnDefs] = useState([
        { field: 'AssetName', sortable: true, filter: 'agTextColumnFilter', },
        { field: 'Lat', sortable: true, filter: 'agTextColumnFilter', },
        { field: 'Long', sortable: true, filter: 'agTextColumnFilter', },
        { field: 'BusinessCategory', sortable: true, filter: 'agTextColumnFilter', },
        { field: 'RiskFactors', sortable: true, filter: 'agTextColumnFilter', },
        { field: 'RiskRating', sortable: true, filter: 'agTextColumnFilter', },
        { field: 'Year', sortable: true, filter: 'agTextColumnFilter', }
    ]);

    console.log(climateData);

    useEffect(() => {
        const markers = climateData?.filter((riskData: any) => {
            return riskData.Year === Number(selectedRiskYear);
        }).map((riskData: any, index: any) => {
            return {
                AssetName: riskData.AssetName,
                Lat: Number(riskData.Lat),
                Long: Number(riskData.Long),
                BusinessCategory: riskData.BusinessCategory,
                RiskFactors: riskData.RiskFactors,
                RiskRating: riskData.RiskRating,
                Year: riskData.Year,
                key: index,
            }
        });
        console.log('aa');
        console.log(markers);
        setRiskTableData(markers);
    }, [selectedRiskYear, climateData]);

    return (
        <AgGridReact
            rowData={riskTableData}
            columnDefs={columnDefs}>
        </AgGridReact>
    );
}