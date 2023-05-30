"use client";
import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import SelectBox from './SelectBox';

import '../styles/globals.css';

const options = {
    title: {
        text: 'Climate Risk Rating',
        style: {
            color: '#0bc9de'
        }
    },
    yAxis: {
        title: {
            text: 'Risk'
        },
    },
    xAxis: {
        title: {
            text: 'Time (Year)'
        },
        categories: ['2030', '2040', '2050', '2060', '2070']
    }
};

interface Props {
    climateData: any;
    buisnessOptionValues: any;
    assetOptionValues: any;
    latOptionsValues: any;
    lngOptionsValues: any;
}

export default function ClimateRiskHighChart({ climateData, buisnessOptionValues, assetOptionValues, latOptionsValues, lngOptionsValues }: Props) {

    const [riskTimeData, setRiskTimeData]: any = useState();
    const [selectedValue, setSelectedValue]: any = useState();

    const [assetSelectBox, setAssetSelectBox]: any = useState();
    const [buisnessSelectBox, setBuisnessSelectBox]: any = useState();
    const [latSelectBox, setLatSelectBox]: any = useState();
    const [lngSelectBox, setLngSelectBox]: any = useState();

    useEffect(() => {

        /* PREPARE DYNAMIC SELECT BOX VALUES*/

        setAssetSelectBox(Array.from(new Set([...assetOptionValues])).map((val) => {
            return { key: val, name: val }
        }));

        setBuisnessSelectBox(Array.from(new Set([...buisnessOptionValues])).map((val) => {
            return { key: val, name: val }
        }));
        setLatSelectBox(Array.from(new Set([...latOptionsValues])).map((val) => {
            return { key: val, name: val }
        }));
        setLngSelectBox(Array.from(new Set([...lngOptionsValues])).map((val) => {
            return { key: val, name: val }
        }));
    }, [climateData]);


    const loadChartData = (key: any, value: any) => {
        setSelectedValue({
            [key]: value
        });
        const groupByCategory = climateData.filter((riskData: any) => {
            return riskData[key] === value;
        }).map((riskData: any, index: any) => {
            return {
                AssetName: riskData.AssetName,
                Lat: Number(riskData.Lat),
                Long: Number(riskData.Long),
                BusinessCategory: riskData.BusinessCategory,
                RiskFactors: riskData.RiskFactors,
                RiskRating: Number(riskData.RiskRating),
                Year: riskData.Year,
                key: index,
            }
        }).reduce((acc: any, obj: any) => {
            const key = obj['Year'];
            const curGroup = acc[key] ?? [];

            return { ...acc, [key]: [...curGroup, obj] };
        }, {});
        const groupedData = Object.keys(groupByCategory)
            .map((key) => {
                return groupByCategory[key]?.
                    reduce((prev: any, curr: any) => prev + curr.RiskRating, 0);
            });
        setRiskTimeData(groupedData)
    }

    return (
        <div className='card'>
            <div style={{ display: 'flex' }}>
                {assetSelectBox?.length > 0 &&
                    <div style={{ flex: 1 }} >
                        <p>Asset Name</p>
                        <SelectBox
                            items={assetSelectBox}
                            setSelectedValue={(val: any) => loadChartData('AssetName', val)}
                            selectedValue={selectedValue?.['AssetName']} />
                    </div>
                }

                {buisnessSelectBox?.length > 0 &&
                    <div style={{ flex: 1 }}>
                        <p>Business Category</p>
                        <SelectBox
                            items={buisnessSelectBox}
                            setSelectedValue={(val: any) => loadChartData('BusinessCategory', val)}
                            selectedValue={selectedValue?.['BusinessCategory']} />
                    </div>
                }

                {latSelectBox?.length > 0 &&
                    <div style={{ flex: 1 }}>
                        <p>Lat</p>
                        <SelectBox
                            items={latSelectBox}
                            setSelectedValue={(val: any) => loadChartData('Lat', val)}
                            selectedValue={selectedValue?.['Lat']} />
                    </div>
                }

                {lngSelectBox?.length > 0 &&
                    <div style={{ flex: 1 }}>
                        <p>Lng</p>
                        <SelectBox
                            items={lngSelectBox}
                            setSelectedValue={(val: any) => loadChartData('Long', val)}
                            selectedValue={selectedValue?.['Long']} />
                    </div>
                }
            </div>

            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    ...options,
                    series: [{
                        name: 'Risk & Time',
                        data: riskTimeData
                    }],
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
                            var text = '<span style="font-weight:bold">Year :</span>' + this.x + '<br>';
                            text += '<span style="font-weight:bold">Risk :</span>' + this.y + '<br>';
                            text += '<span style="font-weight:bold;color:blue">Selected Option :</span>' + JSON.stringify(selectedValue);
                            return text;
                        }
                    },
                }}
            />
        </div>
    );
}