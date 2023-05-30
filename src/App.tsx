"use client";
import React, { useState, useEffect } from 'react'
import { collection, getFirestore } from 'firebase/firestore';
import {
  FirestoreProvider,
  useFirestore,
  useFirebaseApp,
  useFirestoreCollectionData
} from 'reactfire';
import { riskYears } from './constants/constants';
import DataTable from './components/DataTable';
import ClimateRiskHighChart from './components/ClimateRiskHighChart';
import Header from './components/Header';
import TaskManager from './components/TaskManager';

import './styles/globals.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


let buisnessOptionValues: any = [];
let assetOptionValues: any = [];
let latOptionsValues: any = [];
let lngOptionsValues: any = [];


function Init() {

  const [climateData, setClimateData]: any = useState([]);
  const [selectedRiskYear, setSelectedRiskYear]: any = useState();
  const arisksCollection = collection(useFirestore(), 'risksdata');
  const { status, data: riskIndicator } = useFirestoreCollectionData(arisksCollection);

  useEffect(() => {
    setClimateData(riskIndicator);
    setSelectedRiskYear(riskYears[0].key);
    riskIndicator?.map((riskData: any, index: any) => {
      buisnessOptionValues.push(riskData.BusinessCategory);
      assetOptionValues.push(riskData.AssetName);
      latOptionsValues.push(Number(riskData.Lat));
      lngOptionsValues.push(Number(riskData.Long));
    });
  }, [riskIndicator]);

  return (riskIndicator?.length > 0 ?
    <div className='container'>
      <Header
        items={riskYears}
        setSelectedValue={setSelectedRiskYear}
        selectedValue={selectedRiskYear} />

      <div style={{ display: 'flex' }}>
        <div className='card'>
          <ClimateRiskHighChart
            climateData={climateData}
            buisnessOptionValues={buisnessOptionValues}
            assetOptionValues={assetOptionValues}
            latOptionsValues={latOptionsValues}
            lngOptionsValues={lngOptionsValues}
          />
        </div>

        <div className="ag-theme-alpine card">
          <DataTable
            climateData={climateData}
            selectedRiskYear={selectedRiskYear} />
        </div>

      </div>
      <TaskManager />
    </div> : <div>
      Loading the components....
    </div>
  )
}

export default function App() {

  const app = useFirebaseApp();
  const firestoreDatabase = getFirestore(app);

  return (
    <FirestoreProvider sdk={firestoreDatabase}>
      <Init />
    </FirestoreProvider>
  )
};