import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRoute } from '../models/routeModel';
import { addNewRoute, bulkUpdateRoutes, deleteRoute, fetchRoutes } from '../reducers/routeReducer';
import { RootState } from '../store';

const columns = [

  {
    title: 'URL',
    field: 'url',

  },
  {
    title: 'Target',
    field: 'target',

  },
  {
    title: 'Web Socket?',
    field: 'webSocket',
    type: "boolean"

  },
  {
    title: 'Ignore Base Path?',
    field: 'ignoreBasePath',
    type: "boolean"
  }
]


const RoutesPage: React.FC = () => {
  const { list } = useSelector((state: RootState) => state.route);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const onBulkUpdate = async (changes: any) => {
    const batch = Object.keys(changes).map((key: string) => {
      const data = changes[key].newData
      delete data.tableData;
      return data;
    });
    dispatch(bulkUpdateRoutes(Object.values(batch) as Array<IRoute>));
  }

  const onRowDelete = async (data: any) => {
    console.log(data)
    dispatch(deleteRoute(data.id));
  }

  const onRowAdd = async (data: IRoute) => {
    dispatch(addNewRoute(data));
  }

  console.log(list)
  return (
    <>
      {list &&
        <MaterialTable
          title="Routes"
          columns={columns}
          data={list.map(r => ({ ...r }))}

          editable={{
            onRowAdd,
            onBulkUpdate,
            onRowDelete
          }}
        />}
    </>

  )
}

export default RoutesPage;




